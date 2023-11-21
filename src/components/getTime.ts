export const getTime = (time: number, timezone: number): Date => new Date((time + timezone) * 1000);
