import {Consume} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";
import * as React from "react";
import {PureComponent, ReactNode} from "react";

// Lib.
import {Styled} from "@Lib/react_lib/mui";

// Data.
import {
  ISourceContext,
  sourceContextManager
} from "@Module/stream/data/store";

// View.
import {Fab, Tooltip, WithStyles} from "@material-ui/core";
import {MusicNote, MusicOff} from "@material-ui/icons";
import {soundControlButtonStyle} from "./SoundControlButton.Style";

// Props.

export interface ISoundControlButtonExternalProps extends WithStyles<typeof soundControlButtonStyle>, ISourceContext {}
export interface ISoundControlButtonOwnProps {}
export interface ISoundControlButtonProps extends ISoundControlButtonOwnProps, ISoundControlButtonExternalProps {}

@Consume<ISourceContext, ISoundControlButtonProps>(sourceContextManager)
@Styled(soundControlButtonStyle)
export class SoundControlButton extends PureComponent<ISoundControlButtonProps> {

  public render(): ReactNode {

    const {classes, sourceState: {captureAudio, captureVideo}} = this.props;

    return (
        <Tooltip title={"Toggle sound capturing."} placement={"top"}>
          <Fab className={classes.root} onClick={this.onToggleAudio} color={"primary"}>
            { captureVideo && captureAudio ? <MusicNote/> : <MusicOff/> }
          </Fab>
        </Tooltip>
    );
  }

  @Bind()
  private onToggleAudio(): void {

    const {sourceActions: {setAudioCapturing}, sourceState: {captureAudio, captureVideo}} = this.props;

    if (captureVideo) {
      setAudioCapturing(!captureAudio);
    }
  }

}