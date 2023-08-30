
/**
 * Format hour value hours and "h" and minutes
 * @param {*} value is the hour of travel
 * @returns hour with new format hours and minutes
 */
export const HourFormat = (value) => {

    let hour = value.substring(0,2);
    let minute = value.substring(3,5);

    return[
        hour,
        minute
    ].join('h')

// let hour = value.substring(0, value.length -3);
// return hour;
}