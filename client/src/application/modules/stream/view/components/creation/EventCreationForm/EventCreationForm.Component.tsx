import {Consume} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";
import * as React from "react";
import {PureComponent, ReactNode} from "react";

// Lib.
import {Styled} from "@Lib/react_lib/mui";

// Data.
import {authContextManager, IAuthContext, IRouterContext, routerContextManager} from "@Main/data/store";
import {ILiveContext, liveContextManager} from "@Module/stream/data/store";

// View.
import {
  Button, Card,
  Divider,
  FormControl,
  Grid,
  Input,
  InputLabel, LinearProgress,
  Typography,
  WithStyles,
} from "@material-ui/core";
import {eventCreationFormStyle} from "./EventCreationForm.Style";

// Props.
export interface IEventCreationFormOwnProps {}
export interface IEventCreationFormExternalProps extends WithStyles<typeof eventCreationFormStyle>, ILiveContext, IAuthContext, IRouterContext {}
export interface IEventCreationFormProps extends IEventCreationFormOwnProps, IEventCreationFormExternalProps {}

@Styled(eventCreationFormStyle)
@Consume<IAuthContext, IEventCreationFormProps>(authContextManager)
@Consume<IRouterContext, IEventCreationFormProps>(routerContextManager)
@Consume<ILiveContext, IEventCreationFormProps>(liveContextManager)
export class EventCreationForm extends PureComponent<IEventCreationFormProps> {

  public render(): ReactNode {

    const {classes} = this.props;

    return (
      <Card className={classes.root}>
        {this.renderProgressBlock()}
        {this.renderEditingBlock()}
      </Card>
    );
  }

  private renderProgressBlock(): ReactNode {
    return <LinearProgress color={"secondary"}/>;
  }

  private renderEditingBlock(): ReactNode {

    const {classes} = this.props;

    return (
      <Grid className={classes.editBlock}>

        <Grid className={classes.headingBlock}>
          <Typography variant={"h4"}>Create event</Typography>
        </Grid>

        <FormControl className={classes.editField} margin={"normal"}>
          <InputLabel>Name</InputLabel>
          <Input placeholder={"name"}/>
        </FormControl>

        <FormControl className={classes.editField} margin={"normal"}>
          <InputLabel>Description</InputLabel>
          <Input placeholder={"Description"}/>
        </FormControl>

        <Divider/>

        <br/>

        <Grid className={classes.controlBlock} justify={"space-between"} container>
          <Button size={"large"} variant={"contained"} onClick={this.onGoBack}>Back</Button>
          <Button size={"large"} variant={"contained"} onClick={this.onCreate}>Create</Button>
        </Grid>

      </Grid>
    );
  }

  @Bind()
  private onGoBack(): void {

    const {routingActions: {push}} = this.props;

    push("/home");
  }

  @Bind()
  private onCreate(): void {

    const {routingActions: {replace}} = this.props;

    replace("/stream/live/todo");
  }

}
