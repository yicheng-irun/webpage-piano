// const decode = require('./decode');
// const encode = require('./encode');

import decode from './decode';
import encode from './encode';

export default {
    decode,
    encode,
    parse: decode,
    stringify: encode,
}
