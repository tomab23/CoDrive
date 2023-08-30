import React, { useEffect, useState } from 'react';
import axios from 'axios';

const apiKey = '4364c34a-94c8-422b-945b-59b3cb3dcbe9';
const departureCity = 'Lille';
const arrivalCity = 'Paris';

const TravelTestKmHour = () => {
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  useEffect(() => {
    const getDistance = async () => {
      try {
        const departureCoordinates = await getCoordinates(departureCity);
        const arrivalCoordinates = await getCoordinates(arrivalCity);
        const response = await axios.get(
          `https://graphhopper.com/api/1/route?point=${departureCoordinates.join(
            ','
          )}&point=${arrivalCoordinates.join(',')}&type=json&locale=en-US&vehicle=car&key=${apiKey}`
        );

        const { paths } = response.data;
        if (paths && paths.length > 0) {
          const { distance, time } = paths[0];
          setDistance((distance / 1000).toFixed(2));
          setDuration(time);
        } else {
          throw new Error('No route found for the given cities');
        }
      } catch (error) {
        console.error('Error retrieving route:', error);
      }
    };

    getDistance();
  }, []);

  const getCoordinates = async (city) => {
    try {
      const formattedAddress = `${city}`;
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          formattedAddress
        )}`
      );

      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        return [parseFloat(lat), parseFloat(lon)];
      } else {
        throw new Error('No coordinates found for the address');
      }
    } catch (error) {
      console.error('Error retrieving coordinates:', error);
    }
  };
  
  const formatDuration = (duration) => {
    const hours = Math.floor(duration / 3600000);
    const minutes = Math.floor((duration % 3600000) / 60000);
    return `${hours}h ${minutes}min`;
  };
  
  return (
    <div>
      <p>Distance: {distance} km</p>
      <p>Duration: {formatDuration(duration)}</p>
    </div>
  );
};

export default TravelTestKmHour;
