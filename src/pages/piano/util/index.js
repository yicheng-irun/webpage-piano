/**
 * 获取元素的offset值
 * @param {Element} element
 */
export function offset(element) {
  let top = element.offsetTop;
  let left = element.offsetLeft;
  let parent = element.offsetParent;
  while (parent != null) {
    top += parent.offsetTop;
    left += parent.offsetLeft;
    parent = parent.offsetParent;
  }
  return {
    left,
    top,
  };
}

export default {};
