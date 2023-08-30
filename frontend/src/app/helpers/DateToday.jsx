/**
 * Day of today
 */
const date = new Date();

/**
 * Format date of today
 * @returns new date with the new format 
 */
const paternNewDate = (num) => {
  return num.toString().padStart(2, '0');
}

/**
 * Format date of today for input date about travel search
 * @returns new date of today with good format
 */
export const dateToday = () => {
  return [
    date.getFullYear(),
    paternNewDate(date.getMonth() + 1),
    paternNewDate(date.getDate())
  ].join('-')

}

