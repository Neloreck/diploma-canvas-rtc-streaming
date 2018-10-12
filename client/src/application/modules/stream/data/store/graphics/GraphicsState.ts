import {CanvasGraphicsRenderObject} from "@Lib/react_lib/canvas_video_graphics";

import {SimpleCircle, SimpleRectangle} from "@Module/stream/view/canvas_objects";

export class GraphicsState {

  public objects: Array<CanvasGraphicsRenderObject> = [
    new SimpleCircle(5, { x: 50, y: 50 }),
    /*new SimpleCircle(8, { x: 25, y: 50 }),
    new SimpleCircle(4, { x: 88, y: 13 }),
    new SimpleRectangle(10, 25, 25, 15),*/
    new SimpleRectangle(50, 65, 33, 25)
  ];

}
