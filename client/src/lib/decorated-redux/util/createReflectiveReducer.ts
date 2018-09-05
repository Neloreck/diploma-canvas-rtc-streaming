import {Action} from "redux";
import {IReducerOptions} from "../";

export function createReflectiveReducer <Reducer, State>(instance: Reducer, defaultState: State,
                                                         options: IReducerOptions) {

  const reducers = getReducerMethods(instance)(instance);

  return (prevState: State = defaultState, action: Action): State => {

    if (options.freeze) {
      Object.freeze(prevState);
    }

    const fn = reducers[action.type];
    const exists = fn && typeof fn === "function";
    const reducer = exists ?
      (...args: Array<any>): State => fn.apply(instance, args) : undefined;
    const nextState = reducer ? reducer(prevState, action) : prevState;

    return nextState;
  };
}

const getReducerMethods = <Reducer, State>(reducerInstance: Reducer) => {
  const prototype = Object.getPrototypeOf(reducerInstance);
  const methods = Object.getOwnPropertyNames(prototype);

  const getWithRequiredAction = (method: string) => {
    const meta = Reflect.getMetadata("design:paramtypes", prototype, method);
    const action = meta && meta[1];
    return action ? action.prototype.type : undefined;
  };

  return (instance: any): IMethods<State> => {
    return methods
      .filter(getWithRequiredAction)
      .map((method: string) => ({ [getWithRequiredAction(method)]: instance[method] }))
      .filter((item) => item)
      .reduce((acc: object, current: object) => ({...acc, ...current}), {});
  };
};

interface IMethods<State> { [key: string]: (state: State, payload: any) => State; }
