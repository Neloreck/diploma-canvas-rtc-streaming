/* tslint:disable: no-console */

import * as fs from "fs";
import * as path from "path";

import {ComponentGenerator} from "./generators/ComponentGenerator";
import {ContainerGenerator} from "./generators/ContainerGenerator";
import {AbstractGenerator} from "./generators/AbstractGenerator";

enum EGenerationType {
  CONTAINER = "container",
  COMPONENT = "component"
}

const ARGS_OFFSET: number = 2;

const GENERATION_TYPE: EGenerationType = process.argv[ARGS_OFFSET + 0] as EGenerationType;
const GENERATION_PATH: string = process.argv[ARGS_OFFSET + 1];
const GENERATION_NAME: string = process.argv[ARGS_OFFSET + 2];

if (GENERATION_TYPE && GENERATION_PATH && GENERATION_NAME) {

  const targetFolder: string = path.resolve(process.cwd(), "src/application/view/",
      GENERATION_TYPE === EGenerationType.CONTAINER ? "containers" : "components",
      GENERATION_PATH
  );

  const alreadyExists: boolean = fs.existsSync(path.resolve(targetFolder, GENERATION_NAME));

  if (alreadyExists) {
    throw new Error(`Cannot generate component ${GENERATION_NAME}, seems like it already exists inside of ${targetFolder}.`);
  } else {

    let generator: AbstractGenerator;

    switch (GENERATION_TYPE) {

      case EGenerationType.CONTAINER:
        generator = new ContainerGenerator();
        break;

      case EGenerationType.COMPONENT:
        generator = new ComponentGenerator();
        break;

      default:
        throw new Error("Unknown type for generation: " + GENERATION_TYPE);

      }

    generator.generate(targetFolder, GENERATION_NAME);
    console.log(`Generated x-core ${GENERATION_TYPE}.\nPath: ${targetFolder}.\nItem: ${GENERATION_NAME}.`);
  }
} else {
  throw new Error("Bad kwargs supplied, you should provide type, path and name for proper generation.");
}
