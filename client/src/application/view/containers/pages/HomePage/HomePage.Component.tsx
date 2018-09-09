import * as React from "react";
import {Component} from "react";

import {Button} from "@material-ui/core";

import {withConnection, withStyle} from "@Annotate";
import {IGlobalStoreState} from "@Redux";
import {TestAction} from "@Store/auth/actions";

import {IHomePageDispatchProps, IHomePageOwnProps, IHomePageProps, IHomePageStoreProps} from "./HomePage.StateProps";
import {homePageStyle} from "./HomePage.Style";

import {HeaderBar, IHeaderBarProps} from "@Containers/elements/HeaderBar";

@withConnection<IHomePageStoreProps, IHomePageDispatchProps, IHomePageOwnProps>(
  (store: IGlobalStoreState) => ({
    testValue: store.auth.temp
  }), {
    sendTest: (num: number) => new TestAction(num)
  })
@withStyle(homePageStyle)
export class HomePage extends Component<IHomePageProps> {

  public render(): JSX.Element {
    return (
      <div className={this.props.classes.root}>

        <HeaderBar {...{} as IHeaderBarProps}> </HeaderBar>

        <div className={this.props.classes.content}>
          <Button variant="contained">Test</Button>
          <button onClick={() => this.props.sendTest(Math.random() * 100 + 10)}> TEST </button>
          {this.props.testValue}
        </div>

      </div>
    );
  }

}
