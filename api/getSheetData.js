// Import node-fetch to fetch data from the API
const fetch = require('node-fetch');

export default async function handler(req, res) {
  const sheetId = '1KCnIv_m48wM6SkMAYtDo68j7W8kjNSjxHRfs5xqgrsE';
  const range = 'Sheet1!A1';
  const apiKey = 'AIzaSyA-4DbzR3f-YlBvCTIoYY_wtaZNS2Fcdqg';

  // Construct the URL to make a request to the Google Sheets API
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Log the response to debug
    console.log(data);

    if (data.values && data.values.length > 0) {
      const value = data.values[0][0]; // Get the value of cell A1
      res.status(200).json({ value });
    } else {
      res.status(404).json({ error: 'No data found' });
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: error.message });
  }
}
