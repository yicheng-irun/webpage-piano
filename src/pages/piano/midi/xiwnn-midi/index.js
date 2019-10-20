import { MIDI as MIDIOBJ } from './midi';
import { loadSoundfont as loadSoundfontModule } from './script-loader';

export const MIDI = MIDIOBJ;

export const loadSoundfont = loadSoundfontModule;

export function setInstrument() {
  // 设置音色
}

export function tryInitAudioContext() {
  if (MIDIOBJ.defaultPlayer && MIDIOBJ.defaultPlayer.prepare) {
    MIDIOBJ.defaultPlayer.prepare();
  }
}

export function noteOn(keys) {
  if (MIDIOBJ.defaultPlayer) {
    keys.forEach((value) => {
      MIDIOBJ.defaultPlayer.noteOn(value);
    });
  }
}

export function noteOff(keys) {
  if (MIDIOBJ.defaultPlayer) {
    keys.forEach((value) => {
      MIDIOBJ.defaultPlayer.noteOff(value);
    });
  }
}

export function stopAllNotes() {
  if (MIDIOBJ.defaultPlayer) {
    MIDIOBJ.defaultPlayer.stopAllNotes();
  }
}
