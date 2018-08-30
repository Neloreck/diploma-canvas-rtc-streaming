// https://jestjs.io/docs/en/api -> Jest.
// https://airbnb.io/enzyme/docs/api/ -> Shallow. Rendering of react etc.

import DotEnv from 'dotenv';
import path from 'path';
import enzyme from 'enzyme';
import toJSON from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

DotEnv.config({path: path.resolve(__dirname, '../build/.env')});
enzyme.configure({adapter: new Adapter()});

export {forSeconds, forExpectedConditions, forMethodToBeCalled} from './jest.utility';

export const render = enzyme.render;
export const shallow = enzyme.shallow;
export const toJson = toJSON;
