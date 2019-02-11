import { Consume } from "@redux-cbd/context";
import { Bind } from "@redux-cbd/utils";
import * as React from "react";
import { PureComponent, ReactNode } from "react";

// Lib.
import { Styled } from "@Lib/react_lib/mui";

// Data.
import {
  IRenderingContext, ISourceContext,
  renderingContextManager, sourceContextManager
} from "@Module/stream/data/store";

// View.
import { Fab, Tooltip, WithStyles } from "@material-ui/core";
import { Videocam, VideocamOff } from "@material-ui/icons";
import { videoControlButtonStyle } from "./VideoControlButton.Style";

// Props.

export interface IVideoControlButtonExternalProps extends WithStyles<typeof videoControlButtonStyle>, ISourceContext {}
export interface IVideoControlButtonOwnProps {}
export interface IVideoControlButtonProps extends IVideoControlButtonOwnProps, IVideoControlButtonExternalProps {}

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
