import { Bind, Consume } from "dreamstate";
import * as React from "react";
import { PureComponent, ReactNode } from "react";

// Lib.
import { Styled } from "@Lib/decorators";

// Data.
import {
  ISourceContext, sourceContextManager
} from "@Module/stream/data/store";

// View.
import { Fab, Tooltip, WithStyles } from "@material-ui/core";
import { Videocam, VideocamOff } from "@material-ui/icons";
import { videoControlButtonStyle } from "./VideoControlButton.Style";

// Props.

export interface IVideoControlButtonInjectedProps extends WithStyles<typeof videoControlButtonStyle>, ISourceContext {}
export interface IVideoControlButtonOwnProps {}
export interface IVideoControlButtonProps extends IVideoControlButtonOwnProps, IVideoControlButtonInjectedProps {}

@Consume(sourceContextManager)
@Styled(videoControlButtonStyle)
export class VideoControlButton extends PureComponent<IVideoControlButtonProps> {

  public render(): ReactNode {

    const { classes, sourceState: { captureVideo } } = this.props;

    return (
      <Tooltip title={"Toggle video capturing."} placement={"top"}>
        <Fab className={classes.root} onClick={this.onToggleAudio} color={"primary"}>
          { captureVideo ? <Videocam/> : <VideocamOff/> }
        </Fab>
      </Tooltip>
    );
  }

  @Bind()
  private onToggleAudio(): void {

    const { sourceActions: { setVideoCapturing }, sourceState: { captureVideo } } = this.props;

    setVideoCapturing(!captureVideo);
  }

}
