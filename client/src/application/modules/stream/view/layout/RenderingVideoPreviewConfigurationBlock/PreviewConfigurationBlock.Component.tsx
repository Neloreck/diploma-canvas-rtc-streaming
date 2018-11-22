import * as React from "react";
import {PureComponent} from "react";

import {Styled} from "@Lib/react_lib/@material_ui";

import {Grid, WithStyles} from "@material-ui/core";

import {IPreviewConfigurationBlockExternalProps, PreviewConfigurationBlock} from "@Module/stream/view/components/canvas_objects_management/PreviewConfigurationBlock";
import {IPreviewStatsBlockExternalProps, PreviewStatsBlock} from "@Module/stream/view/components/canvas_objects_management/PreviewStatsBlock";

import {renderingVideoPreviewConfigurationBlockStyle} from "./RenderingVideoPreviewConfigurationBlock.Style";

export interface IRenderingVideoPreviewConfigurationBlockExternalProps extends WithStyles<typeof renderingVideoPreviewConfigurationBlockStyle> {}
export interface IRenderingVideoPreviewConfigurationBlockOwnProps {}
export interface IRenderingVideoPreviewConfigurationBlockProps extends IRenderingVideoPreviewConfigurationBlockOwnProps, IRenderingVideoPreviewConfigurationBlockExternalProps {}

@Styled(renderingVideoPreviewConfigurationBlockStyle)
export class RenderingVideoPreviewConfigurationBlock extends PureComponent<IRenderingVideoPreviewConfigurationBlockProps> {

  public render(): JSX.Element {

    const {classes} = this.props;

    return (
      <Grid className={classes.root} direction={"column"} container>

        <PreviewConfigurationBlock {...{} as IPreviewConfigurationBlockExternalProps}/>
        <PreviewStatsBlock {...{} as IPreviewStatsBlockExternalProps}/>

      </Grid>
    );
  }

}
