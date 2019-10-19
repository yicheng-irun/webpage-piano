import runtime from '../runtime';

export default function () {
    if (runtime.isServer) {
        return runtime.action.req.headers['user-agent'];
    }
    return window.navigator.userAgent;
}
