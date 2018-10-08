import * as React from "react";
import {Component} from "react";

import {withStyle} from "@Lib/annotate";

import {IHomePageDispatchProps, IHomePageProps, IHomePageStoreProps} from "./HomePage.StateProps";
import {homePageStyle} from "./HomePage.Style";

import {Grid} from "@material-ui/core";

import {GlobalStoreConnect, IGlobalStoreState} from "@Main/data/store";

import {HeaderBar, IHeaderBarExternalProps} from "@Main/view/containers/elements/HeaderBar";

@GlobalStoreConnect<IHomePageStoreProps, IHomePageDispatchProps, IHomePageProps>(
  (store: IGlobalStoreState) => ({
    authorizing: store.auth.authorizing
  }), {
  })
@withStyle(homePageStyle)
export class HomePage extends Component<IHomePageProps> {

  public render(): JSX.Element {
    return (
      <Grid className={this.props.classes.root} container>

        <HeaderBar {...{} as IHeaderBarExternalProps}/>

        <div className={this.props.classes.content}>
          Home page
        </div>

      </Grid>
    );
  }

}
