import {ISerializedGraphicsObject, TObjectPosition} from "../../types";

export abstract class AbstractCanvasGraphicsSerializableObject<T extends {}> {

  public abstract configuration: T;
  protected abstract position: TObjectPosition | never;

  // Getters <-> Setters.

  public setPosition(position: TObjectPosition) {
    this.position = position;
  }

  public getPosition(): TObjectPosition {
    return this.position;
  }

  public applyConfiguration(src: T | AbstractCanvasGraphicsSerializableObject<T>): void {
    if (src instanceof AbstractCanvasGraphicsSerializableObject) {
      this.configuration = Object.assign({}, this.configuration, src.configuration);
    } else {
      this.configuration = Object.assign({}, this.configuration, src as T);
    }
  }

  // Interaction.

  public serialize(): ISerializedGraphicsObject {
    return {
      class: this.constructor.name,
      configuration: this.configuration,
      position: this.position
    };
  }

  public applySerialized(serialized: ISerializedGraphicsObject): void {
    this.configuration = serialized.configuration;
    this.position = serialized.position;
  }

}
