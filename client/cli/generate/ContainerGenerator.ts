import {AbstractGenerator} from "./AbstractGenerator";

export class ContainerGenerator extends AbstractGenerator {

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
`import {WithStyles} from "@material-ui/core";
import {${this.deCapitalizeFirstLetter(componentName)}Style} from "./${componentName}.Style";

export interface I${componentName}StoreProps {
}

export interface I${componentName}DispatchProps {
}

export interface I${componentName}OwnProps {
}

export interface I${componentName}Props extends I${componentName}DispatchProps, I${componentName}StoreProps,
  I${componentName}OwnProps, WithStyles<typeof ${this.deCapitalizeFirstLetter(componentName)}Style> {
}
`);
  }

  protected generateComponentAsStr(componentName: string): string {
    return (
`import * as React from "react";
import {Component} from "react";

import {withConnection, withStyle} from "@Annotate";
import {_storeState_} from "@Redux";

import {I${componentName}DispatchProps, I${componentName}Props, I${componentName}StoreProps} from "./${componentName}.StateProps";
import {${this.deCapitalizeFirstLetter(componentName)}Style} from "./${componentName}.Style";

@withConnection<I${componentName}StoreProps, I${componentName}DispatchProps, I${componentName}Props>(
  (store: _storeState_) => ({
  }), {
  })
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
