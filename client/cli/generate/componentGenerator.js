const fs = require('fs');
const path = require('path');

exports.generate = function (componentPath, componentName) {
    const componentFolder = path.resolve(componentPath, componentName);

    const styleFile = path.resolve(componentFolder, `${componentName}.Style.ts`);
    const propFile = path.resolve(componentFolder, `${componentName}.StateProps.ts`);
    const componentFile = path.resolve(componentFolder, `${componentName}.Component.tsx`);
    const indexFile = path.resolve(componentFolder, 'index.ts');

    fs.mkdirSync(componentFolder);

    fs.writeFileSync(styleFile, fillStyle(componentName));
    fs.writeFileSync(propFile, fillProp(componentName));
    fs.writeFileSync(componentFile, fillComponent(componentName));
    fs.writeFileSync(indexFile, fillIndexTemplate(componentName));
};

function fillStyle(componentName) {
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

function fillProp(componentName) {
    return (
        `import {WithStyles} from "@material-ui/core";
import {${deCapitalizeFirstLetter(componentName)}Style} from "./${componentName}.Style";

export interface I${componentName}OwnProps {
}

export interface I${componentName}Props extends I${componentName}OwnProps,
 WithStyles<typeof ${deCapitalizeFirstLetter(componentName)}Style> {
}
`);
}

function fillComponent(componentName) {
    return (
        `import * as React from "react";
import {Component} from "react";

import {withStyle} from "@Annotate";

import {I${componentName}Props} from "./${componentName}.StateProps";
import {${deCapitalizeFirstLetter(componentName)}Style} from "./${componentName}.Style";

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

function fillIndexTemplate(componentName) {
    return (
        `export {${componentName}} from "./${componentName}.Component";
export {I${componentName}Props} from "./${componentName}.StateProps";
`);
}

function deCapitalizeFirstLetter(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}