import * as React from "react";
import {Component} from "react";

// Lib.
import {Styled} from "@Lib/react_lib/@material_ui";

// View.
import {Button, Card, Grid, LinearProgress, TextField, WithStyles} from "@material-ui/core";
import {signUpFormStyle} from "./SignUpForm.Style";

// Props.
export interface ISignUpFormExternalProps extends WithStyles<typeof signUpFormStyle> {}

export interface ISignUpFormOwnProps {}

export interface ISignUpFormProps extends ISignUpFormOwnProps, ISignUpFormExternalProps {}

@Styled(signUpFormStyle)
export class SignUpForm extends Component<ISignUpFormProps> {

  public state = {
    loading: true
  };

  public render(): JSX.Element {
    const {classes} = this.props;
    const state = this.state;

    return (
      <Card className={classes.root}>

        {
          state.loading
            ? <LinearProgress color="secondary" className={classes.linearLoader}/>
            : <div className={classes.linearLoader}/>
        }

        <Grid className={classes.formWrapper} container>

          <TextField
            label="Login"
            className={classes.textInput}
            value={""}
            onChange={() => {/**/}}
            margin="normal"
          />

          <TextField
            label="Mail"
            className={classes.textInput}
            value={""}
            onChange={() => {/**/}}
            margin="normal"
          />

          <br/>

          <TextField
            label="Password"
            className={classes.textInput}
            value={"wetwet"}
            onChange={() => {/**/}}
            margin="normal"
            type={"password"}
          />

          <TextField
            label="Password repeat"
            className={classes.textInput}
            value={"wetwet"}
            onChange={() => {/**/}}
            margin="normal"
            type={"password"}
          />

          <br/>

          <Grid justify={"flex-end"} container>
            <Button className={classes.signInButton} variant="contained" color="primary">Submit</Button>
          </Grid>

        </Grid>

      </Card>
    );
  }

}
