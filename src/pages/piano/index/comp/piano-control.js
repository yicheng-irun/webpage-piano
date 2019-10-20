import KeyPress from '../../util/keypress';
import MidiTimeLine from '../../util/miditimeline';
import { noteOn, noteOff } from '../../midi/xiwnn-midi';

export const keypress = new KeyPress();

export const miditimeline = new MidiTimeLine();

keypress.onDown((keys) => {
  miditimeline.recordKeyDown(keys);
  noteOn(keys);
});

keypress.onUp((keys) => {
  miditimeline.recordKeyUp(keys);
  noteOff(keys);
});
