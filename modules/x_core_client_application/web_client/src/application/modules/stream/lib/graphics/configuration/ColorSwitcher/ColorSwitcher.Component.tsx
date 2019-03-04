import { Bind } from "dreamstate";
import * as React from "react";
import { Component, Fragment, MouseEvent, ReactNode } from "react";

// Lib.
import { Styled } from "@Lib/decorators";

// View.
import { Grid, TextField, WithStyles } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { ChromePicker, ColorResult } from "react-color";
import { colorSwitcherStyle } from "./ColorSwitcher.Style";

// Props.
export interface IColorSwitcherState {
  showModal: boolean;
}

export interface IColorSwitcherExternalProps extends WithStyles<typeof colorSwitcherStyle> {}

export interface IColorSwitcherOwnProps {
  label?: string;
  value: string;
  onChange: (newColor: string) => void;
}

export interface IColorSwitcherProps extends IColorSwitcherExternalProps, IColorSwitcherOwnProps {}

@Styled(colorSwitcherStyle)
export class ColorSwitcher extends Component<IColorSwitcherProps, IColorSwitcherState> {

  public state: IColorSwitcherState = {
    showModal: false
  };

  public lastColor: string = "";

  public render(): ReactNode {

    const { label, classes, value } = this.props;
    const { showModal } = this.state;

    return (
      <Fragment>

        <TextField
          className={classes.root}
          name={name}
          value={value}
          label={label || "Color"}
          placeholder={label || "color"}
          onClick={this.toggleModalVisibility}
        />

        {showModal ? this.renderModal() : null}

      </Fragment>
    );
  }

  private renderModal(): ReactNode {

    const { classes, value } = this.props;

    return (
      <Grid className={classes.modalRoot} alignItems={"center"} justify={"center"} container>

        <Grid className={classes.modalBackdrop} onClick={this.toggleModalVisibility}/>
        <Close className={classes.modalCloseButton} onClick={this.toggleModalVisibility}/>

        <ChromePicker
          color={value}
          onChange={this.onChange}
        />

      </Grid>
    );
  }

  @Bind()
  private toggleModalVisibility(event: MouseEvent<any>): void {

    const { value, onChange } = this.props;
    const { showModal } = this.state;

    if (showModal) {
      onChange(this.lastColor);
    } else {
      this.lastColor = value;
    }

    this.setState({ showModal: !showModal });
  }

  @Bind()
  private onChange(color: ColorResult): void {
    this.lastColor = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
  }

}
