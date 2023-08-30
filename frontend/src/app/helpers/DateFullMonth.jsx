
/**
 * Format date for details itinerary
 * @returns new date with the new format 
 */
export const DateFullMonth = (newDate) => {  

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
          return 'Janvier';
        case '02':
          return 'Février';
        case '03':
          return 'Mars';
        case '04':
          return 'Avril';
        case '05':
          return 'Mai';
        case '06':
          return 'Juin';
        case '07':
          return 'Juillet';
        case '08':
          return 'Août';
        case '09':
          return 'Septembre';
        case '10':
          return 'Octobre';
        case '11':
          return 'Novembre';
        case '12':
          return 'Décembre';

      }
    }

  return [       
    month(),
    date.getFullYear(),
  ].join(' ')
}