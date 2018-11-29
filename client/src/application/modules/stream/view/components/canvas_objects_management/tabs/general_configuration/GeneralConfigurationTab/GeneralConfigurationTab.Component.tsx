import * as React from "react";
import {PureComponent} from "react";

// Lib.
import {Styled} from "@Lib/react_lib/@material_ui";

// View.
import {Grid, WithStyles} from "@material-ui/core";
import {IPreviewConfigurationBlockExternalProps, PreviewConfigurationBlock} from "@Module/stream/view/components/canvas_objects_management/tabs/general_configuration/PreviewConfigurationBlock";
import {IPreviewStatsBlockExternalProps, PreviewStatsBlock} from "@Module/stream/view/components/canvas_objects_management/tabs/general_configuration/PreviewStatsBlock";
import {generalConfigurationTabStyle} from "./GeneralConfigurationTab.Style";

// Props.

export interface IGeneralConfigurationTabExternalProps extends WithStyles<typeof generalConfigurationTabStyle> {}
export interface IGeneralConfigurationTabOwnProps {}
export interface IGeneralConfigurationTabProps extends IGeneralConfigurationTabOwnProps, IGeneralConfigurationTabExternalProps {}

@Styled(generalConfigurationTabStyle)
export class GeneralConfigurationTab extends PureComponent<IGeneralConfigurationTabProps> {

  public render(): JSX.Element {

    const {classes} = this.props;

    return (
      <Grid className={classes.root} direction={"column"} wrap={"nowrap"} container>

        <PreviewConfigurationBlock {...{} as IPreviewConfigurationBlockExternalProps}/>
        <PreviewStatsBlock {...{} as IPreviewStatsBlockExternalProps}/>

      </Grid>
    );
  }

}
