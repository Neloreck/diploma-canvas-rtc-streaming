import * as React from "react";
import {Component} from "react";

import Button from "@material-ui/core/es/Button";

import {withConnection, withStyle} from "@Annotate";
import {IGlobalStoreState} from "@Redux";

import {HeaderBar, IHeaderBarProps} from "@Containers/elements/HeaderBar";

import {ISignUpPageDispatchProps, ISignUpPageOwnProps, ISignUpPageProps, ISignUpPageStoreProps} from "./SignUpPage.StateProps";
import {signUpPageStyle} from "./SignUpPage.Style";

@withConnection<ISignUpPageStoreProps, ISignUpPageDispatchProps, ISignUpPageOwnProps>(
  (store: IGlobalStoreState) => ({
  }), {
  })
@withStyle(signUpPageStyle)
export class SignUpPage extends Component<ISignUpPageProps> {

  public render(): JSX.Element {
    return (
      <div className={this.props.classes.root}>

        <HeaderBar {...{} as IHeaderBarProps}> </HeaderBar>

        <div className={this.props.classes.content}>
          <Button variant="contained">Test</Button>
        </div>

      </div>
    );
  }

}
