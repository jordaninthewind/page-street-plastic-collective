export const formatDecimal = (float: number | string | null | undefined, length = 3): string => {
  if (!float) return "";

  const [integer, decimal] = float.toString().split(".");
  return `${integer}.${(decimal ?? "").slice(0, length)}`;
};

export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
