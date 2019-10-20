// import AudioPlayer from './player-audio';
import AudioPlayer from './player-audiocontext';
import { MIDI } from './midi';

export function setPlayer(instrument) {
  const player = new AudioPlayer(instrument);
  MIDI.players[instrument] = player;
  MIDI.defaultPlayer = player;
}
export default {};
