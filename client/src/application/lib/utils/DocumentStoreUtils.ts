import CookieManager, {CookieOptions} from "browser-cookies";

export class DocumentStoreUtils {

  public static setCookie(name: string, value: string, options?: CookieOptions): void {
    CookieManager.set(name, value, options);
  }

  public static getCookie(name: string): string | null {
    return CookieManager.get(name);
  }

  public static eraseCookie(name: string): void {
    return CookieManager.erase(name);
  }

  public static getCookies(): { [idx: string]: any } {
    return CookieManager.all();
  }

  public static cleanCookies(): void {
    for (const item in DocumentStoreUtils.getCookies()) {

      if (item) {
        CookieManager.erase(item);
      }

    }
  }

}
