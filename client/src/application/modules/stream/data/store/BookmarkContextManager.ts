import {ReactContextManager} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";

// Lib.
import {Logger} from "@Lib/utils";

// Api.
import {IBookmarksResponse, ILiveEventLayoutBookmark, IXCoreFailedResponse, liveClient} from "@Api/x-core";
import {Optional} from "@Lib/ts/types";

// Data.

export interface IBookmarkContext {
  bookmarkActions: {
    loadBookmarks(eventId: string): void;
  };
  bookmarkState: {
    selectedBookmark: Optional<number>;
    bookmarks: Array<ILiveEventLayoutBookmark>;
    bookmarksLoading: boolean;
  };
}

export class BookmarkContextManager extends ReactContextManager<IBookmarkContext> {

  protected context: IBookmarkContext = {
    bookmarkActions: {
      loadBookmarks: this.loadBookmarks
    },
    bookmarkState: {
      bookmarks: [],
      bookmarksLoading: false,
      selectedBookmark: null
    }
  };

  private log: Logger = new Logger("[🎲C-BOOKMARK]", true);

  @Bind()
  public dispose(): void {

    this.context.bookmarkState = {
      bookmarks: [],
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

      const response: IBookmarksResponse | IXCoreFailedResponse = await liveClient.getLiveEventBookmarks(eventId);

      this.updateStateRef();

      if (response.success) {
        this.log.info("Updated bookmarks for event:", (response as IBookmarksResponse).bookmarks);
        this.context.bookmarkState.bookmarks = (response as IBookmarksResponse).bookmarks;
      } else {
        throw new Error(response.error);
      }

    } catch (error) {
      this.log.error("Failed to load bookmarks, undexpected:", error);
      this.context.bookmarkState.bookmarks = [];
    } finally {
      this.context.bookmarkState.bookmarksLoading = false;
      this.update();
    }
  }

  // Utility.

  @Bind()
  private updateStateRef(): void {
    this.context.bookmarkState = Object.assign({}, this.context.bookmarkState);
  }

}
