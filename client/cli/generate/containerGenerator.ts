import * as fs from "fs";
import * as path from "path";

exports.generate = function (componentPath: string, componentName: string) {
  const componentFolder: string = path.resolve(componentPath, componentName);

  const styleFile: string = path.resolve(componentFolder, `${componentName}.Style.ts`);
  const propFile: string = path.resolve(componentFolder, `${componentName}.StateProps.ts`);
  const componentFile: string = path.resolve(componentFolder, `${componentName}.Component.tsx`);
  const indexFile: string = path.resolve(componentFolder, 'index.ts');

  if (!fs.existsSync(componentPath)) {
      fs.mkdirSync(componentPath);
  }

  fs.mkdirSync(componentFolder);

  fs.writeFileSync(styleFile, fillStyle(componentName));
  fs.writeFileSync(propFile, fillProp(componentName));
  fs.writeFileSync(componentFile, fillComponent(componentName));
  fs.writeFileSync(indexFile, fillIndexTemplate(componentName));
};

function fillStyle(componentName: string): string {
  return (
`import {createStyles} from "@material-ui/core/styles";

export const ${deCapitalizeFirstLetter(componentName)}Style = createStyles({
  root: {
    height: "100%",
    width: "100%"
  }
});
`);
}

function fillProp(componentName: string): string {
  return (
`import {WithStyles} from "@material-ui/core";
import {${deCapitalizeFirstLetter(componentName)}Style} from "./${componentName}.Style";

export interface I${componentName}StoreProps {
}

export interface I${componentName}DispatchProps {
}

export interface I${componentName}OwnProps {
}

export interface I${componentName}Props extends I${componentName}DispatchProps, I${componentName}StoreProps,
  I${componentName}OwnProps, WithStyles<typeof ${deCapitalizeFirstLetter(componentName)}Style> {
}
`);
}

function fillComponent(componentName: string): string {
  return (
`import * as React from "react";
import {Component} from "react";

import {withConnection, withStyle} from "@Annotate";
import {_storeState_} from "@Redux";

import {I${componentName}DispatchProps, I${componentName}OwnProps, I${componentName}Props, I${componentName}StoreProps} from "./${componentName}.StateProps";
import {${deCapitalizeFirstLetter(componentName)}Style} from "./${componentName}.Style";

@withConnection<I${componentName}StoreProps, I${componentName}DispatchProps, I${componentName}OwnProps>(
  (store: _storeState_) => ({
  }), {
  })
@withStyle(${deCapitalizeFirstLetter(componentName)}Style)
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

function fillIndexTemplate(componentName: string): string {
  return (
`export {${componentName}} from "./${componentName}.Component";
export {I${componentName}Props} from "./${componentName}.StateProps";
`);
}

function deCapitalizeFirstLetter(string: string): string {
  return string.charAt(0).toLowerCase() + string.slice(1);
}