import getUA from '../../lib/tools/get-ua';

export function isIE() {
  const ua = getUA();
  if (/MSIE 8\.0/.test(ua)) {
    return true;
  }
  if (/MSIE 9\.0/.test(ua)) {
    return true;
  }
  if (/MSIE 10\.0/.test(ua)) {
    return true;
  }
  if (/rv:11\.0/.test(ua) && /\(Windows NT/.test(ua)) {
    return true;
  }
  return false;
}

export function isChorme() {

}

export function isAndroid() {

}
