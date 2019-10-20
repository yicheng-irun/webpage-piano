/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/**
 * 键盘按压模型
 */

export default class KeyPress {
  constructor(options = {}) {
    this.pressList = new Array(89).fill(0);
    this.tempPressList = new Array(89).fill(0);
    this.on_down_cb_list = [];
    this.on_up_cb_list = [];
    if (options.onDown) {
      this.onDown(options.onDown);
    }
    if (options.onUp) {
      this.onUp(options.onUp);
    }
  }

  /**
   * @param {Array} keys
   * @param {*} autoUp 按下时把其它未按下的键松开
   * @param {Number} by 由谁触发的  1 键盘  3 MIDI键盘
   */
  down(keys = [], autoUp = true, by = 0) {
    const { pressList, tempPressList } = this;
    const newDown = [];
    const newUp = [];
    if (autoUp) {
      tempPressList.fill(0);
      for (const i of keys) {
        if (i > 0 && i < 89) {
          tempPressList[i] = 1;
        }
      }
      for (let i = 1; i < 89; i += 1) {
        if (tempPressList[i]) {
          if (pressList[i] === 0) {
            pressList[i] = 1;
            newDown.push(i);
          }
        } else if (pressList[i] === 1) {
          pressList[i] = 0;
          newUp.push(i);
        }
      }
    } else {
      for (const i of keys) {
        if (i > 0 && i < 89) {
          if (pressList[i] === 0) {
            newDown.push(i);
            pressList[i] = 1;
          }
        }
      }
    }
    if (newUp.length) {
      this._do_up(newUp, by);
    }
    if (newDown.length) {
      this._do_down(newDown, by);
    }
  }

  up(keys = [], by = 0) {
    const { pressList } = this;
    const newUp = [];
    for (const i of keys) {
      if (i > 0 && i < 89) {
        if (pressList[i] === 1) {
          newUp.push(i);
          pressList[i] = 0;
        }
      }
    }
    if (newUp.length) {
      this._do_up(newUp, by);
    }
  }

  upAll(by = 0) {
    const { pressList } = this;
    const newUp = [];
    for (let i = 1; i < 89; i += 1) {
      if (pressList[i] === 1) {
        pressList[i] = 0;
        newUp.push(i);
      }
    }
    if (newUp.length) {
      this._do_up(newUp, by);
    }
  }

  _do_down(keys = [], by) {
    for (const cb of this.on_down_cb_list) {
      try {
        cb(keys, by);
      } catch (e) {
        // console.error(e);
      }
    }
  }

  _do_up(keys = [], by) {
    for (const cb of this.on_up_cb_list) {
      try {
        cb(keys, by);
      } catch (e) {
        // console.error(e);
      }
    }
  }

  onDown(callback) {
    if (typeof callback !== 'function') {
      throw new Error('callback is not a function');
    }
    if (this.on_down_cb_list.indexOf(callback) < 0) {
      this.on_down_cb_list.push(callback);
    }
  }

  onUp(callback) {
    if (typeof callback !== 'function') {
      throw new Error('callback is not a function');
    }
    if (this.on_up_cb_list.indexOf(callback) < 0) {
      this.on_up_cb_list.push(callback);
    }
  }

  offDown(callback) {
    const index = this.on_down_cb_list.indexOf(callback);
    if (index >= 0) {
      this.on_down_cb_list.splice(index, 1);
    }
  }

  offUp(callback) {
    const index = this.on_up_cb_list.indexOf(callback);
    if (index >= 0) {
      this.on_up_cb_list.splice(index, 1);
    }
  }
}
