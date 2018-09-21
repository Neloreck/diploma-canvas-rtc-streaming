import {WithStyles} from "@material-ui/core";
import {signUpPageStyle} from "./SignUpPage.Style";

export interface ISignUpPageStoreProps {
}

export interface ISignUpPageDispatchProps {
}

export interface ISignUpPageOwnProps {
}

export interface ISignUpPageProps extends ISignUpPageDispatchProps, ISignUpPageStoreProps,
  ISignUpPageOwnProps, WithStyles<typeof signUpPageStyle> {
}
