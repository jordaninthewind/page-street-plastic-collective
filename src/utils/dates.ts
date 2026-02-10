const getFreshDate = (): Date => new Date(Date.now() - 1000 * 60 * 60 * 24 * 7);

export const isStale = (updatedAt: Date): boolean => updatedAt < getFreshDate();
