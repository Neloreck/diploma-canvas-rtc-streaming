import {Consume} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";
import * as React from "react";
import {Component, Fragment, ReactNode} from "react";

// Lib.
import {Styled} from "@Lib/react_lib/mui";

// Data.
import {localMediaService} from "@Module/stream/data/services/local_media";
import {
  ISourceContext,
  sourceContextManager
} from "@Module/stream/data/store";
import {IInputSourceDevices} from "@Module/stream/data/store/source/models/IInputSourceDevices";

// View.
import {Fab, Tooltip, WithStyles} from "@material-ui/core";
import {MoreVert} from "@material-ui/icons";
import {IInputSourcesConfigurationDrawerExternalProps, InputSourcesConfigurationDrawer} from "@Module/stream/view/components/preview/configuration_buttons/InputSourcesConfigurationDrawer/InputSourcesConfigurationDrawer.Component";
import {inputSourcesConfigurationButtonStyle} from "./InputSourcesConfigurationButton.Style";

// Props.
export interface IInputSourcesConfigurationButtonState {
  showDrawer: boolean;
}

export interface IInputSourcesConfigurationButtonExternalProps extends WithStyles<typeof inputSourcesConfigurationButtonStyle>, ISourceContext {}
export interface IInputSourcesConfigurationButtonOwnProps {}
export interface IInputSourcesConfigurationButtonProps extends IInputSourcesConfigurationButtonOwnProps, IInputSourcesConfigurationButtonExternalProps {}

@Consume<ISourceContext, IInputSourcesConfigurationButtonProps>(sourceContextManager)
@Styled(inputSourcesConfigurationButtonStyle)
export class InputSourcesConfigurationButton extends Component<IInputSourcesConfigurationButtonProps, IInputSourcesConfigurationButtonState> {

  public readonly state: IInputSourcesConfigurationButtonState = {
    showDrawer: false
  };

  public render(): ReactNode {

    const {classes, sourceState: {selectedDevices}} = this.props;
    const {showDrawer} = this.state;

    return (
      <Fragment>

        <Tooltip title={"Configure source."} placement={"right"}>
          <Fab className={classes.root} onClick={this.onShowModal}>
            <MoreVert/>
          </Fab>
        </Tooltip>

        <InputSourcesConfigurationDrawer
          show={showDrawer}
          selectedDevices={selectedDevices}
          onHide={this.onHideModal}
          onShow={this.onShowModal}
          onInputSourcesChange={this.onSourcesUpdate}
          {...{} as IInputSourcesConfigurationDrawerExternalProps}
        />

      </Fragment>
    );
  }

  @Bind()
  private async onSourcesUpdate(devices: IInputSourceDevices): Promise<void> {

    const {sourceState: {captureVideo}, sourceActions: {updateInputStreamAndSources, updateInputSources}} = this.props;

    if (captureVideo) {
      const stream: MediaStream = await localMediaService.getUserMedia(devices.videoInput, false);
      updateInputStreamAndSources(stream, devices);
    } else {
      updateInputSources(devices);
    }
  }

  @Bind()
  private onShowModal(): void {
    this.setState({ showDrawer: true });
  }

  @Bind()
  private onHideModal(): void {
    this.setState({ showDrawer: false });
  }

}
