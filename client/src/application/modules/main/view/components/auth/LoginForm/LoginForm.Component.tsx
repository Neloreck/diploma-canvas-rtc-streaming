import {Consume} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";
import * as React from "react";
import {ChangeEvent, Component, ReactNode} from "react";

// Lib.
import {Styled} from "@Lib/react_lib/mui";
import {Optional} from "@Lib/ts/types";

// Data.
import {authContextManager, IAuthContext} from "@Main/data/store";
import {IUserAuthData} from "@Main/data/store/auth/models/IUserAuthData";

// View.
import {
  Button,
  Card,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  LinearProgress
} from "@material-ui/core";
import {WithStyles} from "@material-ui/core";
import {loginFormStyle} from "./LoginForm.Style";

// Props.
export interface ILoginFormState {
  usernameInput: {
    value: string;
    error: Optional<string>;
    edited: boolean;
  };
  passwordInput: {
    value: string;
    error: Optional<string>;
    edited: boolean;
  };
}

export interface ILoginFormExternalProps extends WithStyles<typeof loginFormStyle>, IAuthContext {}

export interface ILoginFormOwnProps {}

export interface ILoginFormProps extends ILoginFormOwnProps, ILoginFormExternalProps {}

@Consume<IAuthContext, ILoginFormProps>(authContextManager)
@Styled(loginFormStyle)
export class LoginForm extends Component<ILoginFormProps, ILoginFormState> {

  public state: ILoginFormState = {
    passwordInput: {
      edited: false,
      error: null,
      value: ""
    },
    usernameInput: {
      edited: false,
      error: null,
      value: ""
    }
  };

  private minUsernameLength: number = 4;
  private minPasswordLength: number = 4;
  private maxUsernameLength: number = 64;
  private maxPasswordLength: number = 64;

  public render(): ReactNode {

    const {classes} = this.props;

    return (
      <Card className={classes.root}>
        {this.renderLoadingProgressBar()}
        {this.renderForm()}
      </Card>
    );
  }

  private renderLoadingProgressBar(): ReactNode {

    const {classes, authState: {authorizing}} = this.props;

    return authorizing
        ? <LinearProgress color="secondary" className={classes.linearLoader}/>
        : <div className={classes.linearLoader}/>;
  }

  private renderForm(): ReactNode {

    const {classes, authState: {authorizing, errorMessage}} = this.props;
    const {usernameInput, passwordInput} = this.state;

    return (
      <Grid className={classes.formWrapper} container>

        <FormControl className={classes.textInput} error={Boolean(usernameInput.error)} margin={"normal"}>
          <InputLabel>Username</InputLabel>
          <Input disabled={authorizing} value={usernameInput.value} onChange={this.onUsernameChanged} placeholder={"username"}/>
          <FormHelperText>{usernameInput.error}</FormHelperText>
        </FormControl>

        <FormControl className={classes.textInput} error={Boolean(passwordInput.error) } margin={"normal"}>
          <InputLabel>Password</InputLabel>
          <Input disabled={authorizing} value={passwordInput.value} onChange={this.onPasswordChanged} type={"password"} placeholder={"password"}/>
          <FormHelperText>{passwordInput.error}</FormHelperText>
        </FormControl>

        <Grid justify={"space-between"} alignItems={"center"} container>
          <InputLabel className={classes.errorLabel}>{errorMessage}</InputLabel>
          <Button
            className={classes.signInButton}
            disabled={!this.isFormValid()}
            onClick={this.onFormSubmit}
          >
            Submit
          </Button>
        </Grid>

      </Grid>
    );
  }

  @Bind()
  private onUsernameChanged(event: ChangeEvent<HTMLInputElement>): void {

    const {authActions: {cleanupErrorMessage}} = this.props;
    const value: string = event.target.value;

    if (value.length < this.maxUsernameLength) {

      const error: Optional<string> = value.length < this.minUsernameLength
        ? `Username should be longer than ${this.minUsernameLength} characters.`
        : null;

      cleanupErrorMessage();

      this.setState({ usernameInput: { ...this.state.usernameInput, value, edited: true, error } });
    }
  }

  @Bind()
  private onPasswordChanged(event: ChangeEvent<HTMLInputElement>): void {

    const {authActions: {cleanupErrorMessage}} = this.props;
    const value: string = event.target.value;

    if (value.length < this.maxPasswordLength) {

      const error: Optional<string> = value.length < this.minPasswordLength
        ? `Password should be longer than ${this.minPasswordLength} characters.`
        : null;

      cleanupErrorMessage();

      this.setState({ passwordInput: { ...this.state.usernameInput, value, edited: true, error } });
    }
  }

  @Bind()
  private async onFormSubmit(): Promise<void> {

    const {authActions: {login}} = this.props;
    const {usernameInput, passwordInput} = this.state;

    const userData: Optional<IUserAuthData> = await login(usernameInput.value, passwordInput.value);
  }

  @Bind()
  private isFormValid(): boolean {

    const {authState: {authorizing, errorMessage}} = this.props;
    const {usernameInput, passwordInput} = this.state;

    return !authorizing && errorMessage === null &&
      usernameInput.value.length > this.minUsernameLength &&
      passwordInput.value.length > this.minPasswordLength;
  }

}
