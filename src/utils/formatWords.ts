function formatLunarDisctance(number: number) {
  const lastTwoDigits = number % 100;
  const lastDigit = number % 10;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return `${number} лунных орбит`;
  } else {
    switch (lastDigit) {
      case 1:
        return `${number} лунная орбита`;
      case 2:
      case 3:
      case 4:
        return `${number} лунные орбиты`;
      default:
        return `${number} лунных орбит`;
    }
  }
}

function formatAsteroidCount(number: number) {
  const lastTwoDigits = number % 100;
  const lastDigit = number % 10;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return `${number} астероидов`;
  } else {
    switch (lastDigit) {
      case 1:
        return `${number} астероид`;
      case 2:
      case 3:
      case 4:
        return `${number} астероида`;
      default:
        return `${number} астероидов`;
    }
  }
}

export { formatLunarDisctance, formatAsteroidCount };
