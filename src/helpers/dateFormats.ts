import { getTimezoneOffset } from "date-fns-tz";

// Для использования даты в нативном календаре
// 2021-05-24T22:26:00.823+03:00 -> 2021-05-24T22:26
export function fullDateToHtmlDate(datestring: string): string {
  // Пустую дату не трогаем
  return datestring ? datestring.substr(0, 16) : "";
}

// Для преобразования даты из нативного календаря в формат сервера
// 2021-05-24T22:26 -> 2021-05-24T22:26:00.823+03:00
export function htmlDatetoFullDate(
  datestring: string,
  timezone = "Europe/Astrakhan"
): string {
  const offsetMs = getTimezoneOffset(timezone);
  const offsetString = convertTimezoneOffset(offsetMs);
  // Пустую дату не трогаем
  return datestring ? datestring + `:00${offsetString}` : "";
}

function convertTimezoneOffset(offsetMs: number): string {
  const offsetHours = offsetMs / (60 * 60 * 1000);
  switch (offsetHours) {
    case 1:
      return "+01:00";
    case 2:
      return "+02:00";
    case 3:
      return "+03:00";
    case 4:
      return "+04:00";
    case 5:
      return "+05:00";
    case 6:
      return "+06:00";
    case 7:
      return "+07:00";
    case 8:
      return "+08:00";
    case 9:
      return "+09:00";
    case 10:
      return "+10:00";
    case 11:
      return "+11:00";
    case 12:
      return "+12:00";
    default:
      return "+00:00";
  }
}
