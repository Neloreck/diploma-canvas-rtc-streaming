import * as React from "react";
import {Component} from "react";
import {bindActionCreators} from "redux";

import {log} from "@App/data/utils";
import {Connect} from "@App/data/utils/decorators";
import {TestAction} from "@Store/auth/actions/TestAction";

export interface IHomePageStoreProps {
  asm: number;
}

export interface IHomePageDispatchProps {
  sendTest: any;
}

export interface IHomePageProps extends IHomePageStoreProps, IHomePageDispatchProps {
}

@Connect<IHomePageStoreProps, IHomePageDispatchProps, IHomePageProps>(
  (store) => {
    log.error("GOT STORE:", store);
    return { asm: 1 };
  }, (dispatch): IHomePageDispatchProps => {
    return bindActionCreators({
      sendTest: () => ( new TestAction(Math.random(), dispatch) )
    }, dispatch);
  })
export class HomePage extends Component<IHomePageProps> {

  public render(): JSX.Element {
    return (
      <div id={"home-page"}>
        <button onClick={() => this.props.sendTest()}> TEST </button>
      </div>
    );
  }

}
