import * as React from "react";
import {Component} from "react";

import {Button, Card, Grid, LinearProgress, TextField} from "@material-ui/core";

import {withStyle} from "@Annotate";

import {ISignInFormProps} from "./SignInForm.StateProps";
import {signInFormStyle} from "./SignInForm.Style";

@withStyle(signInFormStyle)
export class SignInForm extends Component<ISignInFormProps> {

  public state = {
    loading: true
  };

  public render(): JSX.Element {
    const classes = this.props.classes;
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

          <br/>

          <TextField
            label="Password"
            className={classes.textInput}
            value={"wetwet"}
            onChange={() => {/**/}}
            margin="normal"
            type={"password"}
          />

          <br/>

          <Grid justify={"flex-end"} container>
            <Button className={classes.signInButton}>Submit</Button>
          </Grid>

        </Grid>

      </Card>
    );
  }

}
