import { Consume } from "@redux-cbd/context";
import { Bind } from "@redux-cbd/utils";
import * as React from "react";
import { ChangeEvent, Component, KeyboardEvent, ReactNode } from "react";

// Lib.
import { Styled } from "@Lib/react_lib/mui";
import { Optional } from "@Lib/ts/types";

// Data.
import { AuthContextManager, authContextManager, IAuthContext } from "@Main/data/store";

// View.
import {
  Button,
  Card,
  FormControl, FormHelperText,
  Grid, Grow,
  Input,
  InputLabel,
  LinearProgress,
  WithStyles
} from "@material-ui/core";
import { signUpFormStyle } from "./SignUpForm.Style";

// Props.
export interface ISignUpFormState {
  usernameInput: {
    edited: boolean;
    error: Optional<string>;
    value: string;
  };
  passwordInput: {
    edited: boolean;
    error: Optional<string>;
    value: string;
  };
  mailInput: {
    edited: boolean;
    error: Optional<string>;
    value: string;
  };
  passwordConfirmationInput: {
    edited: boolean;
    error: Optional<string>;
    value: string;
  };
}

export interface ISignUpFormExternalProps extends WithStyles<typeof signUpFormStyle>, IAuthContext {}
export interface ISignUpFormOwnProps {}
export interface ISignUpFormProps extends ISignUpFormOwnProps, ISignUpFormExternalProps {}

@Consume(authContextManager)
@Styled(signUpFormStyle)
export class SignUpForm extends Component<ISignUpFormProps, ISignUpFormState> {

  public state: ISignUpFormState = {
    mailInput: {
      edited: false,
      error: null,
      value: ""
    },
    passwordConfirmationInput: {
      edited: false,
      error: null,
      value: ""
    },
    passwordInput: {
      edited: false,
      error: null,
      value: ""
    },
    usernameInput: {
      edited: false,
      error: null,
      value: ""
    },
  };

  public componentWillUpdate(nextProps: ISignUpFormProps, nextState: ISignUpFormState): void {
    nextState.usernameInput.error = nextState.usernameInput.edited ? this.getUsernameErrors(nextState.usernameInput.value) : null;
    nextState.mailInput.error = nextState.mailInput.edited ? this.getMailErrors(nextState.mailInput.value) : null;
    nextState.passwordInput.error = nextState.passwordInput.edited ? this.getPasswordErrors(nextState.passwordInput.value, nextState) : null;
    nextState.passwordConfirmationInput.error = nextState.passwordConfirmationInput.edited ? this.getPasswordMatchErrors(nextState.passwordConfirmationInput.value, nextState) : null;
  }

  public componentWillUnmount(): void {

    const { authActions: { cleanupErrorMessage } } = this.props;

    cleanupErrorMessage();
  }

  public render(): ReactNode {

    const { classes } = this.props;

    return (
      <Card className={classes.root}>
        {this.renderProgressBar()}
        {this.renderFormBody()}
      </Card>
    );
  }

  private renderProgressBar(): ReactNode {

    const { classes, authState: { authorizing } } = this.props;

    return authorizing
      ? <LinearProgress color="secondary" className={classes.linearLoader}/>
      : <Grid className={classes.linearLoader}/>;
  }

  private renderFormBody(): ReactNode {

    const { classes, authState: { authorizing, errorMessage } } = this.props;
    const { usernameInput, mailInput, passwordInput, passwordConfirmationInput } = this.state;

    return (
      <Grid className={classes.formWrapper} onKeyDown={this.onKeyDown} direction={"column"} container>

        <FormControl className={classes.textInput} error={Boolean(usernameInput.error)} margin={"normal"}>
          <InputLabel>Username</InputLabel>
          <Input disabled={authorizing} value={usernameInput.value} onChange={this.onUsernameChanged} placeholder={"username"}/>
          <FormHelperText>{usernameInput.error}</FormHelperText>
        </FormControl>

        <FormControl className={classes.textInput} error={Boolean(mailInput.error) } margin={"normal"}>
          <InputLabel>Mail</InputLabel>
          <Input disabled={authorizing} value={mailInput.value} onChange={this.onMailChanged} placeholder={"mail"}/>
          <FormHelperText>{mailInput.error}</FormHelperText>
        </FormControl>

        <FormControl className={classes.textInput} error={Boolean(passwordInput.error) } margin={"normal"}>
          <InputLabel>Password</InputLabel>
          <Input disabled={authorizing} value={passwordInput.value} onChange={this.onPasswordChanged} type={"password"} placeholder={"password"}/>
          <FormHelperText>{passwordInput.error}</FormHelperText>
        </FormControl>

        {
          passwordInput.edited &&
          <Grow in={passwordInput.edited}>
            <FormControl className={classes.textInput} error={Boolean(passwordConfirmationInput.error) } margin={"normal"}>
              <InputLabel>Password Confirmation</InputLabel>
              <Input disabled={authorizing} value={passwordConfirmationInput.value} onChange={this.onPasswordConfirmationChanged} type={"password"} placeholder={"password confirmation"}/>
              <FormHelperText>{passwordConfirmationInput.error}</FormHelperText>
            </FormControl>
          </Grow>
        }

        <Grid justify={"space-between"} alignItems={"center"} container>
          <InputLabel className={classes.errorLabel}>{errorMessage}</InputLabel>
          <Button
            className={classes.signUnButton}
            color={"primary"}
            disabled={!this.isFormValid()}
            onClick={this.onFormSubmit}
          >
            Submit
          </Button>
        </Grid>

      </Grid>
    );
  }

  /*
   * Changes handling.
   */

  @Bind()
  private onUsernameChanged(event: ChangeEvent<HTMLInputElement>): void {

    const { authActions: { cleanupErrorMessage } } = this.props;
    const value: string = event.target.value;

    if (value.length < AuthContextManager.MAX_USERNAME_LENGTH) {
      cleanupErrorMessage();
      this.setState({ usernameInput: { value, edited: true, error: null } });
    }
  }

  @Bind()
  private onMailChanged(event: ChangeEvent<HTMLInputElement>): void {

    const { authActions: { cleanupErrorMessage } } = this.props;
    const value: string = event.target.value;

    if (value.length < AuthContextManager.MAX_USERNAME_LENGTH) {
      cleanupErrorMessage();
      this.setState({ mailInput: { value, edited: true, error: null } });
    }
  }

  @Bind()
  private onPasswordChanged(event: ChangeEvent<HTMLInputElement>): void {

    const { authActions: { cleanupErrorMessage } } = this.props;
    const value: string = event.target.value;

    if (value.length < AuthContextManager.MAX_PASSWORD_LENGTH) {
      cleanupErrorMessage();
      this.setState({ passwordInput: { value, edited: true, error: null } });
    }
  }

  @Bind()
  private onPasswordConfirmationChanged(event: ChangeEvent<HTMLInputElement>): void {

    const { authActions: { cleanupErrorMessage } } = this.props;
    const value: string = event.target.value;

    if (value.length < AuthContextManager.MAX_PASSWORD_LENGTH) {
      cleanupErrorMessage();
      this.setState({ passwordConfirmationInput: { value, edited: true, error: null } });
    }
  }

  /*
   * Validation.
   */

  @Bind()
  private isFormValid(): boolean {

    const { authState: { authorizing, errorMessage } } = this.props;
    const { usernameInput, passwordInput, passwordConfirmationInput, mailInput } = this.state;

    return !authorizing && errorMessage === null &&
      usernameInput.edited && passwordInput.edited && mailInput.edited && passwordConfirmationInput.edited &&
      !usernameInput.error && !passwordInput.error && !mailInput.error && !passwordConfirmationInput.error;
  }

  @Bind()
  private getUsernameErrors(value: string): Optional<string> {
    return value.length >= AuthContextManager.MIN_USERNAME_LENGTH
      ? null
      : `Password should be longer than ${AuthContextManager.MIN_PASSWORD_LENGTH} characters.`;
  }

  @Bind()
  private getMailErrors(value: string): Optional<string> {
    return value.length >= 4 && AuthContextManager.MAIL_REGEX.test(value)
      ? null
      : "Mail should have valid format";
  }

  @Bind()
  private getPasswordErrors(value: string, nextState: ISignUpFormState): Optional<string> {

    const { passwordConfirmationInput } = nextState;

    return value.length >= AuthContextManager.MIN_PASSWORD_LENGTH
      ? (passwordConfirmationInput.edited ? (value === passwordConfirmationInput.value ? null : "Passwords should match") : null)
      : `Password should be longer than ${AuthContextManager.MIN_PASSWORD_LENGTH} characters.`;
  }

  @Bind()
  private getPasswordMatchErrors(value: string, nextState: ISignUpFormState): Optional<string> {

    const { passwordInput } = nextState;

    return value.length >= AuthContextManager.MIN_PASSWORD_LENGTH
      ? (passwordInput.edited ? (passwordInput.value === value ? null : "Passwords should match") : null)
      : `Password should be longer than ${AuthContextManager.MIN_PASSWORD_LENGTH} characters.`;
  }

  /*
   * Confirmation.
   */

  @Bind()
  private onKeyDown(event: KeyboardEvent<any>): void {
    if (event.key === "Enter") {
      this.onFormSubmit();
    }
  }

  @Bind()
  private async onFormSubmit(): Promise<void> {

    const { authActions: { register, login } } = this.props;
    const { usernameInput, passwordInput, mailInput } = this.state;

    // todo: Single register-login.

    if (this.isFormValid()) {
      const registered: boolean = await register(usernameInput.value, mailInput.value, passwordInput.value);

      if (registered) {
        await login(usernameInput.value, passwordInput.value);
      }
    }
  }

}
