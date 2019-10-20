import runtime from '@/lib/runtime';

export const comps = {
  piano: null,
  noteBar: null,
  keyboard: null,
  settingsPanel: null,
};

const keyboardWidth = 2081;
const keyboardHeight = 200;
const keyboardBtmHeight = 15;

export const size = {
  clientWidth: 300,
  scale: 1,
  leftOst: 0,
  leftScale: 0, // 剩下的scale
};

export function resize() {
  const {
    piano, noteBar, keyboard, settingsPanel,
  } = comps;
  if (piano && piano.$refs && piano.$refs.piano) {
    const { clientWidth, clientHeight } = piano.$refs.piano;
    const s = clientWidth / keyboardWidth;
    size.clientWidth = clientWidth;

    // s < 1 ? s = 1 : 0;

    const { cacheConf } = piano.$store.state;
    const userScale = cacheConf.scale;
    const userLeft = cacheConf.left;

    const changeScale = (userScale + 11) / 12;
    cacheConf.barScale = 1 / changeScale;
    size.leftScale = 1 - cacheConf.barScale;

    const scale = changeScale * s;
    size.scale = scale;

    const keyLeftOffset = size.leftScale * userLeft * keyboardWidth;

    if (keyboard) {
      keyboard.setSize(scale, keyLeftOffset);
    }

    const noteBarHeight = clientHeight - keyboardHeight * scale - keyboardBtmHeight;
    if (noteBar) {
      noteBar.setSize(clientWidth, noteBarHeight, scale, keyLeftOffset);
    }
    if (settingsPanel) {
      settingsPanel.setSize(clientWidth, noteBarHeight, scale);
    }
  }
}

if (runtime.isClient) {
  window.addEventListener('resize', resize);
}

export function setNoteBar(nb) {
  comps.noteBar = nb;
  resize();
}

export function setPiano(pn) {
  comps.piano = pn;
  resize();
}

export function setKeyBoard(kbd) {
  comps.keyboard = kbd;
  resize();
}

export function setMainPanel(comp) {
  comps.settingsPanel = comp;
  resize();
}
