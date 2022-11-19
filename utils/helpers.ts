import { periodWeekly } from '../consts';

// function to change month numeric to month name
export function getMonthName(date: string) {
  const myDate = new Date(date);
  return myDate.toLocaleString('en-US', { month: 'long' });
}
// function to get weekday name
export function getWeekdayName(date: string) {
  const myDate = new Date(date);
  const myWeekday = myDate.getDay();
  return periodWeekly[myWeekday];
}
