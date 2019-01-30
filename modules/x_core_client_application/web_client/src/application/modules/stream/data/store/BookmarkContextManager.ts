import {ReactContextManager} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";

// Lib.
import {Optional} from "@Lib/ts/types";
import {Logger} from "@Lib/utils";

// Api.
import {
  createLiveEventBookmark,
  getLiveEventBookmarks, IBookmarkResponse,
  IBookmarksResponse,
  ILiveEventLayoutBookmark,
  IXCoreFailedResponse, setBookmarkGraphics
} from "@Api/x-core";
import {ILayoutBookmarkGraphicsResponse} from "@Api/x-core/live/responses";
import {ISerializedGraphicsObject} from "@Lib/graphics";
import {liveContextManager} from "@Module/stream/data/store/index";

// Data.

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

export class BookmarkContextManager extends ReactContextManager<IBookmarkContext> {

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

  private log: Logger = new Logger("[🎲C-BOOKMARK]", true);

  @Bind()
  public dispose(): void {

    this.context.bookmarkState = {
      bookmarks: [],
      bookmarksCreating: false,
      bookmarksLoading: false,
      selectedBookmark: null
    };

    this.log.info("Disposed bookmark storage.");
  }

  @Bind()
  public async loadBookmarks(eventId: string): Promise<void> {

    this.updateStateRef();
    this.context.bookmarkState.bookmarksLoading = true;
    this.update();

    try {

      const response: IBookmarksResponse | IXCoreFailedResponse = await getLiveEventBookmarks(eventId);

      this.updateStateRef();

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

    const {liveEvent} = liveContextManager.context.liveState;

    if (!liveEvent) {
      throw new Error("Cannot create bookmark. No events selected.");
    }

    this.updateStateRef();
    this.context.bookmarkState.bookmarksCreating = true;
    this.update();

    const response = await createLiveEventBookmark(liveEvent.id, { name: "New one." });

    this.updateStateRef();

    if (response.success) {
      this.context.bookmarkState.bookmarks.push((response as IBookmarkResponse).bookmark);
    } else {
      this.log.error("Failed to create bookmark:", response.error);
    }

    this.context.bookmarkState.bookmarksCreating = false;
    this.update();
  }

  @Bind()
  public async saveBookmarkGraphics(bookmarkId: number, objects: Array<ISerializedGraphicsObject>): Promise<void> {

    this.updateStateRef();
    this.context.bookmarkState.bookmarksLoading = true;
    this.update();

    const response: ILayoutBookmarkGraphicsResponse | IXCoreFailedResponse = await setBookmarkGraphics(
      bookmarkId, { objects }
    );

    this.updateStateRef();
    this.context.bookmarkState.bookmarksLoading = false;

    if (response.success) {
      this.log.info(`Saved bookmark ${bookmarkId} graphics.`);

      this.context.bookmarkState.bookmarks.forEach((it: ILiveEventLayoutBookmark) => {
        if (it.id === bookmarkId) {
          it.graphicsObjects = objects;
        }
      });

    } else {
      throw new Error("Failed to sync event bookmark graphics: " + response.error.message);
    }

    this.update();
  }

  // Utility.

  @Bind()
  private updateStateRef(): void {
    this.context.bookmarkState = Object.assign({}, this.context.bookmarkState);
  }

}
