export class DomSizingUtils {

  public static recalculateToRatio(width: number, height: number, aspectRatio: number): { width: number, height: number } {

    let childWidth: number = 0;
    let childHeight: number = 0;

    const maxHeight = width / aspectRatio;

    if (maxHeight <= height) {
      childHeight = maxHeight;
      childWidth = width;
    } else {
      childHeight = height;
      childWidth = height * aspectRatio;
    }

    return { width: childWidth, height: childHeight };
  }

}
