import * as React from "react";
import {PureComponent} from "react";
import {Provider} from "react-redux";

import {Single} from "@App/data/utils/decorators";
import {Router} from "@App/view/routing";
import {reduxStoreManager} from "@Redux";

@Single
export class Application extends PureComponent {

  public render(): JSX.Element {
    return (
      <Provider store={reduxStoreManager.getReduxStore()}>
        <Router/>
      </Provider>
    );
  }

}
