type Constructor<T> = new(...args: Array<any>) => T;

export function Single <T extends Constructor<{}>>(targetClass: T): any {

  return class extends targetClass {

    public constructor(...args: Array<any>) {
      const target: { INSTANCE: T } = targetClass as any;

      if (!target.INSTANCE) {
        // @ts-ignore unknown target constructor
        super(...args);

        target.INSTANCE = this as any;

        Object.defineProperty(target.INSTANCE.constructor, "name", {value: targetClass.name});
        Object.defineProperty(this.constructor, "name", {value: targetClass.name});
      }

      return target.INSTANCE;
    }

  };

}
