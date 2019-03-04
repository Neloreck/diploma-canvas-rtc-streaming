import { Bind, ContextManager } from "dreamstate";

// Lib.
import { ISerializedGraphicsObject } from "@Lib/graphics";
import { Optional } from "@Lib/ts/types";
import { Logger } from "@Lib/utils";

// Api.
import {
  createLiveEventBookmark,
  getLiveEventBookmarks, IBookmarkResponse,
  IBookmarksResponse,
  ILiveEventLayoutBookmark,
  IXCoreFailedResponse, setBookmarkGraphics
} from "@Api/x-core";
import { ILayoutBookmarkGraphicsResponse } from "@Api/x-core/live";

// Data.
import { liveContextManager } from "@Module/stream/data/store";

export interface IBookmarkContext {
  bookmarkActions: {
    loadBookmarks(eventId: string): void;
    saveBookmarkGraphics(eventId: number, objects: Array<ISerializedGraphicsObject>): Promise<void>;
    createBookmark(): void;
  };
  bookmarkState: {
    selectedBookmark: Optional<number>;
    bookmarks: Array<ILiveEventLayoutBookmark>;
    bookmarksCreating: boolean;
    bookmarksLoading: boolean;
  };
}

export class BookmarkContextManager extends ContextManager<IBookmarkContext> {

  protected context: IBookmarkContext = {
    bookmarkActions: {
      createBookmark: this.createBookmark,
      loadBookmarks: this.loadBookmarks,
      saveBookmarkGraphics: this.saveBookmarkGraphics
    },
    bookmarkState: {
      bookmarks: [],
      bookmarksCreating: false,
      bookmarksLoading: false,
      selectedBookmark: null
    }
  };

  private readonly setState = ContextManager.getSetter(this, "bookmarkState");
  private readonly log: Logger = new Logger("[🎲C-BOOKMARK]", true);

  // Actions.

  @Bind()
  public async loadBookmarks(eventId: string): Promise<void> {

    this.setState({ bookmarksLoading: true });

    try {

      const response: IBookmarksResponse | IXCoreFailedResponse = await getLiveEventBookmarks(eventId);

      this.context.bookmarkState = Object.assign({}, this.context.bookmarkState);

      if (response.success) {
        this.log.info("Updated bookmarks for event:", (response as IBookmarksResponse).bookmarks);
        this.context.bookmarkState.bookmarks = (response as IBookmarksResponse).bookmarks;
      } else {
        throw new Error(response.error);
      }

    } catch (error) {
      this.log.error("Failed to load bookmarks, unexpected:", error);
      this.context.bookmarkState.bookmarks = [];
    } finally {
      this.context.bookmarkState.bookmarksLoading = false;
      this.update();
    }
  }

  @Bind()
  public async createBookmark(): Promise<void> {

    const { liveEvent } = liveContextManager.context.liveState;

    if (!liveEvent) {
      throw new Error("Cannot create bookmark. No events selected.");
    }

    this.setState({ bookmarksCreating: true });

    const response = await createLiveEventBookmark(liveEvent.id, { name: "New one." });
    const { bookmarkState: state } = this.context;

    if (response.success) {
      state.bookmarks.push((response as IBookmarkResponse).bookmark);
    } else {
      this.log.error("Failed to create bookmark:", response.error);
    }

    state.bookmarksCreating = false;

    this.setState(state);
  }

  @Bind()
  public async saveBookmarkGraphics(bookmarkId: number, objects: Array<ISerializedGraphicsObject>): Promise<void> {

    this.setState({ bookmarksLoading: true });

    const response: ILayoutBookmarkGraphicsResponse | IXCoreFailedResponse = await setBookmarkGraphics(
      bookmarkId, { objects }
    );

    const { bookmarkState: state } = this.context;

    state.bookmarksLoading = false;

    if (response.success) {

      this.log.info(`Saved bookmark ${bookmarkId} graphics.`);

      // Sync each object graphics.
      state.bookmarks.forEach((it: ILiveEventLayoutBookmark) => it.graphicsObjects = it.id === bookmarkId ? objects : it.graphicsObjects);

    } else {
      this.log.error("Failed to sync event bookmark graphics: " + response.error.message);
    }

    this.setState(state);
  }

  // Lifecycle.

  @Bind()
  protected onProvisionEnded(): void {

    this.context.bookmarkState = {
      bookmarks: [],
      bookmarksCreating: false,
      bookmarksLoading: false,
      selectedBookmark: null
    };

    this.log.info("Disposed bookmark storage.");
  }

}
