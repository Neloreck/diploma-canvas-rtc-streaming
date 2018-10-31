import * as path from "path";
import * as fs from "fs";

import {AbstractGenerator} from "./AbstractGenerator";

export class ReducerGenerator extends AbstractGenerator {

  public generate(reducerPath: string, reducerName: string): void {
    const capitalizedReducerName: string = this.capitalizeFirstLetter(reducerName);

    const reducerFolder: string = path.resolve(reducerPath, reducerName);
    const actionsFolder: string = path.resolve(reducerFolder, "./actions");

    const reducerIndexFile: string = path.resolve(reducerFolder, "index.ts");
    const actionsIndexFile: string = path.resolve(actionsFolder, "index.ts");
    const sampleActionFile: string = path.resolve(actionsFolder, `${capitalizedReducerName}SampleAction.ts`);
    const stateFile: string = path.resolve(reducerFolder, `${capitalizedReducerName}State.ts`);
    const reducerFile: string = path.resolve(reducerFolder, `${capitalizedReducerName}Reducer.ts`);

    if (!fs.existsSync(reducerPath)) {
      fs.mkdirSync(reducerPath);
    }

    fs.mkdirSync(reducerFolder);
    fs.mkdirSync(actionsFolder);

    fs.writeFileSync(reducerIndexFile, this.generateReducerIndexTemplateAsStr(reducerFolder, reducerName));
    fs.writeFileSync(actionsIndexFile, this.generateActionsIndexTemplateAsStr(reducerFolder, reducerName));
    fs.writeFileSync(stateFile, this.generateStoreStateTemplateAsStr(reducerFolder, reducerName));
    fs.writeFileSync(reducerFile, this.generateReducerTemplateAsStr(reducerFolder, reducerName));
    fs.writeFileSync(sampleActionFile, this.generateSampleActionTemplateAsStr(reducerFolder, reducerName));
  }

  private generateReducerIndexTemplateAsStr(reducerFolder: string, reducerName: string): string {
    return (
      `export {${this.capitalizeFirstLetter(reducerName)}State} from "./${this.capitalizeFirstLetter(reducerName)}State";
export {${this.capitalizeFirstLetter(reducerName)}Reducer} from "./${this.capitalizeFirstLetter(reducerName)}Reducer";

export * from "./actions";
`);
  }

  private generateActionsIndexTemplateAsStr(reducerFolder: string, reducerName: string): string {
    return (
      `export {${this.capitalizeFirstLetter(reducerName)}SampleAction} from "./${this.capitalizeFirstLetter(reducerName)}SampleAction";
`);
  }


  private generateSampleActionTemplateAsStr(reducerFolder: string, reducerName: string): string {
    return (
      `import {ActionWired, SimpleAction} from "@redux-cbd/core";

@ActionWired("SAMPLE_ACTION")
export class ${this.capitalizeFirstLetter(reducerName)}SampleAction extends SimpleAction {

  public payload: { someData: number } = { someData: 0 };

  public constructor(someData: number) {
    super();

    this.payload.someData = someData;
  }

}
`);
  }

  private generateStoreStateTemplateAsStr(reducerFolder: string, reducerName: string): string {
    return (
      `export class ${this.capitalizeFirstLetter(reducerName)}State {

  public someData: number = 0;

}
`);
  }

  private generateReducerTemplateAsStr(reducerFolder: string, reducerName: string): string {
    return (
      `import {ActionHandler, ReflectiveReducer} from "@redux-cbd/core";

import {${this.capitalizeFirstLetter(reducerName)}SampleAction} from "./actions";
import {${this.capitalizeFirstLetter(reducerName)}State} from "./${this.capitalizeFirstLetter(reducerName)}State";

export class ${this.capitalizeFirstLetter(reducerName)}Reducer extends ReflectiveReducer<${this.capitalizeFirstLetter(reducerName)}State>  {

  @ActionHandler()
  public changeStoredData(state: ${this.capitalizeFirstLetter(reducerName)}State, action: ${this.capitalizeFirstLetter(reducerName)}SampleAction): ${this.capitalizeFirstLetter(reducerName)}State {
    return { ...state, someData: action.payload.someData };
  }

}
`);
  }

}
