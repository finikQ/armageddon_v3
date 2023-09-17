function formatDate(inputDate: string): string {
  const months = [
    "янв",
    "февр",
    "мар",
    "апр",
    "мая",
    "июня",
    "июля",
    "авг",
    "сент",
    "окт",
    "нояб",
    "дек",
  ];

  const dateParts = inputDate.split("-");
  if (dateParts.length !== 3) {
    throw new Error("Неверный формат даты");
  }

  const year = dateParts[0];
  let monthIndex = parseInt(dateParts[1]) - 1;
  const day = parseInt(dateParts[2]);

  if (isNaN(monthIndex) || monthIndex < 0 || monthIndex >= months.length) {
    return "Неверный формат месяца";
  }

  if (isNaN(day) || day < 1 || day > 31) {
    return "Неверный формат дня";
  }

  const formattedDay = day.toString();
  const formattedMonth = months[monthIndex];

  return `${formattedDay} ${formattedMonth} ${year}`;
}

function dateNowISOS(): string {
  const todayDate = new Date().toISOString().slice(0, 10);
  return todayDate;
}

function weeksCalculateISOS(weekPlus: number): string {
  const todayDate = Date.now();
  const futureDate = todayDate + 604800000 * (weekPlus - 1);
  return new Date(futureDate).toISOString().slice(0, 10);
}

export { formatDate, dateNowISOS, weeksCalculateISOS };
