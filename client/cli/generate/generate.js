const fs = require('fs');
const path = require('path');

const EGenerationType = {
  CONTAINER: 'container',
  COMPONENT: 'component'
};

const ARGS_OFFSET = 2;

const GENERATION_TYPE = process.argv[ARGS_OFFSET + 0];
const GENERATION_PATH = process.argv[ARGS_OFFSET + 1];
const GENERATION_NAME = process.argv[ARGS_OFFSET + 2];

if (GENERATION_TYPE && GENERATION_PATH && GENERATION_NAME) {

  const targetFolder = path.resolve(process.cwd(), 'src/application/view/',
      GENERATION_TYPE === EGenerationType.CONTAINER ? 'containers' : 'components',
      GENERATION_PATH
  );
  const alreadyExists = fs.existsSync(path.resolve(targetFolder, GENERATION_NAME));

  if (alreadyExists) {
    throw new Error(`Cannot generate component ${GENERATION_NAME}, seems like it already exists inside of ${targetFolder}.`)
  } else {

    let generate = null;

    switch (GENERATION_TYPE) {

      case EGenerationType.CONTAINER:
        generate = require('./containerGenerator').generate;
        break;

      case EGenerationType.COMPONENT:
        generate = require('./componentGenerator').generate;
        break;

      default:
        throw new Error('Unknown type for generation: ' + GENERATION_TYPE);

      }

      generate(targetFolder, GENERATION_NAME);
      console.log(`Generated x-core ${GENERATION_TYPE}. Path: ${targetFolder}. Item: ${GENERATION_NAME}.`);
  }
} else {
  throw new Error('Bad kwargs supplied, you should provide type, path and name for proper generation.');
}

