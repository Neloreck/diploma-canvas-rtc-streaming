import * as React from "react";
import {PureComponent} from "react";

import {Grid} from "@material-ui/core";

import {Styled} from "@Lib/react_lib/@material_ui";

import {IStreamStoreState, StreamStoreConnect} from "@Module/stream/data/store";
import {ChangeSelectedMediaDevicesAction} from "@Module/stream/data/store/input_source/actions";
import {IInputSourceDevices} from "@Module/stream/data/store/input_source/models/IInputSourceDevices";

import {HeaderBar, IHeaderBarExternalProps} from "@Main/view/containers/elements/HeaderBar";
import {
  IInputSourcePreviewVideoExternalProps,
  InputSourcePreviewVideo
} from "@Module/stream/view/components/elements/input_source/InputSourcePreviewVideo";

import {IStreamingPageDispatchProps, IStreamingPageProps, IStreamingPageStoreProps} from "./StreamingPage.StateProps";
import {streamingPageStyle} from "./StreamingPage.Style";

@StreamStoreConnect<IStreamingPageStoreProps, IStreamingPageDispatchProps, IStreamingPageProps>(
  (store: IStreamStoreState) => ({
    renderObjects: store.graphics.objects,
    selectedDevices: store.inputSource.selectedDevices
  }), {
    changeInputSources: (devices: IInputSourceDevices) => new ChangeSelectedMediaDevicesAction(devices)
  })
@Styled(streamingPageStyle)
export class StreamingPage extends PureComponent<IStreamingPageProps> {

  public render(): JSX.Element {
    return (
      <Grid className={this.props.classes.root} direction={"column"} wrap={"nowrap"} container>

        <HeaderBar {...{} as IHeaderBarExternalProps}/>

        <Grid className={this.props.classes.content} container>

          <Grid className={this.props.classes.streamingVideoSection} direction={"row"} container>

            <Grid className={this.props.classes.streamingVideo} item>
              <InputSourcePreviewVideo renderObjects={this.props.renderObjects}
                                       sources={this.props.selectedDevices}
                                       {...{} as IInputSourcePreviewVideoExternalProps}/>
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
            Under...
          </Grid>

        </Grid>

      </Grid>
    );
  }

}
