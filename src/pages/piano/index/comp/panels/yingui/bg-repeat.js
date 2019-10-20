import { heiKeyArray } from '../../keyboard';

let barRepeatImg = '';
export default function getRepeatImg() {
  if (barRepeatImg) {
    return barRepeatImg;
  }

  const margin = 1;
  const keyHeight = 8;

  const height = (keyHeight + 1) * 88 + 1 + margin * 2;

  // const canvas = document.getElementById('yg-canvas');
  const canvas = document.createElement('canvas');
  canvas.height = height;
  canvas.width = 1;

  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#aaa';
  ctx.fillRect(0, 0, 1, height);

  let y = margin + 1;
  heiKeyArray.forEach((element) => {
    ctx.fillStyle = '#ddd';
    ctx.fillRect(0, height - y, 1, -keyHeight);
    y += keyHeight + 1;
    if (element > 0) {
      ctx.fillStyle = '#bbb';
      ctx.fillRect(0, height - y, 1, -keyHeight);
      y += keyHeight + 1;
    }
  });

  barRepeatImg = canvas.toDataURL('png');
  return barRepeatImg;
}
