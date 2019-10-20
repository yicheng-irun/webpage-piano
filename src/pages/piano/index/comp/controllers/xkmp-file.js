export function encodeXKMP(dataObj) {
  return `https://www.xiwnn.com/piano/\n钢琴键盘映射文件:\n${JSON.stringify(dataObj)}`;
}

export function decodeXKMP(dataString) {
  let t = null;
  `${dataString}`.replace(/钢琴键盘映射文件:\n(.*)/g, (a, b) => {
    t = b;
  });
  if (t) {
    try {
      const d = JSON.parse(t);
      const result = {};
      Object.keys(d).forEach((i) => {
        const t2 = parseInt(i, 10);
        if (t2) {
          result[t2] = d[i];
        }
      });
      return result;
    } catch (e) {
      throw new Error('文件解析失败，文件格式可能有误');
    }
  }
  throw new Error('文件为空或文件格式有误');
}
