import { MIDI, key2noteList } from './midi';

export default class Player {
  constructor(instrument) {
    this.instrument = instrument;
    this.audios = new Array(89).fill(false);
    const soundfont = MIDI.Soundfont[instrument];
    if (!soundfont) {
      throw new Error(`it's not exists soundfound of named ${instrument}`);
    }
    // console.log(soundfont);
    for (let i = 1; i < 89; i += 1) {
      const name = key2noteList[i];
      const src = soundfont[name];
      if (src) {
        const audio = new Audio();
        audio.autoplay = false;
        audio.loop = false;
        audio.src = src;
        // audio.volume;
        if (i === 40) {
          window.a = audio;
        }
        this.audios[i] = audio;
      }
    }
  }

  // velocity
  noteOn(id) {
    if (this.audios[id]) {
      this.audios[id].currentTime = 0;
      this.audios[id].play();
    }
  }

  noteOff(id) {
    if (this.audios[id]) {
      // this.audios[id].volume = 0;
      // setTimeout(() => {
      // });
      this.audios[id].pause();
    }
  }

  // stopAllNotes() {
  //   //
  // }
}
