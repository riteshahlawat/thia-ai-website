export const diffInDays = (endDay: number, startDay: number) => Math.ceil((endDay - startDay) / (1000 * 60 * 60 * 24));
export const daysFromNow = (day: number) => diffInDays(day, Date.now());
