export const ActionHandler = <T>(instance: T, method: string, descriptor: PropertyDescriptor) => {
  const meta = Reflect.getMetadata("design:paramtypes", instance, method);
};
