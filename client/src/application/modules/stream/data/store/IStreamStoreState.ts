import {GraphicsState} from "@Module/stream/data/store/graphics";
import {SourceState} from "@Module/stream/data/store/source";

export interface IStreamStoreState {

  source: SourceState;
  graphics: GraphicsState;

}
