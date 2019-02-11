import { Consume } from "@redux-cbd/context";
import { Bind } from "@redux-cbd/utils";
import * as React from "react";
import { Fragment, PureComponent, ReactNode } from "react";

// Lib.
import { Styled } from "@Lib/react_lib/mui";
import { Optional } from "@Lib/ts/types";

// Data.
import { renderingService } from "@Module/stream/data/services";
import {
  bookmarkContextManager,
  graphicsContextManager,
  IBookmarkContext, IGraphicsContext,
  ILiveContext,
  liveContextManager
} from "@Module/stream/data/store";

// Api.
import { ILiveEventLayoutBookmark } from "@Api/x-core";

// View.
import { Button, CircularProgress, Grid, WithStyles } from "@material-ui/core";
import { layoutConfigurationTabStyle } from "./LayoutConfigurationTab.Style";

// Props.

export interface ILayoutConfigurationTabExternalProps extends WithStyles<typeof layoutConfigurationTabStyle>, IBookmarkContext, IGraphicsContext, ILiveContext {}
export interface ILayoutConfigurationTabOwnProps {}
export interface ILayoutConfigurationTabProps extends ILayoutConfigurationTabOwnProps, ILayoutConfigurationTabExternalProps {}

@Consume(bookmarkContextManager, graphicsContextManager, liveContextManager)
@Styled(layoutConfigurationTabStyle)
export class LayoutConfigurationTab extends PureComponent<ILayoutConfigurationTabProps> {

  public componentWillMount(): void {

    const { bookmarkActions: { loadBookmarks }, liveState: { liveEvent } } = this.props;

    if (liveEvent) {
      loadBookmarks(liveEvent.id);
    } else {
      throw new Error("Failed to load component. Don't have correct event.");
    }
  }

  public render(): ReactNode {

    const { classes, bookmarkState: { bookmarksLoading } } = this.props;

    return (
      <Grid className={classes.root} direction={"row"} wrap={"nowrap"} alignItems={"center"} justify={"center"} container>
        {
          bookmarksLoading
            ?
              <CircularProgress size={80}/>
            :
              <Fragment>
                {this.renderMenu()}
                {this.renderDetail()}
              </Fragment>
        }
      </Grid>
    );
  }

  private renderMenu(): ReactNode {

    const {
      classes,
      bookmarkState: { bookmarks }, bookmarkActions: { saveBookmarkGraphics },
      graphicsState: { objects }, graphicsActions: { eraseObjects, setObjects }
    } = this.props;

    return (
      <Grid className={classes.menu}>

        <Button onClick={this.onCreateButtonClicked}>Create</Button>
        <Button onClick={eraseObjects}>Clear</Button>

        <Grid direction={"column"} container>

          {
            bookmarks.map((item: ILiveEventLayoutBookmark) => (
              <Grid key={item.id}>
                {item.id} -> {item.name}
                <Button onClick={(): void => setObjects(renderingService.deserializeObjects(item.graphicsObjects))}>Apply</Button>
                <Button onClick={(): Promise<void> => saveBookmarkGraphics(item.id, renderingService.serializeObjects(objects))}>Save</Button>
              </Grid>
              )
            )
          }

        </Grid>

      </Grid>
    );
  }

  private renderDetail(): Optional<ReactNode> {

    const { classes, bookmarkState: { bookmarks, selectedBookmark } } = this.props;

    if (selectedBookmark) {
      return (
        <Grid className={classes.detail}>
          {JSON.stringify(bookmarks)}
        </Grid>
      );
    } else {
      return null;
    }
  }

  @Bind()
  private onCreateButtonClicked(): void {

    const { bookmarkActions: { createBookmark } } = this.props;

    createBookmark();
  }

}
