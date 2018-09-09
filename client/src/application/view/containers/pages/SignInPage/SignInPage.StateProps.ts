import {WithStyles} from "@material-ui/core";

import {signInPageStyle} from "./SignInPage.Style";

export interface ISignInPageStoreProps {
  testValue: number;
}

export interface ISignInPageDispatchProps {
  sendTest: any;
}

export interface ISignInPageOwnProps {
}

export interface ISignInPageProps extends ISignInPageDispatchProps, ISignInPageStoreProps, ISignInPageOwnProps,
  WithStyles<typeof signInPageStyle> {}
