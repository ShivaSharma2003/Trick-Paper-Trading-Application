export const generateUserId = (): string => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let prefix = "";

  for (let i = 0; i < 3; i++) {
    prefix += letters.charAt(Math.floor(Math.random() * letters.length));
  }

  const number = Math.floor(100 + Math.random() * 900);
  return `${prefix}${number}`;
};
