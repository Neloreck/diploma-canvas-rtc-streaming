import * as React from "react";
import {PureComponent} from "react";

import {withStyle} from "@Annotate";

import {IHeaderBarProps} from "./HeaderBar.StateProps";
import {headerBarStyle} from "./HeaderBar.Style";

@withStyle(headerBarStyle)
export class HeaderBar extends PureComponent<IHeaderBarProps> {

  public render(): JSX.Element {
    return (<div className={this.props.classes.root}> Header </div>);
  }

}
