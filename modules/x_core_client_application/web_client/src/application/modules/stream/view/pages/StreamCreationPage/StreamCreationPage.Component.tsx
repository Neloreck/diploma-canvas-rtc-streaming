import { Bind, Consume } from "dreamstate";
import * as React from "react";
import { PureComponent, ReactNode } from "react";

// Lib.
import { Styled } from "@Lib/decorators";
import { Optional } from "@Lib/ts/types";

// Data.
import { IRouterContext, routerContextManager } from "@Main/data/store";
import { ILiveContext, liveContextManager } from "@Module/stream/data/store";
import { ELiveEventStatus } from "@Module/stream/data/store/live/types";

// Api.
import { ILiveEvent } from "@Api/x-core/live/models";

// View.
import { AnimatedMount } from "@Main/view/utils/animations/AnimatedMount";
import {
  IMainLoadingProgressComponentInjectedProps,
  MainLoadingProgressComponent
} from "@Main/view/utils/lazy_load/MainLoadingProgress.Component";
import { Grid, WithStyles } from "@material-ui/core";
import {
  EventCreationForm,
  IEventCreationFormInjectedProps
} from "@Module/stream/view/components/creation/EventCreationForm/EventCreationForm.Component";
import {
  IStreamingHeaderBarInjectedProps,
  StreamingHeaderBar
} from "@Module/stream/view/components/heading/StreamingHeaderBar";
import { streamCreationPageStyle } from "./StreamCreationPage.Style";

// Props.
export interface IStreamCreationPageInjectedProps extends WithStyles<typeof streamCreationPageStyle>, ILiveContext, IRouterContext  {}
export interface IStreamCreationPageOwnProps {}
export interface IStreamCreationPageProps extends IStreamCreationPageOwnProps, IStreamCreationPageInjectedProps {}

@Consume(routerContextManager, liveContextManager)
@Styled(streamCreationPageStyle)
export class StreamCreationPage extends PureComponent<IStreamCreationPageProps> {

  public componentWillMount(): void {

    const { liveState: { liveEvent }, liveActions: { checkActiveEvent }, routingActions: { replace } } = this.props;

    if (liveEvent) {
      replace("/stream/live/" + liveEvent.id);
    } else {
      checkActiveEvent()
        .then((optionalEvent: Optional<ILiveEvent>) =>
          optionalEvent
            ? replace(`/stream/live/${optionalEvent.id}`)
            : null
        );
    }
  }

  public render(): ReactNode {

    const { classes } = this.props;

    return (
      <Grid
        className={classes.root}
        direction={"column"}
        wrap={"nowrap"}
        container
      >
        {this.renderContent()}
      </Grid>
    );
  }

  private renderContent(): ReactNode {

    const { classes, liveState: { liveEventStatus } } = this.props;

    if (liveEventStatus === ELiveEventStatus.LOADING) {
      return  <MainLoadingProgressComponent {...{} as IMainLoadingProgressComponentInjectedProps}/>;
    }

    return (
      <>

        <StreamingHeaderBar {...{} as IStreamingHeaderBarInjectedProps}/>

        <AnimatedMount>

          <Grid className={classes.content} direction={"column"} wrap={"nowrap"} alignItems={"center"} justify={"center"} container>

             <EventCreationForm
               loading={liveEventStatus === ELiveEventStatus.CREATING}
               onBack={this.onCancelCreation}
               onCreate={this.onCreateLiveEvent}
               {...{} as IEventCreationFormInjectedProps}
             />

          </Grid>

        </AnimatedMount>

      </>
    );
  }

  @Bind()
  private onCancelCreation(): void {

    const { routingActions: { replace } } = this.props;

    replace("/home");
  }

  @Bind()
  private async onCreateLiveEvent(name: string, description: string, secured: boolean, securedKey: string): Promise<void> {

    const { liveActions: { createEvent }, routingActions: { replace } } = this.props;

    const liveEvent: ILiveEvent = await createEvent(name, description, secured, securedKey);

    replace("/stream/live/" + liveEvent.id);
  }

}
