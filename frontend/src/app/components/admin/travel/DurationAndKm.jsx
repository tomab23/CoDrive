import React, { useEffect} from 'react';
import axios from 'axios';

const apiKey = '4364c34a-94c8-422b-945b-59b3cb3dcbe9';

const DurationAndKm = ({ departureCity, arrivalCity, onDataReceived }) => {
   
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
              const formattedDistance = (distance / 1000).toFixed(0);
  
              onDataReceived(formattedDistance, time);
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
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(formattedAddress)}`
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

  return null;
};

export default DurationAndKm;
