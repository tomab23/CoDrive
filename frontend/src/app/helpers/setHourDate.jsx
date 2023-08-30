import React from 'react'

/**
 * Take the hour and the day, reformat in type Date
 * @param {*} hourOfTravel hour of the travel
 * @param {*} dateTravel day of the travel
 * @returns new Date() date and hour of the travel
 */
export const setHourDate = (hourOfTravel, dateTravel) => {
        let hourTravel = String(hourOfTravel);
        let dayTravel = String(dateTravel)
        let hourDate = new Date();
    
        let year = dayTravel.substring(0,4)
        let month = dayTravel.substring(5,7)
        let day = dayTravel.substring(8,10)
        let hour = hourTravel.substring(0,2)
        let minute = hourTravel.substring(3, 5)
        let seconde = hourTravel.substring(6,8)
    
        hourDate.setFullYear(year);
        hourDate.setMonth(month - 1);
        hourDate.setDate(day);
        hourDate.setHours(hour);
        hourDate.setMinutes(minute);
        hourDate.setSeconds(seconde);
    
        return hourDate;
      }

