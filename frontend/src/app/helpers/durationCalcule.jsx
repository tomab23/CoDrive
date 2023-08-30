export function durationCalcule(startTime, endTime) {
  const [startHour, startMinute, startSecond] = startTime.split(':').map(Number);
  const [endHour, endMinute, endSecond] = endTime.split(':').map(Number);

  let hours = endHour - startHour;
  let minutes = endMinute - startMinute;
  let seconds = endSecond - startSecond;

  if (seconds < 0) {
      seconds += 60;
      minutes -= 1;
  }
  if (minutes < 0) {
      minutes += 60;
      hours -= 1;
  }
  if (hours < 0) {
      hours = 0;
      minutes = 0;
      seconds = 0;
  }

  const formattedDuration = `${hours.toString().padStart(2)}h${minutes.toString().padStart(2, '0')}`;

  return formattedDuration;
}
