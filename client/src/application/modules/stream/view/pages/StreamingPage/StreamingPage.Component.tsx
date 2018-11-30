import {Consume} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";
import * as React from "react";
import {ChangeEvent, Component, Fragment, ReactNode} from "react";

// Lib.
import {Styled} from "@Lib/react_lib/@material_ui";

// Data.
import {localMediaService} from "@Module/stream/data/services/local_media";
import {graphicsContextManager, IGraphicsContext, ISourceContext, sourceContextManager} from "@Module/stream/data/store";

// View.
import {HeaderBar, IHeaderBarExternalProps} from "@Main/view/containers/HeaderBar";
import {AppBar, Grid, Tab, Tabs, WithStyles} from "@material-ui/core";
import {
  IMainPreviewControlExternalProps,
  MainPreviewControl
} from "@Module/stream/view/components/preview/MainPreviewControl";
import {
  GeneralConfigurationTab,
  IGeneralConfigurationTabExternalProps
} from "@Module/stream/view/components/tabs/general_configuration/GeneralConfigurationTab";
import {
  IObjectsConfigurationTabExternalProps,
  ObjectsConfigurationTab
} from "@Module/stream/view/components/tabs/objects_configuration/ObjectsConfigurationTab";
import {streamingPageStyle} from "./StreamingPage.Style";

// Props.
export interface IStreamingPageState {
  currentTab: number;
}

export interface IStreamingPageExternalProps extends ISourceContext, IGraphicsContext, WithStyles<typeof streamingPageStyle> {}

export interface IStreamingPageOwnProps {}

export interface IStreamingPageProps extends IStreamingPageOwnProps, IStreamingPageExternalProps {}

@Consume<IGraphicsContext, IStreamingPageProps>(graphicsContextManager)
@Consume<ISourceContext, IStreamingPageProps>(sourceContextManager)
@Styled(streamingPageStyle)
export class StreamingPage extends Component<IStreamingPageProps, IStreamingPageState> {

  public readonly state: IStreamingPageState = {
    currentTab: 0
  };

  public componentWillMount(): void {

    const {graphicsState: {showMainVideo}} = this.props;

    if (showMainVideo) {
      this.getDefaultVideo();
    }
  }

  public componentWillReceiveProps(nextProps: IStreamingPageProps): void {

    const {inputStream} = this.props.sourceState;

    if (nextProps.graphicsState.showMainVideo !== this.props.graphicsState.showMainVideo) {
      if (nextProps.graphicsState.showMainVideo) {
        this.getDefaultVideo();
      } else {
        localMediaService.killStream(inputStream);
      }
    }
  }

  public render(): JSX.Element {

    const {classes} = this.props;

    return (
      <Grid className={classes.root} direction={"column"} wrap={"nowrap"} container>

        <HeaderBar {...{} as IHeaderBarExternalProps}/>

        <Grid className={classes.content} container>

          {/* Wrap video for proper resizing. */}
          <Grid className={classes.streamingVideoSection} direction={"row"} container>
            <Grid className={classes.streamingVideo} item>
              <MainPreviewControl {...{} as IMainPreviewControlExternalProps}/>
            </Grid>
          </Grid>

          {/* Content tabs. */}
          <Grid className={classes.under}>
            {this.renderTabs()}
          </Grid>

        </Grid>

      </Grid>
    );
  }

  // Todo:
  private renderTabs(): JSX.Element {

    const {classes} = this.props;
    const {currentTab} = this.state;

    let tabContent: ReactNode;

    switch (currentTab) {
      case 0:
        tabContent = <GeneralConfigurationTab {...{} as IGeneralConfigurationTabExternalProps}/>;
        break;

      case 1:
        tabContent = <ObjectsConfigurationTab {...{} as IObjectsConfigurationTabExternalProps}/>;
        break;

      default:
        tabContent = <div> Error... </div>;
    }

    return (
      <Fragment>
        <AppBar position="relative" color="default">

          <Tabs
            value={this.state.currentTab}
            onChange={this.onTabChange}
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="General"/>
            <Tab label="Graphics"/>
          </Tabs>

        </AppBar>

        <Grid className={classes.tabsContent}>
          {tabContent}
        </Grid>

      </Fragment>
    );
  }

  @Bind()
  private async getDefaultVideo(): Promise<void> {
    const {sourceActions: {updateInputStreamAndSources}, sourceState: {selectedDevices}} = this.props;
    const stream: MediaStream = await localMediaService.getUserMedia(selectedDevices.videoInput || true, selectedDevices.audioInput);

    updateInputStreamAndSources(stream, selectedDevices);
  }

  @Bind()
  private onTabChange(event: ChangeEvent<any>, tabNumber: any): void {
    this.setState({ currentTab: +tabNumber });
  }

}
