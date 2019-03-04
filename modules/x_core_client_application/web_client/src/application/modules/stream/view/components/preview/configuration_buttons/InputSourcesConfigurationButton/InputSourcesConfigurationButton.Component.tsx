import { Bind, Consume } from "dreamstate";
import * as React from "react";
import { Component, Fragment, ReactNode } from "react";

// Lib.
import { Styled } from "@Lib/decorators";
import { getUserMedia, IInputSourceDevices } from "@Lib/media";

// Data.
import { streamConfig } from "@Module/stream/data/configs/StreamConfig";
import { ISourceContext, sourceContextManager } from "@Module/stream/data/store";

// View.
import { Fab, Tooltip, WithStyles } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import { IInputSourcesConfigurationDrawerInjectedProps, InputSourcesConfigurationDrawer } from "@Module/stream/view/components/preview/configuration_buttons/InputSourcesConfigurationDrawer";
import { inputSourcesConfigurationButtonStyle } from "./InputSourcesConfigurationButton.Style";

// Props.
export interface IInputSourcesConfigurationButtonState {
  showDrawer: boolean;
}

export interface IInputSourcesConfigurationButtonInjectedProps extends WithStyles<typeof inputSourcesConfigurationButtonStyle>, ISourceContext {}
export interface IInputSourcesConfigurationButtonOwnProps {}
export interface IInputSourcesConfigurationButtonProps extends IInputSourcesConfigurationButtonOwnProps, IInputSourcesConfigurationButtonInjectedProps {}

@Consume(sourceContextManager)
@Styled(inputSourcesConfigurationButtonStyle)
export class InputSourcesConfigurationButton extends Component<IInputSourcesConfigurationButtonProps, IInputSourcesConfigurationButtonState> {

  public readonly state: IInputSourcesConfigurationButtonState = {
    showDrawer: false
  };

  public render(): ReactNode {

    const { classes, sourceState: { selectedDevices } } = this.props;
    const { showDrawer } = this.state;

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
          {...{} as IInputSourcesConfigurationDrawerInjectedProps}
        />

      </Fragment>
    );
  }

  @Bind()
  private async onSourcesUpdate(devices: IInputSourceDevices): Promise<void> {

    const { sourceState: { captureVideo }, sourceActions: { updateInputStreamAndSources, updateInputSources } } = this.props;

    if (captureVideo) {

      const stream: MediaStream = await getUserMedia(
        streamConfig.getMediaConstraints(devices.videoInput, devices.audioInput)
      );

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
