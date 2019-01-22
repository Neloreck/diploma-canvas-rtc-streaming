export class DocumentUtils {

  public static removeAnyPageTextSelection(): void {
    if (window.getSelection) {
      if (window.getSelection().empty) {  // Chrome
        window.getSelection().empty();
      } else if (window.getSelection().removeAllRanges) {  // Firefox
        window.getSelection().removeAllRanges();
      }
      // @ts-ignore
    } else if (document.selection) {
      // @ts-ignore
      document.selection.empty();
    }
  }

}
