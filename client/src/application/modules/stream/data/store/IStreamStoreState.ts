import {GraphicsState} from "@Module/stream/data/store/graphics";
import {InputSourceState} from "@Module/stream/data/store/input_source";

export interface IStreamStoreState {

  inputSource: InputSourceState;
  graphics: GraphicsState;

}
