import {Action} from "redux";

export function createReflectiveReducer <State>(Reducer: { new(): any }, defaultState: State,
                                                options: IReducerOptions = defaults) {

  const instance = Object.create(Reducer.prototype);
  const reducers = getReducerMethods(Reducer)(instance);

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

const getReducerMethods = <State>(Reducer: { new(): any }) => {
  const prototype = Reducer.prototype;
  const methods = Object.getOwnPropertyNames(prototype);

  const getWithRequiredAction = (method: string) => {
    const meta = Reflect.getMetadata("design:paramtypes", prototype, method);
    const action = meta && meta[1];

    return action ? prototype.type : undefined;
  };

  return (instance: any): IMethods<State> => {
    return methods
      .filter(getWithRequiredAction)
      .map((method: string) => ({ [getWithRequiredAction(method)]: instance[method] }))
      .filter((item) => {
        return item;
      })
      .reduce((acc: object, current: object) => ({...acc, ...current}), {});
  };
};

export interface IReducerOptions {
  freeze: boolean;
}

interface IMethods<State> { [key: string]: (state: State, payload: any) => State; }

const defaults: IReducerOptions = {
  freeze: false,
};
