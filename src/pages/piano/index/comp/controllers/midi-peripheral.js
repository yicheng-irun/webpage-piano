/**
 * midi 外设
 */
import { keypress } from '../piano-control';
import runtime from '../../../../../lib/runtime';

/**
 * 判断是否支持
 */
export function isSupport() {
  if (runtime.isServer) {
    return false;
  }
  if (navigator.requestMIDIAccess) {
    return true;
  }
  return false;
}

function onMIDIMessage(msg) {
  // console.log(msg.data);
  if (msg.data[0] === 144) {
    const idx = msg.data[1];
    const size = msg.data[2];
    if (size > 0) {
      keypress.down([idx - 20], false, 3);
    } else {
      keypress.up([idx - 20], 3);
    }
  }
}

class MidiParser {
  constructor(midiAccess) {
    this.midiAccess = midiAccess;
    this.enable = true;
    const { inputs } = midiAccess;
    const values = inputs.values();
    this.inputs = [];
    this.setMidiInputs(values);
  }

  setMidiInputs(inputs) {
    // each time there is a midi message call the onMIDIMessage function
    for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
      input.value.onmidimessage = (msg) => {
        this.midiMessage(msg);
      };
      this.inputs.push(input.value);
    }
  }

  midiMessage(msg) {
    if (this.enable) {
      onMIDIMessage(msg);
    }
  }

  destory() {
    this.enable = false;
    this.inputs.forEach((item) => {
      item.onmidimessage = null;
    });
  }
}

let midiParser = null;

export function getMidiParse() {
  return midiParser;
}

/**
 * 连接
 */
export function connect() {
  return new Promise((resolve, reject) => {
    navigator.requestMIDIAccess().then(
      (midi) => {
        if (midiParser) {
          midiParser.destory();
        }
        midiParser = new MidiParser(midi);
        resolve();
      },
      () => {
        // console.error('No access to your midi devices.', arg);
        reject(new Error('No access to your midi devices.'));
      },
    );
  });
}

/**
 * 断开连接
 */
export function disConnect() {
  if (midiParser) {
    midiParser.destory();
  }
  midiParser = null;
}
