import * as React from "react";
import {Component} from "react";

import {withStyle} from "@Lib/annotate";

import Button from "@material-ui/core/Button/Button";

import {IErrorPageDispatchProps, IErrorPageProps, IErrorPageStoreProps} from "./ErrorPage.StateProps";
import {errorPageStyle} from "./ErrorPage.Style";

import {GlobalConnect, IGlobalStoreState} from "@Main/data/store";

import {HeaderBar, IHeaderBarExternalProps} from "@Main/view/containers/elements/HeaderBar";

@GlobalConnect<IErrorPageStoreProps, IErrorPageDispatchProps, IErrorPageProps>(
  (store: IGlobalStoreState) => ({
  }), {
  })
@withStyle(errorPageStyle)
export class ErrorPage extends Component<IErrorPageProps> {

  public render(): JSX.Element {
    return (
      <div className={this.props.classes.root}>

        <HeaderBar {...{} as IHeaderBarExternalProps}/>

        <div className={this.props.classes.content}>
          <Button variant="contained">Test</Button>
        </div>

      </div>
    );
  }

}
