export const isStale = (updatedAt) => {
  const freshDate = new Date(Date.now() - 1000 * 60 * 60 * 24 * 7);

  return updatedAt < freshDate;
};
