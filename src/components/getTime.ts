interface ITime {
  time: number;
  timezone: number;
}

export const getTime = (data: ITime): Date => new Date((data.time + data.timezone) * 1000);
