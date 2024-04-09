import dayjs from 'dayjs';

export function showMessage(
  title: string,
  icon: 'success' | 'loading' | 'error' | 'none' | 'fail' | 'exception' = 'error',
  duration: number = 1500,
) {
  return uni.showToast({ title, duration, icon, mask: true });
}

export function formatNumber(num: number) {
  // Integers and decimals
  let val = Math.abs(num); // 非负数
  let integers = Math.trunc(val); // 整数部分
  let formatIntegers =
    integers > 0
      ? `${integers}`
          .split('')
          .reverse()
          .map((n, i) => (i !== 0 && i % 3 === 0 ? `${n},` : n))
          .reverse()
          .join('')
      : 0;
  let sign = Math.sign(num) < 0 ? '-' : ''; // 正数为 1，负数为 -1，零为 0
  let decimals = Math.round((val - integers) * 100) / 100; // 小数部分
  let formatDecimals = decimals === 0 ? '.00' : `${decimals}`.slice(1, 4); // 保留两位
  return sign + formatIntegers + formatDecimals;
}

export function getAsterisk(value: string, start: number = 3, end: number = 7, len?: number) {
  if (!value) return '';
  let endTemp = end > 0 ? end : value.length + end;
  let str = '',
    strEnd = len ? start + len : endTemp;
  for (let i = start; i < strEnd; i++) {
    str += '*';
  }
  return value.slice(0, start) + str + value.slice(endTemp);
}

export function setUserInformation(data: any) {
  const { token, key, id, jpg_url: avatar, nick_name: name, phone } = data;
  // console.log('token', token);
  token && uni.setStorageSync('token', token);
  key && uni.setStorageSync('key', key);
  uni.setStorageSync('info', { id, avatar, name, phone });
}

export function customToFixed(num: number | string) {
  num = Number(num);
  if (num === 0) {
    return 0;
  } else {
    return num.toFixed(2);
  }
}

export function customFormatDate(date: string) {
  const year = dayjs(date).year();
  console.log('year is', year);
  if (String(year) === '1') {
    return '/';
  } else {
    return dayjs(date).format('YYYY.MM.DD HH:mm:ss');
  }
}
