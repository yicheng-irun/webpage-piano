export function getSuportMP3orOGG() {
  const audio = new Audio();
  const mp3 = audio.canPlayType('audio/mpeg');
  const ogg = audio.canPlayType('audio/ogg; codecs="vorbis"');
  if (ogg === 'probably') {
    return 'ogg';
  }
  if (mp3 === 'probably') {
    return 'mp3';
  }
  if (ogg === 'maybe') {
    return 'ogg';
  }
  return 'mp3';
}
export default {};
