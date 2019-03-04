import * as React from "react";
import { PureComponent, ReactNode } from "react";

// Lib.
import { Styled } from "@Lib/decorators";

// View.
import { Grid, WithStyles } from "@material-ui/core";
import {
  IPreviewConfigurationBlockInjectedProps, PreviewConfigurationBlock
} from "@Module/stream/view/components/tabs/general_configuration/PreviewConfigurationBlock";
import { generalConfigurationTabStyle } from "./GeneralConfigurationTab.Style";

// Props.

export interface IGeneralConfigurationTabInjectedProps extends WithStyles<typeof generalConfigurationTabStyle> {}
export interface IGeneralConfigurationTabOwnProps {}
export interface IGeneralConfigurationTabProps extends IGeneralConfigurationTabOwnProps, IGeneralConfigurationTabInjectedProps {}

@Styled(generalConfigurationTabStyle)
export class GeneralConfigurationTab extends PureComponent<IGeneralConfigurationTabProps> {

  public render(): ReactNode {

    const { classes } = this.props;

    return (
      <Grid className={classes.root} direction={"column"} wrap={"nowrap"} container>

        <PreviewConfigurationBlock {...{} as IPreviewConfigurationBlockInjectedProps}/>

      </Grid>
    );
  }

}
