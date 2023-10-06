import axios from 'axios';

const BASE_URL = 'http://20.244.56.144/train';

const getAllTrains = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/trains`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      // Handle errors here
      throw new Error('Failed to fetch all trains');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

const getTrainDetails = async (token, trainNumber) => {
  try {
    const response = await axios.get(`${BASE_URL}/trains/${trainNumber}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      // Handle errors here
      throw new Error(`Failed to fetch train details for train number ${trainNumber}`);
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export { getAllTrains, getTrainDetails };

