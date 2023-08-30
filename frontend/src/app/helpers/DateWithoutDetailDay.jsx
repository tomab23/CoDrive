

/**
 * Format date
 * @returns new date with the new format 
 */
export const dateWithoutDetailDay = (newDate) => {
    // Travel date
    // let date = newDate;

    let date = new Date([newDate]);

    // Format the date jj-MM-aaaa
  const paternNewDate = (num) => {
    return num.toString().padStart(2, '0');
  }

  /**
   * Switch to find the name of th month
   * @returns name of the month
   */
    const month = () => {
      switch (paternNewDate(date.getMonth() + 1) ) {
        case '01':
          return 'janvier';
        case '02':
          return 'février';
        case '03':
          return 'mars';
        case '04':
          return 'avril';
        case '05':
          return 'mai';
        case '06':
          return 'juin';
        case '07':
          return 'juillet';
        case '08':
          return 'août';
        case '09':
          return 'septembre';
        case '10':
          return 'octobre';
        case '11':
          return 'novembre';
        case '12':
          return 'décembre';

      }
    }

  return [
    paternNewDate(date.getDate()),
    month(),
    date.getFullYear(),
  ].join(' ')

}
