import * as React from "react";
import {ChangeEvent, Component} from "react";
import {AutoBind} from "redux-cbd";

import {AppBar, Grid, Tab, Tabs} from "@material-ui/core";

import {Styled} from "@Lib/react_lib/@material_ui";

import {IStreamStoreState, StreamStoreConnect} from "@Module/stream/data/store";
import {SetGridDisplayAction, SetPreviewModeAction} from "@Module/stream/data/store/graphics";

import {HeaderBar, IHeaderBarExternalProps} from "@Main/view/containers/elements/HeaderBar";
import {IPreviewConfigurationBlockExternalProps, PreviewConfigurationBlock} from "@Module/stream/view/components/elements/canvas_objects_management/PreviewConfigurationBlock";
import {
  IInputSourcePreviewVideoExternalProps,
  InputSourcePreviewVideo
} from "@Module/stream/view/components/elements/input_source/InputSourcePreviewVideo";

import {
  IStreamingPageDispatchProps,
  IStreamingPageProps,
  IStreamingPageStoreProps,
  IStreamPageState
} from "./StreamingPage.StateProps";
import {streamingPageStyle} from "./StreamingPage.Style";

@StreamStoreConnect<IStreamingPageStoreProps, IStreamingPageDispatchProps, IStreamingPageProps>(
  (store: IStreamStoreState) => ({
    renderObjects: store.graphics.objects,
    selectedDevices: store.inputSource.selectedDevices,
    showGrid: store.graphics.showGrid,
    showPreview: store.graphics.showPreview
  }), {
    setGridDisplay: (show: boolean) => new SetGridDisplayAction({ show }),
    setPreviewMode: (show: boolean) => new SetPreviewModeAction({ show })
  })
@Styled(streamingPageStyle)
export class StreamingPage extends Component<IStreamingPageProps, IStreamPageState> {

  public readonly state: IStreamPageState = {
    currentTab: 0
  };

  public render(): JSX.Element {

    const {classes, showPreview, showGrid} = this.props;

    return (
      <Grid className={classes.root} direction={"column"} wrap={"nowrap"} container>

        <HeaderBar {...{} as IHeaderBarExternalProps}/>

        <Grid className={classes.content} container>

          <Grid className={classes.streamingVideoSection} direction={"row"} container>

            <Grid className={classes.streamingVideo} item>
              <InputSourcePreviewVideo renderObjects={this.props.renderObjects}
                                       sources={this.props.selectedDevices}
                                       showGrid={showGrid}
                                       showPreview={showPreview}
                                       {...{} as IInputSourcePreviewVideoExternalProps}/>
            </Grid>

            <Grid className={classes.configSidebar} item>
              <PreviewConfigurationBlock
                showGrid={showGrid}
                showPreview={showPreview}
                onPreviewToggle={this.onTogglePreviewMode}
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

  @AutoBind
  private onTabChange(event: ChangeEvent<any>, tabNumber: any): void {
    this.setState({ currentTab: +tabNumber });
  }

  @AutoBind
  private onToggleGridDisplay(show: boolean): void {
    this.props.setGridDisplay(show);
  }

  @AutoBind
  private onTogglePreviewMode(show: boolean): void {
    this.props.setPreviewMode(show);
  }

}
