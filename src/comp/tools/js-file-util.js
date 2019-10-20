
/**
 * @param {String} content
 * @param {String} fileName
 */
export function saveFile(content, fileName) {
  const downLink = document.createElement('a');
  downLink.download = fileName;
  // 字符内容转换为blod地址
  const blob = new Blob([content]);
  downLink.href = URL.createObjectURL(blob);
  // 链接插入到页面
  document.body.appendChild(downLink);
  downLink.click();
  // 移除下载链接
  document.body.removeChild(downLink);
}

export function chooseFile(fileAccept, callback) {
  const finput = document.createElement('input');
  finput.type = 'file';
  finput.accept = fileAccept;
  finput.onchange = () => {
    const { files } = finput;
    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        callback(reader.result, file.name);
      };
      reader.readAsText(file);
    }
  };
  finput.click();
}
