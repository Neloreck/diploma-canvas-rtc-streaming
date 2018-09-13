import * as React from "react";
import {Component} from "react";

import {withConnection, withStyle} from "@Annotate";
import {IGlobalStoreState} from "@Redux";

import {IHomePageDispatchProps, IHomePageProps, IHomePageStoreProps} from "./HomePage.StateProps";
import {homePageStyle} from "./HomePage.Style";

import {HeaderBar, IHeaderBarExternalProps} from "@Containers/elements/HeaderBar";
import {Grid} from "@material-ui/core";

@withConnection<IHomePageStoreProps, IHomePageDispatchProps, IHomePageProps>(
  (store: IGlobalStoreState) => ({
    authorizing: store.auth.authorizing
  }), {
  })
@withStyle(homePageStyle)
export class HomePage extends Component<IHomePageProps> {

  public render(): JSX.Element {
    return (
      <Grid className={this.props.classes.root} container>

        <HeaderBar {...{} as IHeaderBarExternalProps}> </HeaderBar>

        <div className={this.props.classes.content}>
          Home page
        </div>

      </Grid>
    );
  }

}
