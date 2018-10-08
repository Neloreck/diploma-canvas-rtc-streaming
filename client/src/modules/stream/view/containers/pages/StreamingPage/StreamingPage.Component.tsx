import * as React from "react";
import {Component} from "react";

import {withStyle} from "@Lib/annotate";

import {IStreamingPageDispatchProps, IStreamingPageProps, IStreamingPageStoreProps} from "./StreamingPage.StateProps";
import {streamingPageStyle} from "./StreamingPage.Style";

import {Grid} from "@material-ui/core";

import {IStreamStoreState} from "@Module/stream/data/store/IStreamStoreState";

import {StreamStoreConnect} from "@Module/stream/data/store";
import {IInputSourceDevices} from "@Module/stream/data/store/input_source/store/IInputSourceDevices";

import {ChangeSelectedMediaDevicesAction} from "@Module/stream/data/store/input_source/actions";

import {HeaderBar, IHeaderBarExternalProps} from "@Main/view/containers/elements/HeaderBar";

import {
  IInputSourcePreviewVideoExternalProps,
  InputSourcePreviewVideo
} from "@Module/stream/view/components/elements/input_source/InputSourcePreviewVideo";

import {
  IInputSourcesSelectFormExternalProps,
  InputSourcesSelectForm
} from "@Module/stream/view/components/elements/input_source/InputSourcesSelectForm";

@StreamStoreConnect<IStreamingPageStoreProps, IStreamingPageDispatchProps, IStreamingPageProps>(
  (store: IStreamStoreState) => ({
    selectedDevices: store.inputSource.selectedDevices
  }), {
    changeInputSources: (devices: IInputSourceDevices) => new ChangeSelectedMediaDevicesAction(devices)
  })
@withStyle(streamingPageStyle)
export class StreamingPage extends Component<IStreamingPageProps> {

  public render(): JSX.Element {
    return (
      <Grid className={this.props.classes.root} direction={"column"} wrap={"nowrap"} container>

        <HeaderBar {...{} as IHeaderBarExternalProps}/>

        <Grid className={this.props.classes.content} container>

          <Grid className={this.props.classes.streamingVideoSection} direction={"row"} container>

            <Grid className={this.props.classes.streamingVideo} item>
              <InputSourcePreviewVideo {...{} as IInputSourcePreviewVideoExternalProps} sources={this.props.selectedDevices}/>
            </Grid>

            <Grid className={this.props.classes.streamingComments} item>
              Comment 1 <br/>
              Comment 2 <br/>
              Comment 3 <br/>
              Comment 4 <br/>
              Comment 5
            </Grid>

          </Grid>

          <Grid className={this.props.classes.under}>
            <InputSourcesSelectForm {...{} as IInputSourcesSelectFormExternalProps} onInputSourcesChange={this.props.changeInputSources}/>
          </Grid>

        </Grid>

      </Grid>
    );
  }

}
