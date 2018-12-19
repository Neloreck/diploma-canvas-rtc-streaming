import {Bind} from "@redux-cbd/utils";
import * as React from "react";
import {ChangeEvent, PureComponent, ReactNode} from "react";

// Lib.
import {Styled} from "@Lib/react_lib/mui";

// View.
import {FormControlLabel, Switch, WithStyles} from "@material-ui/core";
import {booleanSwitcherStyle} from "./BooleanSwitcher.Style";

// Props.
export interface IBooleanSwitcherOwnProps {
  label?: string;
  value: boolean;
  onToggle: (checked: boolean) => void;
}

export interface IBooleanSwitcherExternalProps extends WithStyles<typeof booleanSwitcherStyle> {}
export interface IBooleanSwitcherProps extends IBooleanSwitcherOwnProps, IBooleanSwitcherExternalProps {}

@Styled(booleanSwitcherStyle)
export class BooleanSwitcher extends PureComponent<IBooleanSwitcherProps> {

  public render(): ReactNode {

    const {label, classes, value} = this.props;

    return (
      <FormControlLabel
        className={classes.root}
        label={label || "Toggle"}
        control={<Switch checked={value} color={"primary"} onChange={this.onToggle}/>}
      />
    );
  }

  @Bind()
  private onToggle(event: ChangeEvent): void {
    this.props.onToggle((event.target as any).checked);
  }

}
