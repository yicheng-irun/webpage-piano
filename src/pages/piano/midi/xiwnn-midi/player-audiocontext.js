import Base64Binary from './Base64binary';
import { MIDI, key2noteList } from './midi';

export default class Player {
  constructor(instrument) {
    this.instrument = instrument;
    this.sources = new Array(89).fill(false);
    this.buffers = new Array(89).fill(false);
    this.sourceBufferInited = false;
    this.prepareState = 0; // 0: 未准备 1: 准备中  2: 准备完成
  }

  async prepare() {
    if (this.prepareState !== 0) {
      return;
    }
    this.prepareState = 1;
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    try {
      await this.initSoureBuffer();
      this.prepareState = 2;
    } catch (e) {
      this.prepareState = 0;
      console.error(e);
    }
  }

  async initSoureBuffer() {
    const soundfont = MIDI.Soundfont[this.instrument];
    if (!soundfont) {
      throw new Error(`it's not exists soundfound of named ${this.instrument}`);
    }
    const { ctx } = this;
    const promises = [];
    for (let i = 1; i < 89; i += 1) {
      promises.push(
        (() => {
          const name = key2noteList[i];
          const src = soundfont[name];
          return new Promise((resolve, reject) => {
            if (src) {
              const base64 = src.split(',')[1];
              const avbuffer = Base64Binary.decodeArrayBuffer(base64);
              new Promise((res, rej) => {
                ctx.decodeAudioData(avbuffer, res, rej);
              })
                .then((buffer) => {
                  this.buffers[i] = buffer;
                  resolve();
                })
                .catch(reject);
            }
          });
        })(),
      );
    }
    await Promise.all(promises);
    this.sourceBufferInited = true;
  }

  // velocity
  noteOn(id) {
    if (this.buffers[id]) {
      if (this.sources[id]) {
        this.noteOff(id);
      }
      const buffer = this.buffers[id];
      const source = this.ctx.createBufferSource();
      source.buffer = buffer;

      const gainNode = this.ctx.createGain();
      gainNode.connect(this.ctx.destination);
      gainNode.gain.value = 0;
      source.connect(gainNode);
      source.start();
      // 这里调大音量
      gainNode.gain.linearRampToValueAtTime(3, this.ctx.currentTime + 0.01);
      this.sources[id] = {
        source,
        gainNode,
      };
    } else {
      this.prepare();
    }
  }

  noteOff(id) {
    if (this.sources[id]) {
      const { source, gainNode } = this.sources[id];
      const { gain } = gainNode;
      // console.log(gain.value);
      gain.linearRampToValueAtTime(gain.value, this.ctx.currentTime);
      gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.3);
      setTimeout(() => {
        source.disconnect();
      }, 400);
      this.sources[id] = null;
    }
  }

  stopAllNotes() {}
}
