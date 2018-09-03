import * as React from "react";
import {PureComponent} from "react";
import {Provider} from "react-redux";

import {reduxStoreManager} from "@App/data/redux";
import {Router} from "@App/view/routing";

export class Application extends PureComponent {

  public render(): JSX.Element {
    return (
      <Provider store={reduxStoreManager.getReduxStore()}>
        <Router/>
      </Provider>
    );
  }

}
