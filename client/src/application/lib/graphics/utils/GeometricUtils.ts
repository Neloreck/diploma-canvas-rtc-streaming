import {IPoint} from "../types";

export class GeometricUtils {

  public static checkPointInTriangle(pt: IPoint, p1: IPoint, p2: IPoint, p3: IPoint): boolean {

    const b1 = GeometricUtils.checkTrianglesSign(pt, p1, p2);
    const b2 = GeometricUtils.checkTrianglesSign(pt, p2, p3);
    const b3 = GeometricUtils.checkTrianglesSign(pt, p3, p1);

    return ((b1 === b2) && (b2 === b3));
  }

  public static checkTrianglesSign(p1: IPoint, p2: IPoint, p3: IPoint): boolean {
    return ((p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y)) < 0;
  }

}
