import {WithStyles} from "@material-ui/core";
import {signUpFormStyle} from "./SignUpForm.Style";

export interface ISignUpFormExternalProps extends WithStyles<typeof signUpFormStyle> {
}

export interface ISignUpFormOwnProps {
}

export interface ISignUpFormProps extends ISignUpFormOwnProps, ISignUpFormExternalProps {}
