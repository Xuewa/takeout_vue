// 保存属性到localstorage
export function setStorage(id, key, val) {
  console.log(id);
  var sellerObj = window.localStorage.__seller__;
  console.log(sellerObj);
  if (typeof (sellerObj) === 'undefined') {
    sellerObj = {};
    sellerObj[id] = {};
    console.log(sellerObj);
  } else {
    sellerObj = JSON.parse(sellerObj);
    if (!sellerObj[id]) {
      sellerObj[id] = {};
    };
    sellerObj[id][key] = val;
    window.localStorage.__seller__ = JSON.stringify(sellerObj);
  };
}
