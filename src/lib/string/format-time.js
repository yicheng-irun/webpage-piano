
function t0 (n = 0) {
    return n < 10 ? `0${n}` : `${n}`;
}

function getYearDate (date) {
    const y = date.getFullYear();
    const M = date.getMonth() + 1;
    const d = date.getDate();
    return `${y}-${t0(M)}-${t0(d)}`;
}

function getDate (date) {
    const M = date.getMonth() + 1;
    const d = date.getDate();
    return `${t0(M)}-${t0(d)}`;
}

function getTime (date) {
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    return `${t0(h)}:${t0(m)}:${t0(s)}`;
}

export default function (time) {
    const date = new Date(time);
    return `${getYearDate(date)} ${getTime(date)}`;
}

export function howLong (time) {
    const date = new Date(time);
    const now = new Date();

    const distanc = now - date;
    if (distanc > 0) {
        if (distanc < 1000 * 60 * 3) { // 3分钟内
            return '刚刚';
        }
        if (distanc < 1000 * 60 * 60) {
            return `${Math.floor(distanc / (1000 * 60))}分钟前`;
        }
        if (distanc < 1000 * 60 * 60 * 24) {
            return `${Math.floor(distanc / (1000 * 60 * 60))}小时前`;
        }
        if (distanc < 1000 * 60 * 60 * 24 * 7) {
            return `${Math.floor(distanc / (1000 * 60 * 60 * 24))}天前`;
        }
        if (date.getFullYear() == now.getFullYear()) {
            return `${getDate(date)} ${getTime(date)}`;
        }
    }
    return `${getYearDate(date)} ${getTime(date)}`;
}