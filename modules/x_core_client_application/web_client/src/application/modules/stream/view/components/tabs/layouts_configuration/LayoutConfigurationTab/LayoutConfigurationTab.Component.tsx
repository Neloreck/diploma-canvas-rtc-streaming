import {Consume} from "@redux-cbd/context";
import * as React from "react";
import {Fragment, PureComponent, ReactNode} from "react";

// Lib.
import {Styled} from "@Lib/react_lib/mui";
import {Optional} from "@Lib/ts/types";

// Data.
import {bookmarkContextManager, IBookmarkContext, ILiveContext, liveContextManager} from "@Module/stream/data/store";

// Api.
import {ILiveEventLayoutBookmark} from "@Api/x-core";

// View.
import {Button, CircularProgress, Grid, WithStyles} from "@material-ui/core";
import {layoutConfigurationTabStyle} from "./LayoutConfigurationTab.Style";
import {Bind} from "@redux-cbd/utils";

// Props.

export interface ILayoutConfigurationTabExternalProps extends WithStyles<typeof layoutConfigurationTabStyle>, IBookmarkContext, ILiveContext {}
export interface ILayoutConfigurationTabOwnProps {}
export interface ILayoutConfigurationTabProps extends ILayoutConfigurationTabOwnProps, ILayoutConfigurationTabExternalProps {}

@Consume(bookmarkContextManager)
@Consume(liveContextManager)
@Styled(layoutConfigurationTabStyle)
export class LayoutConfigurationTab extends PureComponent<ILayoutConfigurationTabProps> {

  public componentWillMount(): void {

    const {bookmarkActions: {loadBookmarks}, liveState: {liveEvent}} = this.props;

    if (liveEvent) {
      loadBookmarks(liveEvent.id);
    } else {
      throw new Error("Failed to load component. Don't have correct event.");
    }
  }

  public render(): ReactNode {

    const {classes, bookmarkState: {bookmarksLoading}} = this.props;

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

    const {classes, bookmarkState: {bookmarks}} = this.props;

    return (
      <Grid className={classes.menu}>

        <Button onClick={this.onCreateButtonClicked}>Create</Button>
        <Button>Placeholder</Button>

        <Grid direction={"column"} container>

          {
            bookmarks.map((item: ILiveEventLayoutBookmark) => <Grid key={item.id}> {item.id} -> {item.name} </Grid>)
          }

        </Grid>

      </Grid>
    );
  }

  private renderDetail(): Optional<ReactNode> {

    const {classes, bookmarkState: {bookmarks, selectedBookmark}} = this.props;

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

    const {bookmarkActions: {createBookmark}} = this.props;

    createBookmark();
  }

}
