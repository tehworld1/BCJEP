// Import node-fetch to fetch data from the API
const fetch = require('node-fetch');

export default async function handler(req, res) {
  const sheetId = '1KCnIv_m48wM6SkMAYtDo68j7W8kjNSjxHRfs5xqgrsE'; // Google Sheets ID
  const range = 'Sheet1!A1';  // Range: Fetch data from cell A1 in Sheet1 (or any other sheet)
  const apiKey = 'AIzaSyA-4DbzR3f-YlBvCTIoYY_wtaZNS2Fcdqg'; // Google API key

  // Construct the URL to make a request to the Google Sheets API
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

  try {
    // Make a request to the Google Sheets API
    const response = await fetch(url);
    const data = await response.json();

    // Check if data was found in the sheet
    if (data.values && data.values.length > 0) {
      const value = data.values[0][0];  // Get the value of cell A1
      res.status(200).json({ value });  // Return the value as a JSON response
    } else {
      res.status(404).json({ error: 'No data found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

