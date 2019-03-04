import { Bind } from "dreamstate";
import * as React from "react";
import { ChangeEvent, PureComponent, ReactNode } from "react";

// Lib.
import { Styled } from "@Lib/decorators";

// View
import { TextField, WithStyles } from "@material-ui/core";
import { rangeInputStyle } from "./RangeInput.Style";

// Props.
export interface IRangeInputOwnProps {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
}

export interface IRangeInputExternalProps extends WithStyles<typeof rangeInputStyle> {}
export interface IRangeInputProps extends IRangeInputOwnProps, IRangeInputExternalProps {}

@Styled(rangeInputStyle)
export class RangeInput extends PureComponent<IRangeInputProps> {

  public render(): ReactNode {

    const { classes, label, value } = this.props;

    return <TextField className={classes.root} label={label || "Size"} value={value} onChange={this.onInputEdited}/>;
  }

  @Bind()
  private onInputEdited(event: ChangeEvent<HTMLInputElement>): void {

    const { min, max } = this.props;
    const value: number = +event.target.value;

    if (Number.isInteger(value) && value <= (max || 100) && value >= (min || 0)) {
      this.props.onChange(value);
    }
  }

}
