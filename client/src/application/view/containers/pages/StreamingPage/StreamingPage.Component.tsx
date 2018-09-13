import * as React from "react";
import {Component} from "react";

import {withConnection, withStyle} from "@Annotate";
import {IGlobalStoreState} from "@Redux";
import {ChangeSelectedMediaDevicesAction} from "@Store/input_source/actions";
import {IInputSourceDevices} from "@Store/input_source/store/IInputSourceDevices";

import {IStreamingPageDispatchProps, IStreamingPageProps, IStreamingPageStoreProps} from "./StreamingPage.StateProps";
import {streamingPageStyle} from "./StreamingPage.Style";

import {Grid} from "@material-ui/core";

import {
  IInputSourcePreviewVideoExternalProps,
  InputSourcePreviewVideo
} from "@Components/elements/input_source/InputSourcePreviewVideo";
import {
  IInputSourcesSelectFormExternalProps,
  InputSourcesSelectForm
} from "@Components/elements/input_source/InputSourcesSelectForm";
import {HeaderBar, IHeaderBarExternalProps} from "@Containers/elements/HeaderBar";

@withConnection<IStreamingPageStoreProps, IStreamingPageDispatchProps, IStreamingPageProps>(
  (store: IGlobalStoreState) => ({
    authorizing: store.auth.authorizing,
    selectedDevices: store.inputSource.selectedDevices
  }), {
    changeInputSources: (devices: IInputSourceDevices) => new ChangeSelectedMediaDevicesAction(devices)
  })
@withStyle(streamingPageStyle)
export class StreamingPage extends Component<IStreamingPageProps> {

  public render(): JSX.Element {
    return (
      <Grid className={this.props.classes.root} direction={"column"} wrap={"nowrap"} container>

        <HeaderBar {...{} as IHeaderBarExternalProps}> </HeaderBar>

        <Grid className={this.props.classes.content} container>

          <Grid className={this.props.classes.streamingVideoSection} direction={"row"} container>

            <Grid className={this.props.classes.streamingVideo} item>
              <InputSourcePreviewVideo {...{} as IInputSourcePreviewVideoExternalProps} sources={this.props.selectedDevices}/>
            </Grid>

            <Grid className={this.props.classes.streamingComments} item>
              123 <br/>
              123 <br/>
              123 <br/>
              123 <br/>
              123
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
