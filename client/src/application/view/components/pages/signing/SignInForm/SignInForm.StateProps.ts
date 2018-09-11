import {WithStyles} from "@material-ui/core";
import {signInFormStyle} from "./SignInForm.Style";

export interface ISignInFormExternalProps extends WithStyles<typeof signInFormStyle> {
}

export interface ISignInFormOwnProps {
}

export interface ISignInFormProps extends ISignInFormOwnProps, ISignInFormExternalProps {}
