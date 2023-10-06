import axios from 'axios'
const getToken = async () => {
    const authUrl = 'http://20.244.56.144/train/auth';
    const requestBody = {
      companyName: 'Train Central',
      clientID: 'b46128a0-fbde-4c16-a4b1-6ae6ad718e27',
      ownerName: 'Ram',
      ownerEmail: 'ram@abc.edu',
      rollNo: '1',
      clientSecret: 'XOyo10RPayKBODAN',
    };
  
    try {
      const response = await fetch(authUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      if (response.ok) {
        const data = await response.json();
        return data.access_token;
      } else {
        // Handle errors here
        throw new Error('Failed to obtain authorization token');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };
  
  export { getToken };
