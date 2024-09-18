export default function formatter(number) {
  const format = new Intl.NumberFormat();
  return format.format(number);
}
