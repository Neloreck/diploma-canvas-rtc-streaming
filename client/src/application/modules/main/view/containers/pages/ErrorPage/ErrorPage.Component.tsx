import * as React from "react";
import {Component} from "react";

import {Styled} from "@Lib/react_lib/@material_ui";

import {GlobalStoreConnect, IGlobalStoreState} from "@Main/data/store";

import {HeaderBar, IHeaderBarExternalProps} from "@Main/view/containers/elements/HeaderBar";

import {IErrorPageDispatchProps, IErrorPageProps, IErrorPageStoreProps} from "./ErrorPage.StateProps";
import {errorPageStyle} from "./ErrorPage.Style";

@GlobalStoreConnect<IErrorPageStoreProps, IErrorPageDispatchProps, IErrorPageProps>(
  (store: IGlobalStoreState) => ({
  }), {
  })
@Styled(errorPageStyle)
export class ErrorPage extends Component<IErrorPageProps> {

  public render(): JSX.Element {
    return (
      <div className={this.props.classes.root}>

        <HeaderBar {...{} as IHeaderBarExternalProps}/>

        <div className={this.props.classes.content}>
          This is error page...
        </div>

      </div>
    );
  }

}
