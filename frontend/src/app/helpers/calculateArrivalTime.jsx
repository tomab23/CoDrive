export const calculateArrivalTime = (startTime, duration) => {
  const [startHours, startMinutes, startSeconds] = startTime.split(":").map(Number);

  const totalStartSeconds = (startHours * 3600) + (startMinutes * 60) + startSeconds;
  const totalArrivalSeconds = Math.floor(duration / 1000) + totalStartSeconds;

  const hours = Math.floor(totalArrivalSeconds / 3600) % 24;
  const minutes = Math.floor((totalArrivalSeconds % 3600) / 60);
  const seconds = totalArrivalSeconds % 60;

  const formattedArrivalTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return formattedArrivalTime;
}


  