import * as fs from "fs";
import * as path from "path";

import {AbstractGenerator} from "./AbstractGenerator";

export abstract class AbstractComponentGenerator extends AbstractGenerator {

  public generate(componentPath: string, componentName: string): void {
    const componentFolder: string = path.resolve(componentPath, componentName);

    const styleFile: string = path.resolve(componentFolder, `${componentName}.Style.ts`);
    const propFile: string = path.resolve(componentFolder, `${componentName}.StateProps.ts`);
    const componentFile: string = path.resolve(componentFolder, `${componentName}.Component.tsx`);
    const indexFile: string = path.resolve(componentFolder, "index.ts");

    if (!fs.existsSync(componentPath)) {
      fs.mkdirSync(componentPath);
    }

    fs.mkdirSync(componentFolder);

    fs.writeFileSync(styleFile, this.generateStyleAsStr(componentName));
    fs.writeFileSync(propFile, this.generatePropAsStr(componentName));
    fs.writeFileSync(componentFile, this.generateComponentAsStr(componentName));
    fs.writeFileSync(indexFile, this.generateIndexTemplateAsStr(componentName));
  }

  protected abstract generateStyleAsStr(fileName: string): string;

  protected abstract generatePropAsStr(fileName: string): string;

  protected abstract generateComponentAsStr(fileName: string): string;

  protected abstract generateIndexTemplateAsStr(fileName: string): string;

}
