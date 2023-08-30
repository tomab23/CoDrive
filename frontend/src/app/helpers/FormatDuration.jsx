/**
 * Format the duration in milliseconds to the format "HH:mm:ss"
 * @param {number} duration - The duration in milliseconds
 * @returns {string} - The formatted duration string for the database
 */

export const formatDuration = (durationInMilliseconds) => {
    const seconds = Math.floor((durationInMilliseconds / 1000) % 60);
    const minutes = Math.floor((durationInMilliseconds / (1000 * 60)) % 60);
    const hours = Math.floor(durationInMilliseconds / (1000 * 60 * 60));
  
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
    return formattedTime;
  };