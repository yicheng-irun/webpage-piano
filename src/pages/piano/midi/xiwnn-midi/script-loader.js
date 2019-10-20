import axios from 'axios';
import { getSuportMP3orOGG } from './detect';
import { MIDI } from './midi';
import { setPlayer } from './player';

function loadJS(data) {
  window.MIDI = MIDI;
  // eslint-disable-next-line no-eval
  window.eval(data);
  delete window.MIDI;
}

export async function loadSoundfont(options) {
  const { soundfontUrl, instrument, onProgress } = options;
  const fileType = getSuportMP3orOGG();

  const url = `${soundfontUrl}/${instrument}-${fileType}.js`;
  const result = await axios.get(url, {
    onDownloadProgress(event) {
      onProgress(fileType, event.loaded);
    },
  });
  loadJS(result.data);
  setPlayer(instrument);
  return 'ok';
}
export default {};
