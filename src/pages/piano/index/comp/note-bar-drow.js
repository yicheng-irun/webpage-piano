import { miditimeline } from './piano-control';
import { barPositionArray } from './keyboard';
import { size } from './size';

const colors = [58, 288, 25, 202, 0, 217, 152, 307, 97, 330, 230, 172];
for (let i = 0; i < 12; i += 1) {
  colors[i] = `hsla(${colors[i]}, 90%, 60%, 0.9)`;
}

export function drow(canvas, scale, keyLeftOffset) {
  const ctx = canvas.getContext('2d');
  const { width, height } = canvas;

  ctx.clearRect(0, 0, width, height);

  if (size.clientWidth > 400) {
    ctx.shadowColor = '#0003';
    ctx.shadowBlur = 6;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  }

  const BAR_TIME_SCALE = 6;

  const theBaseTime = Date.now();

  const { timeline } = miditimeline;
  for (let i = 1; i < timeline.length; i += 1) {
    const line = timeline[i];
    if (line.length) {
      // 加一层判断，少执行一些代码
      const pst = barPositionArray[i];
      let start = theBaseTime;
      ctx.fillStyle = colors[i % colors.length];

      for (let k = line.length - 1; k >= 0; k -= 1) {
        const item = line[k];
        if (item[1] === 1) {
          let barLen = (start - item[0]) / BAR_TIME_SCALE;
          const barStart = (theBaseTime - start) / BAR_TIME_SCALE;
          const sleft = height - barStart;
          if (sleft < 0) {
            start = theBaseTime;
            line.splice(0, k + 2); // 这里其实还可以多删掉两个 减少两层遍历
            break;
          }
          if (sleft < barLen) {
            barLen = sleft;
          }
          ctx.fillRect(
            (pst[0] - keyLeftOffset) * scale,
            height - barStart,
            pst[1] * scale,
            -barLen,
          );
        } else if (item[1] === 0) {
          [start] = item;
        }
      }
    }
  }
}

export function init() {}
