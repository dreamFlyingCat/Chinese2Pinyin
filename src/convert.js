const charaters = require('./characters')

function convert({
  cn = '',
  threshold,
  concatKey,
  result = 'P',
  double = false,
  remainSpecial = false,
}) {
  let resultPinyin = '';
  let resultFirst = '';

  const len = cn.length; // 转换字符串的长度
  const getFirstFlag = result === 'F' || (result === 'P' && typeof threshold === 'number' && len > threshold)

  for (let i = 0; i < len; i++) {
    // 每次循环从str中拿去一个中文，并做转换
    const val = cn.substr(i, 1);
    const single = getPinyinAndFirst(val, double); //获取拼音
    if (single !== false) {
      resultPinyin += single.pinyin;
      resultFirst += single.first;
      if (i < len - 1 && concatKey) resultPinyin += concatKey;
    } else if (remainSpecial) {
      resultPinyin += val;
      resultFirst += val;
    }
  }

  if (result === 'A') {
    return {
      pinyin: resultPinyin,
      first: resultFirst.toUpperCase()
    }
  } else if (getFirstFlag) {
    return resultFirst.toUpperCase()
  } else {
    return resultPinyin
  }

}

// 获取拼音和大写字母
function getPinyinAndFirst(val, flag) {
  for (const pinyin in charaters) {
    if (charaters[pinyin].indexOf(val) !== -1) {
      let first = '';
      const str = pinyin[0].toUpperCase() + pinyin.slice(1);
      if (flag && /ch|zh|sh/.test(pinyin))
        first = pinyin.substr(0, 2);
      else
        first = pinyin.substr(0, 1);

      return {
        pinyin: str,
        first: first
      };
    }
  }
  return false;
}

// console.log(convert({
//   cn: '中国人民共和国',
//   result: 'P',
//   threshold: 4,
//   double: true
// }))


module.exports = convert;