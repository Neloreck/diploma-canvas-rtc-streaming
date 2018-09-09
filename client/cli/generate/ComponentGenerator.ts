import {AbstractGenerator} from "./AbstractGenerator";

export class ComponentGenerator extends AbstractGenerator{

  protected generateStyleAsStr(componentName: string): string {
    return (
`import {createStyles} from "@material-ui/core/styles";

export const ${this.deCapitalizeFirstLetter(componentName)}Style = createStyles({
  root: {
    height: "100%",
    width: "100%"
  }
});
`);
  }

  protected generatePropAsStr(componentName: string): string {
    return (
`<im></im>port {WithStyles} from "@material-ui/core";
import {${this.deCapitalizeFirstLetter(componentName)}Style} from "./${componentName}.Style";

export interface I${componentName}OwnProps {
}

export interface I${componentName}Props extends I${componentName}OwnProps,
 WithStyles<typeof ${this.deCapitalizeFirstLetter(componentName)}Style> {
}
`);
  }

  protected generateComponentAsStr(componentName: string): string {
    return (
`import * as React from "react";
import {Component} from "react";

import {withStyle} from "@Annotate";

import {I${componentName}Props} from "./${componentName}.StateProps";
import {${this.deCapitalizeFirstLetter(componentName)}Style} from "./${componentName}.Style";

@withStyle(${this.deCapitalizeFirstLetter(componentName)}Style)
export class ${componentName} extends Component<I${componentName}Props> {

  public render(): JSX.Element {
    return (
      <div className={this.props.classes.root}>
        <!-- Content -->
      </div>
    );
  }

}
`);
  }

  protected generateIndexTemplateAsStr(componentName: string): string {
    return (
`export {${componentName}} from "./${componentName}.Component";
export {I${componentName}Props} from "./${componentName}.StateProps";
`);
  }

}
