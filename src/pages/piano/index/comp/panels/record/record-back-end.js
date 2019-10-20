/**
 * 录制功能的后台运行代码
 */
const noticeCallbacks = [];

const status = {
  recording: false, // 表示正在录音中
  startTime: 0,
  longTime: 0,
};

let itv = 0;

export function onEvent(cb) {
  if (cb instanceof Function && noticeCallbacks.indexOf(cb) === -1) {
    noticeCallbacks.push(cb);
    cb(status);
  }
}

export function offEvent(cb) {
  const index = noticeCallbacks.indexOf(cb);
  if (index >= 0) {
    noticeCallbacks.splice(index, 1);
  }
}

/**
 * 触发事件
 */
function emit(v = {}) {
  const result = {
    ...status,
    ...v,
  };
  noticeCallbacks.forEach((item) => {
    item(result);
  });
}

export function startRecord() {
  if (status.recording) {
    return;
  }
  status.recording = true;
  status.startTime = Date.now();
  itv = setInterval(() => {
    status.longTime = Date.now() - status.startTime;
    emit();
  }, 500);
  emit();
}

/**
 * 结束录制时，直接从音柱的record池子里边遍历捞出来录音数据，进行清洗和排序
 */
export function stopRecord() {
  if (!status.recording) {
    return;
  }
  status.recording = false;
  clearInterval(itv);
  emit({
    isEnd: true,
  });
}
