export const FormatNumber = (value: string | number | undefined): string => {
  if (value === undefined) value = 0;
  return Number(value).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
};

export const FormatDate = (value: string | undefined) => {
  if (value === undefined) return;
  return new Date(value).toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
  });
};

export const FormatTime = (date: string | undefined) => {
  if (date === undefined) return;
  return new Date(date).toLocaleTimeString("en-IN", {
    hourCycle: "h24",
    timeZone: "Asia/Kolkata",
  });
};
