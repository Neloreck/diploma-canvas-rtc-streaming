import {ISerializedGraphicsObject, TObjectPosition} from "../../types";

export abstract class AbstractCanvasGraphicsSerializableObject {

  public abstract configuration: any;
  protected abstract position: TObjectPosition | never;

  // Getters <-> Setters.

  public setPosition(position: TObjectPosition) {
    this.position = position;
  }

  public getPosition(): TObjectPosition {
    return this.position;
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
