// https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Simple_RTCDataChannel_sample

export const status = {
  roomID: '',
  ws: {
    state: 0, // 0 是未初始化  1：连接中  2：已连接  -1 断开
  },
};

function onMessage() {}

/**
 * @type {WebSocket}
 */
let ws;

async function link() {
  if (status.ws.state < 1) {
    ws = new WebSocket('/piano/ws');
    ws.onmessage = (buf) => {
      onMessage(buf);
    };
    status.ws.state = 1;
    return new Promise((resolve, reject) => {
      ws.onopen = () => {
        status.ws.state = 2;
        resolve();
      };
      ws.onerror = () => {};
      ws.onclose = () => {
        reject();
        status.ws.state = -1;
      };
    });
  }
  throw new Error('ws 的 state error');
}

/**
 * 进入房间
 */
export async function joinRoom(id) {
  await link();
  ws.send(`joinRoom
${id}
`);
}

/**
 * 创建房间
 */
export async function createRoom() {
  await link();
  ws.send('createRoom');
}

/**
 * 退出房间
 */
export function exitRoom() {}
