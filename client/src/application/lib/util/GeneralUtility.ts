import {cloneDeep} from "lodash";

export class GeneralUtility {

  public static copyInstance<T extends object>(object: T): T {
    return Object.assign(Object.create(Object.getPrototypeOf(object)), cloneDeep(object));
  }

}
