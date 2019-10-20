export const MIDI = {
  Soundfont: {},
  players: {},
  defaultPlayer: null,
};

// export const noteIDmap = {};
export const key2noteList = new Array(89);

const keyNameList = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
for (let i = 1, c = 0; i < 89; i += 1) {
  const n = (i + 12 - 4) % 12;
  if (n === 0) {
    c += 1;
  }
  const name = `${keyNameList[n]}${c}`;
  // noteIDmap[name] = i;
  key2noteList[i] = name;
}
