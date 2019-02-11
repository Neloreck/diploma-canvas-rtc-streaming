import * as React from "react";
import { ChangeEvent, Component, Fragment, ReactNode } from "react";

// Lib.
import { Styled } from "@Lib/react_lib/mui";
import { Bind } from "@redux-cbd/utils";

// View
import { Button, Grid, TextField, WithStyles } from "@material-ui/core";
import { textInputStyle } from "./TextInput.Style";

// Props.
export interface ITextInputState {
  text: string;
}

export interface ITextInputOwnProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
}

export interface ITextInputExternalProps extends WithStyles<typeof textInputStyle> {}
export interface ITextInputProps extends ITextInputOwnProps, ITextInputExternalProps {}

@Styled(textInputStyle)
export class TextInput extends Component<ITextInputProps, ITextInputState> {

  public state: ITextInputState = {
    text: this.props.value
  };

  public componentWillReceiveProps(nextProps: ITextInputProps): void {
    if (nextProps.value !== this.props.value) {
      this.setState({ text: nextProps.value });
    }
  }

  public render(): ReactNode {

    const { classes, label } = this.props;
    const { text } = this.state;

    return (
      <Grid className={classes.root} container>
        <Grid item xs={10}>
          <TextField className={classes.textInput} label={label || "Text"} value={text} onChange={this.onInputEdited}/>
        </Grid>
        <Grid item xs={2}>
          <Button className={classes.button} size={"small"} variant={"outlined"} onClick={this.onApply}> Apply </Button>
        </Grid>
      </Grid>);
    }

  @Bind()
  private onInputEdited(event: ChangeEvent<HTMLInputElement>): void {
    this.setState({ text: event.target.value });
  }

  @Bind()
  private onApply(): void {
    this.props.onChange(this.state.text);
  }

}
