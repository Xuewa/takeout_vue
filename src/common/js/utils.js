export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  // console.log(fmt);
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      let replaceVal = RegExp.$1.length === 1 ? str : padeLeftZero(str);
      // console.log(replaceVal);
      fmt = fmt.replace(RegExp.$1, replaceVal);
    }
  }
  return fmt;
}

function padeLeftZero(str) {
  // 永远取2位字符
  return ('00' + str).substr(str.length);
}
