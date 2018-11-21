import {Consume} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";
import * as React from "react";
import {ChangeEvent, Component} from "react";

import {Styled} from "@Lib/react_lib/@material_ui";

import {localMediaService} from "@Module/stream/data/services/local_media";
import {ISourceContextState, sourceContext} from "@Module/stream/data/store";

import {AppBar, Grid, Tab, Tabs, WithStyles} from "@material-ui/core";

import {HeaderBar, IHeaderBarExternalProps} from "@Module/main/view/containers/HeaderBar";
import {IPreviewConfigurationBlockExternalProps, PreviewConfigurationBlock} from "@Module/stream/view/components/canvas_objects_management/PreviewConfigurationBlock";
import {IRenderedVideoPreviewExternalProps, RenderedVideoPreview} from "@Module/stream/view/components/video_rendering/RenderedVideoPreview";

import {streamConfigurationPageStyle} from "./StreamConfigurationPage.Style";

export interface IStreamConfigurationPageState {
  currentTab: number;
}

export interface IStreamConfigurationPageExternalProps extends ISourceContextState, WithStyles<typeof streamConfigurationPageStyle> {}

export interface IStreamConfigurationPageOwnProps {}

export interface IStreamConfigurationPageProps extends IStreamConfigurationPageOwnProps, IStreamConfigurationPageExternalProps {}

@Consume<ISourceContextState, IStreamConfigurationPageProps>(sourceContext)
@Styled(streamConfigurationPageStyle)
export class StreamConfigurationPage extends Component<IStreamConfigurationPageProps, IStreamConfigurationPageState> {

  public readonly state: IStreamConfigurationPageState = {
    currentTab: 0
  };

  public componentWillMount(): void {
   this.setDefaultVideo();
  }

  public render(): JSX.Element {

    const {classes, sourceState: {inputStream}} = this.props;

    return (
      <Grid className={classes.root} direction={"column"} wrap={"nowrap"} container>

        <HeaderBar {...{} as IHeaderBarExternalProps}/>

        <Grid className={classes.content} container>

          <Grid className={classes.streamingVideoSection} direction={"row"} container>

            <Grid className={classes.streamingVideo} item>
              <RenderedVideoPreview stream={inputStream} {...{} as IRenderedVideoPreviewExternalProps}/>
            </Grid>

            <Grid className={classes.configSidebar} item>
              <PreviewConfigurationBlock {...{} as IPreviewConfigurationBlockExternalProps}/>
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
    const {sourceActions: {updateInputStreamAndSources}, sourceState: {selectedDevices}} = this.props;
    const stream: MediaStream = await localMediaService.getUserMedia(selectedDevices.videoInput, selectedDevices.audioInput);

    updateInputStreamAndSources(stream, selectedDevices);
  }

  @Bind()
  private onTabChange(event: ChangeEvent<any>, tabNumber: any): void {
    this.setState({ currentTab: +tabNumber });
  }

}
