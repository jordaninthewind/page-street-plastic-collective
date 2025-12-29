export const formatDecimal = (float, length = 3) => {
  if (!float) return "";

  const [integer, decimal] = float.toString().split(".");
  return `${integer}.${decimal.slice(0, length)}`;
};

export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
