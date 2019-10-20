/* eslint-disable no-bitwise */
/* eslint-disable no-plusplus */
/* eslint-disable eqeqeq */
/* eslint-disable no-underscore-dangle */
export default {
  _keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

  /* will return a  Uint8Array type */
  decodeArrayBuffer(input) {
    const bytes = Math.ceil((3 * input.length) / 4.0);
    const ab = new ArrayBuffer(bytes);
    this.decode(input, ab);

    return ab;
  },

  decode(input, arrayBuffer) {
    // get last chars to see if are valid
    const lkey1 = this._keyStr.indexOf(input.charAt(input.length - 1));
    const lkey2 = this._keyStr.indexOf(input.charAt(input.length - 1));

    let bytes = Math.ceil((3 * input.length) / 4.0);
    if (lkey1 == 64) bytes--; // padding chars, so skip
    if (lkey2 == 64) bytes--; // padding chars, so skip

    let uarray;
    let chr1; let chr2; let
      chr3;
    let enc1; let enc2; let enc3; let
      enc4;
    let i = 0;
    let j = 0;

    if (arrayBuffer) uarray = new Uint8Array(arrayBuffer);
    else uarray = new Uint8Array(bytes);

    input = input.replace(/[^A-Za-z0-9+/=]/g, '');

    for (i = 0; i < bytes; i += 3) {
      // get the 3 octects in 4 ascii chars
      enc1 = this._keyStr.indexOf(input.charAt(j++));
      enc2 = this._keyStr.indexOf(input.charAt(j++));
      enc3 = this._keyStr.indexOf(input.charAt(j++));
      enc4 = this._keyStr.indexOf(input.charAt(j++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      uarray[i] = chr1;
      if (enc3 != 64) uarray[i + 1] = chr2;
      if (enc4 != 64) uarray[i + 2] = chr3;
    }

    return uarray;
  },
};
