import { format } from "date-fns";
import { ru } from "date-fns/locale";

export default function (dateStr: string, dateFormat = "human"): string {
  if (!dateStr) return "Дата отсутствует";
  // Убираем часовой пояс из даты
  dateStr = dateStr.substr(0, 16);
  const date = new Date(dateStr);
  const now = new Date();
  if (dateFormat === "numeric") return format(date, "dd.MM.yyyy");
  const isToday =
    date.toISOString().substr(0, 10) === now.toISOString().substr(0, 10);
  // Сегодня
  if (isToday) return `Сегодня, ${format(date, "HH:mm")}`;
  // Вчера
  now.setDate(now.getDate() - 1);
  const isYesterday =
    date.toISOString().substr(0, 10) === now.toISOString().substr(0, 10);
  if (isYesterday) return `Вчера, ${format(date, "HH:mm")}`;
  // Обычная дата
  return format(
    date,
    `d MMM${date.getFullYear() === now.getFullYear() ? "" : " yyyy,"} HH:mm`,
    { locale: ru }
  );
}
