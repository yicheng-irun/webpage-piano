// import runtime from '@/lib/runtime';

// export const keymap = {};
// 画键盘时，对应位置
export const keyPositonArray = new Array(89);
keyPositonArray[0] = [0, 0];

// 画音符条时的键x坐标和键宽
export const barPositionArray = new Array(89);
barPositionArray[0] = [0, 0];

// 键名列表 1A2  2#A2
export const keyNameList = new Array(89);

// 白键和黑键列表
export const baiKeyArray = [];
export const heiKeyArray = []; // 音轨录制区的引用了

export const baiKeyWidth = 40;
// eslint-disable-next-line no-bitwise
export const hafBaiKeyWidth = baiKeyWidth >> 1;
export const hafHeiKeyWidth = 13;
export const heiKeyWidth = hafHeiKeyWidth * 2;
const bheight = 75;
const keyHeight = 200;

let heip = '';
let baip = '';

const pstOffset = [0, 2, 0, 0, -2, 0, 2, 0, 0, -2, 0, 0];
const demo12 = [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0];
const code12 = ['A', '', 'B', 'C', '', 'D', '', 'E', 'F', '', 'G', ''];
for (let j = 0, bcount = 0; j < 88; j += 1) {
  const i = j + 1;
  const yu = j % 12;
  let sbpnum = '';
  if (i <= 15) {
    sbpnum = String(Math.floor((-i + 27) / 12));
  } else if (i >= 40) {
    sbpnum = String(Math.floor((i - 28) / 12));
  }

  if (demo12[yu] === 1) {
    // 白键盘
    const sbp = `<sub>${sbpnum}</sub>`; // 用来做sub和sup的

    const ycode = code12[yu];
    const ucode = i < 28 ? ycode : ycode.toLowerCase();

    baip += `<div data-key='${i}'><span>${i}</span><div>${ucode}${sbp}</div></div>`;

    keyNameList[i] = `${ucode}${sbpnum}`;

    keyPositonArray[i] = [baiKeyWidth * bcount, baiKeyWidth];

    baiKeyArray.push(i);
    heiKeyArray.push(0);

    bcount += 1;
  } else {
    const ycode = code12[yu - 1];
    const ucode = i < 28 ? ycode : ycode.toLowerCase();

    const hj = heiKeyArray.length - 1;
    heip += `<div data-key='${i}' style="left:${baiKeyWidth * hj
      + pstOffset[yu]}px;"><span>${i}</span></div>`;

    keyNameList[i] = `#${ucode}${sbpnum}`;

    keyPositonArray[i] = [
      baiKeyWidth * hj + baiKeyWidth - hafHeiKeyWidth + pstOffset[yu],
      heiKeyWidth,
    ];

    heiKeyArray[heiKeyArray.length - 1] = i;
  }
}

for (let i = 1; i < 89; i += 1) {
  const kpitem = keyPositonArray[i];
  if (kpitem[1] === heiKeyWidth) {
    // 如果是黑键
    barPositionArray[i] = [kpitem[0], kpitem[1]];
  } else {
    const leftkey = keyPositonArray[i - 1];
    const lefPst = leftkey[0] + leftkey[1];
    let ritPst = 0;
    if (i === 88) {
      ritPst = kpitem[0] + kpitem[1];
    } else {
      [ritPst] = keyPositonArray[i + 1];
    }
    const cent = (lefPst + ritPst) / 2;
    let w = ritPst - lefPst;
    if (w < heiKeyWidth - 4) { (w = heiKeyWidth - 4); }
    barPositionArray[i] = [cent - w / 2, w];
  }
}


// console.log(baiKeyArray, heiKeyArray);

export const blackDom = heip;
export const whiteDom = baip;

/**
 * 通过坐标获取当前是按的哪个key
 * @param {Number} x
 * @param {Number} y
 */
export function getKey(x, y) {
  const xw = x / baiKeyWidth;
  const xi = Math.floor(xw);
  if (y < -keyHeight) {
    return undefined;
  }
  if (-y < bheight) {
    // 纯白键
    return baiKeyArray[xi];
  }
  const yu = x - xi * baiKeyWidth;

  if (yu <= hafHeiKeyWidth) {
    const k = heiKeyArray[xi - 1];
    if (k) {
      return k;
    }
  } else if (yu >= baiKeyWidth - hafHeiKeyWidth) {
    const k = heiKeyArray[xi];
    if (k) {
      return k;
    }
  }
  return baiKeyArray[xi];
}
