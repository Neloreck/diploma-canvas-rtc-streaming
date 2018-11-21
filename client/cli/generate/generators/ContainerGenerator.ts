import {AbstractComponentGenerator} from "./AbstractComponentGenerator";

export class ContainerGenerator extends AbstractComponentGenerator {

  protected generateStyleAsStr(componentName: string): string {
    return (
`import {createStyles, Theme} from "@material-ui/core";

export const ${this.deCapitalizeFirstLetter(componentName)}Style = (theme: Theme) => createStyles({
  root: {
    height: "100%",
    width: "100%"
  }
});
`);

  }

  protected generateComponentAsStr(componentName: string): string {
    return (
`import * as React from "react";
import {Component} from "react";

import {Styled} from "_libPath_";

import {WithStyles} from "@material-ui/core";

import {${this.deCapitalizeFirstLetter(componentName)}Style} from "./${componentName}.Style";

export interface I${componentName}ExternalProps extends WithStyles<typeof ${this.deCapitalizeFirstLetter(componentName)}Style> {}

export interface I${componentName}OwnProps {}

export interface I${componentName}Props extends I${componentName}OwnProps, I${componentName}ExternalProps {}

@Styled(${this.deCapitalizeFirstLetter(componentName)}Style)
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
`export {${componentName}, I${componentName}ExternalProps} from "./${componentName}.Component";
`);
  }

}
