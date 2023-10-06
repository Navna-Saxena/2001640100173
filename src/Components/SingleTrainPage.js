import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTrainDetails } from '../api'; // Import your API function

function SingleTrainPage() {
  const { trainNumber } = useParams();
  const [train, setTrain] = useState(null);

  useEffect(() => {
    // Fetch details of the specific train and update the state
    async function fetchData() {
      try {
        const token = await getToken(); // Use your getToken function from the API
        const data = await getTrainDetails(token, trainNumber);
        setTrain(data);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchData();
  }, [trainNumber]);

  return (
    <div>
      {train ? (
        <div>
          <h1>Train Details</h1>
          <p>Train Name: {train.trainName}</p>
          <p>Train Number: {train.trainNumber}</p>
          <p>Departure Time: {formatDepartureTime(train.departureTime, train.delayedBy)}</p>
          <p>Seats Available - Sleeper: {train.seatsAvailable.sleeper}</p>
          <p>Seats Available - AC: {train.seatsAvailable.AC}</p>
          <p>Price - Sleeper: {train.price.sleeper}</p>
          <p>Price - AC: {train.price.AC}</p>
          <p>Delay: {train.delayedBy} minutes</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default SingleTrainPage;

function formatDepartureTime(departureTime, delayedBy) {
  const departureDate = new Date(departureTime);
  departureDate.setMinutes(departureDate.getMinutes() + delayedBy);
  return departureDate.toLocaleTimeString();
}
