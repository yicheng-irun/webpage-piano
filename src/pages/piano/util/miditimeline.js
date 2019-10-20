/* eslint-disable no-restricted-syntax */
/* eslint-disable no-continue */
export default class MidiTimeLine {
  constructor() {
    this.timeline = [];
    this.reset();
  }

  reset() {
    this.timeline = new Array(99);
    for (let i = 0; i < this.timeline.length; i += 1) {
      this.timeline[i] = [];
    }
  }

  recordKeyDown(keys) {
    for (const i of keys) {
      const arr = this.timeline[i];
      const last = arr[arr.length - 1];
      if (last && last[1] === 1) {
        continue;
      }
      arr.push([Date.now(), 1]); // 时间，力度
    }
  }

  recordKeyUp(keys) {
    for (const i of keys) {
      const arr = this.timeline[i];
      const last = arr[arr.length - 1];
      if (last && last[1] === 0) {
        continue;
      }
      // 力度 -1 表示是音的结束
      arr.push([Date.now(), 0]); // [时间，力度]
    }
  }

  // 从保存的文件中加载
  // eslint-disable-next-line class-methods-use-this
  load() {}

  // 保存成结构化数据
  // eslint-disable-next-line class-methods-use-this
  save() {}
}
