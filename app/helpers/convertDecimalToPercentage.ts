export function convertDecimalToPercentage(decimal: number) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return formatter.format(decimal);
}
