import {Consume} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";
import * as React from "react";
import {ChangeEvent, Component} from "react";

// Lib.
import {Styled} from "@Lib/react_lib/@material_ui";

// Data.
import {authContextManager, IAuthContext} from "@Main/data/store";

// View.
import {Button, Card, Grid, LinearProgress, TextField} from "@material-ui/core";
import {WithStyles} from "@material-ui/core";
import {loginFormStyle} from "./LoginForm.Style";

// Props.
export interface ILoginFormState {
  username: string;
  password: string;
}

export interface ILoginFormExternalProps extends WithStyles<typeof loginFormStyle>, IAuthContext {}

export interface ILoginFormOwnProps {}

export interface ILoginFormProps extends ILoginFormOwnProps, ILoginFormExternalProps {}

@Consume<IAuthContext, ILoginFormProps>(authContextManager)
@Styled(loginFormStyle)
export class LoginForm extends Component<ILoginFormProps, ILoginFormState> {

  public state: ILoginFormState = {
    password: "",
    username: ""
  };

  private minUsernameLength: number = 5;
  private minPasswordLength: number = 5;
  private maxUsernameLength: number = 64;
  private maxPasswordLength: number = 64;

  public render(): JSX.Element {

    const {classes} = this.props;

    return (
      <Card className={classes.root}>
        {this.renderLoadingProgressBar()}
        {this.renderForm()}
      </Card>
    );
  }

  private renderLoadingProgressBar(): JSX.Element {

    const {classes, authState: {authorizing}} = this.props;

    return authorizing
        ? <LinearProgress color="secondary" className={classes.linearLoader}/>
        : <div className={classes.linearLoader}/>;
  }

  private renderForm(): JSX.Element {

    const {classes, authState: {authorizing}} = this.props;
    const {username, password} = this.state;

    return (
      <Grid className={classes.formWrapper} container>

        <TextField
          label="Login"
          className={classes.textInput}
          disabled={authorizing}
          value={username}
          onChange={this.onLoginChanged}
          margin="normal"
        />

        <TextField
          label="Password"
          className={classes.textInput}
          disabled={authorizing}
          value={password}
          onChange={this.onPasswordChanged}
          margin="normal"
          type={"password"}
        />

        <Grid justify={"flex-end"} container>
          <Button
            className={classes.signInButton}
            disabled={authorizing || username.length < this.minUsernameLength || password.length < this.minPasswordLength}
            onClick={this.onFormSubmit}
          >
            Submit
          </Button>
        </Grid>

      </Grid>
    );
  }

  @Bind()
  private onLoginChanged(event: ChangeEvent<HTMLInputElement>): void {

    const value: string = event.target.value;

    if (value.length < this.maxUsernameLength) {
      this.setState({ username: value });
    }
  }

  @Bind()
  private onPasswordChanged(event: ChangeEvent<HTMLInputElement>): void {

    const value: string = event.target.value;

    if (value.length < this.maxPasswordLength) {
      this.setState({ password: value });
    }
  }

  @Bind()
  private onFormSubmit(): void {

    const {authActions: {login}} = this.props;
    const {username, password} = this.state;

    login(username, password).then();
  }

}
