import * as React from "react";
import {ChangeEvent, Component} from "react";
import {Bind} from "redux-cbd";

import {Styled} from "@Lib/react_lib/@material_ui";

import {localMediaService} from "@Module/stream/data/services/local_media";
import {IStreamStoreState, StreamStoreConnect} from "@Module/stream/data/store";
import {SetGraphicsDisplayAction, SetGridDisplayAction, SetPreviewModeAction} from "@Module/stream/data/store/graphics";
import {UpdateInputStreamAndSourcesAction} from "@Module/stream/data/store/source";
import {IInputSourceDevices} from "@Module/stream/data/store/source/models/IInputSourceDevices";

import {AppBar, Grid, Tab, Tabs} from "@material-ui/core";

import {
  HeaderBar, IHeaderBarExternalProps
} from "@Main/view/containers/elements/HeaderBar";
import {
  IPreviewConfigurationBlockExternalProps, PreviewConfigurationBlock
} from "@Module/stream/view/components/elements/canvas_objects_management/PreviewConfigurationBlock";
import {
  IRenderedVideoPreviewExternalProps, RenderedVideoPreview
} from "@Module/stream/view/components/elements/video_rendering/RenderedVideoPreview";

import {
  IStreamConfigurationPageDispatchProps, IStreamConfigurationPageProps, IStreamConfigurationPageState,
  IStreamConfigurationPageStoreProps
} from "./StreamConfigurationPage.StateProps";
import {streamConfigurationPageStyle} from "./StreamConfigurationPage.Style";

@StreamStoreConnect<IStreamConfigurationPageStoreProps, IStreamConfigurationPageDispatchProps, IStreamConfigurationPageProps>(
  (store: IStreamStoreState) => ({
    inputStream: store.source.inputStream,
    selectedDevices: store.source.selectedDevices,

    renderObjects: store.graphics.objects,
    showGraphics: store.graphics.showGraphics,
    showGrid: store.graphics.showGrid,
    showPreview: store.graphics.showPreview,
  }), {
    setGraphicsDisplay: (show: boolean) => new SetGraphicsDisplayAction({ show }),
    setGridDisplay: (show: boolean) => new SetGridDisplayAction({ show }),
    setPreviewMode: (show: boolean) => new SetPreviewModeAction({ show }),
    updateStreamAndSources: (stream: MediaStream, devices: IInputSourceDevices) => new UpdateInputStreamAndSourcesAction({ stream, devices })
  })
@Styled(streamConfigurationPageStyle)
export class StreamConfigurationPage extends Component<IStreamConfigurationPageProps, IStreamConfigurationPageState> {

  public readonly state: IStreamConfigurationPageState = {
    currentTab: 0
  };

  public componentWillMount(): void {
   this.setDefaultVideo();
  }

  public render(): JSX.Element {

    const {classes, renderObjects, showPreview, showGraphics, showGrid, inputStream} = this.props;

    return (
      <Grid className={classes.root} direction={"column"} wrap={"nowrap"} container>

        <HeaderBar {...{} as IHeaderBarExternalProps}/>

        <Grid className={classes.content} container>

          <Grid className={classes.streamingVideoSection} direction={"row"} container>

            <Grid className={classes.streamingVideo} item>
              <RenderedVideoPreview stream={inputStream}
                                    renderObjects={renderObjects}
                                    showGrid={showGrid}
                                    showGraphics={showGraphics}
                                    showPreview={showPreview}
                                    {...{} as IRenderedVideoPreviewExternalProps}/>
            </Grid>

            <Grid className={classes.configSidebar} item>
              <PreviewConfigurationBlock
                showGrid={showGrid}
                showGraphics={showGraphics}
                showPreview={showPreview}
                onPreviewToggle={this.onTogglePreviewMode}
                onGraphicsToggle={this.onToggleGraphics}
                onGridToggle={this.onToggleGridDisplay}
                {...{} as IPreviewConfigurationBlockExternalProps}/>
            </Grid>

          </Grid>

          <Grid className={classes.under}>

            {this.renderTabs()}

          </Grid>

        </Grid>

      </Grid>
    );
  }

  // Todo:
  private renderTabs(): JSX.Element {
    return (
      <AppBar position="relative" color="default">
      <Tabs
        value={this.state.currentTab}
        onChange={this.onTabChange}
        scrollButtons="on"
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Graphics"/>
        <Tab label="Something else..."/>
        <Tab label="Something else..."/>
      </Tabs>
      </AppBar>
    );
  }

  private async setDefaultVideo(): Promise<void> {

    const {selectedDevices, updateStreamAndSources} = this.props;
    const stream: MediaStream = await localMediaService.getUserMedia(selectedDevices.videoInput, selectedDevices.audioInput);

    updateStreamAndSources(stream, selectedDevices);
  }

  @Bind
  private onTabChange(event: ChangeEvent<any>, tabNumber: any): void {
    this.setState({ currentTab: +tabNumber });
  }

  @Bind
  private onToggleGridDisplay(show: boolean): void {
    this.props.setGridDisplay(show);
  }

  @Bind
  private onToggleGraphics(show: boolean): void {
    this.props.setGraphicsDisplay(show);
  }

  @Bind
  private onTogglePreviewMode(show: boolean): void {
    this.props.setPreviewMode(show);
  }

}
