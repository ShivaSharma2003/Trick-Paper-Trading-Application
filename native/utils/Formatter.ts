export const FormatNumber = (value: string | number): string => {
  return Number(value).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
};
