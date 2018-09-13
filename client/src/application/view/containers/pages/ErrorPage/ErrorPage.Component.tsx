import * as React from "react";
import {Component} from "react";

import {withConnection, withStyle} from "@Annotate";
import {IGlobalStoreState} from "@Redux";

import {HeaderBar, IHeaderBarExternalProps} from "@Containers/elements/HeaderBar";
import Button from "@material-ui/core/Button/Button";

import {IErrorPageDispatchProps, IErrorPageProps, IErrorPageStoreProps} from "./ErrorPage.StateProps";
import {errorPageStyle} from "./ErrorPage.Style";

@withConnection<IErrorPageStoreProps, IErrorPageDispatchProps, IErrorPageProps>(
  (store: IGlobalStoreState) => ({
  }), {
  })
@withStyle(errorPageStyle)
export class ErrorPage extends Component<IErrorPageProps> {

  public render(): JSX.Element {
    return (
      <div className={this.props.classes.root}>

        <HeaderBar {...{} as IHeaderBarExternalProps}> </HeaderBar>

        <div className={this.props.classes.content}>
          <Button variant="contained">Test</Button>
        </div>

      </div>
    );
  }

}
