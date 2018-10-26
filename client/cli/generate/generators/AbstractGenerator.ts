export abstract class AbstractGenerator {

  public abstract generate(componentPath: string, componentName: string): void;

  protected deCapitalizeFirstLetter(target: string): string {
    return target.charAt(0).toLowerCase() + target.slice(1);
  }

  protected capitalizeFirstLetter(target: string): string {
    return target.charAt(0).toUpperCase() + target.slice(1);
  }

}
