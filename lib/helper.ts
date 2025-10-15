type DateInput = Date | number | string;

const WEEKDAY_MAP: Record<number, string> = {
  0: '\u65e5',
  1: '\u4e00',
  2: '\u4e8c',
  3: '\u4e09',
  4: '\u56db',
  5: '\u4e94',
  6: '\u516d',
};

export const formatDate = (
  dateInput: DateInput = new Date(),
  fmt = 'yyyy-MM-dd HH:mm:ss'
): string => {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);

  const tokenMap: Record<string, number> = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds(),
  };

  let formatted = fmt.replace(/(y+)/g, (match) =>
    `${date.getFullYear()}`.substring(4 - match.length)
  );

  formatted = formatted.replace(/(E+)/g, (match) => {
    const prefix =
      match.length > 1 ? (match.length > 2 ? '\u661f\u671f' : '\u5468') : '';
    return `${prefix}${WEEKDAY_MAP[date.getDay()]}`;
  });

  Object.entries(tokenMap).forEach(([token, value]) => {
    const regex = new RegExp(`(${token})`, 'g');
    formatted = formatted.replace(regex, (match) =>
      match.length === 1
        ? String(value)
        : `00${value}`.slice(String(value).length)
    );
  });

  return formatted;
};
