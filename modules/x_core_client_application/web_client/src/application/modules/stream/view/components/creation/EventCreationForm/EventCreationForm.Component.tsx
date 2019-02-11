import { Bind } from "@redux-cbd/utils";
import * as React from "react";
import { ChangeEvent, PureComponent, ReactNode } from "react";

// Lib.
import { Styled } from "@Lib/react_lib/mui";

// View.
import {
  Button, Card,
  FormControl,
  Grid,
  Input,
  InputLabel, LinearProgress, Switch,
  Typography,
  WithStyles,
} from "@material-ui/core";
import { eventCreationFormStyle } from "./EventCreationForm.Style";

// Props.
export interface IEventCreationFormState {
  name: string;
  description: string;
  secured: boolean;
  securedKey: string;
}

export interface IEventCreationFormOwnProps {
  loading: boolean;
  onBack(): void;
  onCreate(name: string, description: string, secured: boolean, securedKey: string): void;
}

export interface IEventCreationFormExternalProps extends WithStyles<typeof eventCreationFormStyle> {}
export interface IEventCreationFormProps extends IEventCreationFormOwnProps, IEventCreationFormExternalProps {}

@Styled(eventCreationFormStyle)
export class EventCreationForm extends PureComponent<IEventCreationFormProps> {

  public state: IEventCreationFormState = {
    description: "",
    name: "",
    secured: false,
    securedKey: ""
  };

  public render(): ReactNode {

    const { classes } = this.props;

    return (
      <Card className={classes.root}>
        {this.renderProgressBlock()}
        {this.renderEditingBlock()}
      </Card>
    );
  }

  private renderProgressBlock(): ReactNode {

    const { classes, loading } = this.props;

    return loading ? <LinearProgress color={"secondary"}/> : <div className={classes.loaderPlaceholder}/>;
  }

  private renderEditingBlock(): ReactNode {

    const { classes, loading } = this.props;
    const { name, description, secured, securedKey } = this.state;

    return (
      <Grid className={classes.editBlock} direction={"column"} container>

        <Grid className={classes.headingBlock}>
          <Typography variant={"h4"}>Create event</Typography>
        </Grid>

        <FormControl className={classes.editField} margin={"normal"}>
          <InputLabel>Name</InputLabel>
          <Input placeholder={"name"} value={name} onChange={this.onNameChanged}/>
        </FormControl>

        <FormControl className={classes.editField} margin={"normal"}>
          <InputLabel>Description</InputLabel>
          <Input placeholder={"description"} value={description} onChange={this.onDescriptionChanged}/>
        </FormControl>

        <Grid className={classes.securityBlock} container direction={"row"}>

          <Typography> Secure with password </Typography> <br/>

          <Grid direction={"row"} container>

            <FormControl margin={"normal"}>
              <Switch checked={secured} color={"primary"} onChange={this.onToggleSwitched}/>
            </FormControl>

            <FormControl className={classes.editField} margin={"normal"}>
              <InputLabel>Secret word</InputLabel>
              <Input placeholder={"Secret word"} value={securedKey} onChange={this.onSecretWordChanged}/>
            </FormControl>

          </Grid>

        </Grid>

        <Grid className={classes.controlBlock} justify={"space-between"} container>
          <Button disabled={loading} size={"large"} variant={"contained"} onClick={this.onGoBack}>Back</Button>
          <Button disabled={loading} size={"large"} variant={"contained"} onClick={this.onCreate}>Create</Button>
        </Grid>

      </Grid>
    );
  }

  // Local state.

  @Bind()
  private onNameChanged(event: ChangeEvent<HTMLInputElement>): void {
    this.setState({ name: event.target.value });
  }

  @Bind()
  private onSecretWordChanged(event: ChangeEvent<HTMLInputElement>): void {
    this.setState({ securedKey: event.target.value });
  }

  @Bind()
  private onDescriptionChanged(event: ChangeEvent<HTMLInputElement>): void {
    this.setState({ description: event.target.value });
  }

  @Bind()
  private onToggleSwitched(event: ChangeEvent<any>): void {
    this.setState({ secured: event.target.checked });
  }

  // Handling.

  @Bind()
  private onGoBack(): void {

    const { onBack } = this.props;

    onBack();
  }

  @Bind()
  private onCreate(): void {

    const { onCreate } = this.props;
    const { name, description, securedKey, secured } = this.state;

    onCreate(name, description, secured, securedKey);
  }

}
