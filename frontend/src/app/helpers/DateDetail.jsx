
/**
 * Format date for details itinerary
 * @returns new date with the new format 
 */
export const DateDetail = (newDate) => {
    // Travel date
    // let date = newDate;

    let date = new Date([newDate]);

    // Format the date jj-MM-aaaa
  const paternNewDate = (num) => {
    return num.toString().padStart(2, '0');
  }

  /**
   * Switch to find the name of the day
   * @returns name of the day
   */
  const day = () => {
    switch (date.getDay()) {
      case 0:
        return "dimanche";
      case 1:
        return "lundi";
      case 2:
        return "mardi";
      case 3:
        return "mercredi";
      case 4:
        return "jeudi";
      case 5:
        return "vendredi";
      case  6:
        return "samedi";
    }
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
    day(),
    paternNewDate(date.getDate()),
    month(),
    date.getFullYear(),
  ].join(' ')

}