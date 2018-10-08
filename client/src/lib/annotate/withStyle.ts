import {ClassType, Component, ComponentState} from "react";

import {withStyles} from "@material-ui/core";
import {StyleRules, StyleRulesCallback, WithStylesOptions} from "@material-ui/core/styles/withStyles";

export function withStyle
<P1, T1 extends Component<P1, ComponentState>, ClassKey extends string, Options extends WithStylesOptions<ClassKey> = {}>(
  style: StyleRulesCallback<ClassKey> | StyleRules<ClassKey>, options?: Options) {

  return (target: ClassType<P1, T1, any>): ClassType<P1, T1, any> => {
    return withStyles(style, options)(target);
  };

}
