import React, { useEffect, useState } from 'react';
import { getAllTrains } from '../api'; // Import your API function
import TrainList from '../components/TrainList'; // Create a TrainList component to display trains

function AllTrainsPage() {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    // Fetch all trains and update the state
    async function fetchData() {
      try {
        const token = await getToken(); // Use your getToken function from the API
        const data = await getAllTrains(token);
        
        // Filter out trains departing in the next 30 minutes
        const currentTime = new Date();
        const filteredTrains = data.filter(train => {
          const departureTime = new Date(train.departureTime);
          return departureTime.getTime() - currentTime.getTime() > 30 * 60 * 1000; // 30 minutes in milliseconds
        });

        // Sort the trains based on the specified criteria
        filteredTrains.sort((a, b) => {
          // Ascending order of price
          const priceA = a.price.sleeper + a.price.AC;
          const priceB = b.price.sleeper + b.price.AC;
          if (priceA !== priceB) {
            return priceA - priceB;
          }
          
          // Descending order of tickets
          const ticketsA = a.seatsAvailable.sleeper + a.seatsAvailable.AC;
          const ticketsB = b.seatsAvailable.sleeper + b.seatsAvailable.AC;
          if (ticketsA !== ticketsB) {
            return ticketsB - ticketsA;
          }

          // Descending order of departure time after considering delays
          const departureTimeA = new Date(a.departureTime).getTime() + a.delayedBy * 60 * 1000;
          const departureTimeB = new Date(b.departureTime).getTime() + b.delayedBy * 60 * 1000;
          return departureTimeB - departureTimeA;
        });

        setTrains(filteredTrains);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>All Trains</h1>
      <TrainList trains={trains} />
    </div>
  );
}

export default AllTrainsPage;
