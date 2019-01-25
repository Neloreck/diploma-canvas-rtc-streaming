import {Consume} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";
import * as React from "react";
import {Fragment, PureComponent, ReactNode} from "react";

// Lib.
import {Styled} from "@Lib/react_lib/mui";

// Data.
import {IRouterContext, routerContextManager} from "@Main/data/store";
import {ILiveContext, liveContextManager} from "@Module/stream/data/store";

// Api.
import {ILiveEvent} from "@Api/x-core/live/models";

// View.
import {AnimatedMount} from "@Main/view/utils/animations/AnimatedMount";
import {
  IMainLoadingProgressComponentExternalProps,
  MainLoadingProgressComponent
} from "@Main/view/utils/lazy_load/MainLoadingProgress.Component";
import {Grid, WithStyles} from "@material-ui/core";
import {
  EventCreationForm,
  IEventCreationFormExternalProps
} from "@Module/stream/view/components/creation/EventCreationForm/EventCreationForm.Component";
import {
  IStreamingHeaderBarExternalProps,
  StreamingHeaderBar
} from "@Module/stream/view/components/heading/StreamingHeaderBar";
import {streamCreationPageStyle} from "./StreamCreationPage.Style";

// Props.
export interface IStreamCreationPageExternalProps extends WithStyles<typeof streamCreationPageStyle> {}
export interface IStreamCreationPageOwnProps {}
export interface IStreamCreationPageProps extends IStreamCreationPageOwnProps, IStreamCreationPageExternalProps, ILiveContext, IRouterContext {}

@Consume(routerContextManager, liveContextManager)
@Styled(streamCreationPageStyle)
export class StreamCreationPage extends PureComponent<IStreamCreationPageProps> {

  public componentWillMount(): void {

    const {liveState: {liveEvent}, liveActions: {checkActiveEvent}, routingActions: {replace}} = this.props;

    if (liveEvent) {
      replace("/stream/live/" + liveEvent.id);
    } else {
      checkActiveEvent().then();
    }
  }

  public componentWillReceiveProps(nextProps: IStreamCreationPageProps): void {

    const {routingActions: {replace}} = this.props;

    if (nextProps.liveState.liveEvent) {
      replace("/stream/live/" + nextProps.liveState.liveEvent.id);
    }
  }

  public render(): ReactNode {

    const {classes} = this.props;

    return (
      <Grid className={classes.root} direction={"column"} wrap={"nowrap"} container>
        {this.renderContent()}
      </Grid>
    );
  }

  private renderContent(): ReactNode {

    const {classes, liveState: {liveEventLoading}} = this.props;

    if (liveEventLoading) {
      return  <MainLoadingProgressComponent {...{} as IMainLoadingProgressComponentExternalProps}/>;
    }

    return (
      <Fragment>

        <StreamingHeaderBar {...{} as IStreamingHeaderBarExternalProps}/>

        <AnimatedMount>

          <Grid className={classes.content} direction={"column"} wrap={"nowrap"} alignItems={"center"} justify={"center"} container>

            {
              liveEventLoading
                ? null
                : <EventCreationForm loading={liveEventLoading} onBack={this.onCancelCreation} onCreate={this.onCreateLiveEvent} {...{} as IEventCreationFormExternalProps}/>
            }

          </Grid>

        </AnimatedMount>

      </Fragment>
    );
  }

  @Bind()
  private onCancelCreation(): void {

    const {routingActions: {replace}} = this.props;

    replace("/home");
  }

  @Bind()
  private async onCreateLiveEvent(name: string, description: string, secured: boolean, securedKey: string): Promise<void> {

    const {liveActions: {createEvent}, routingActions: {replace}} = this.props;

    const liveEvent: ILiveEvent = await createEvent(name, description, secured, securedKey);

    replace("/stream/live/" + liveEvent.id);
  }

}
