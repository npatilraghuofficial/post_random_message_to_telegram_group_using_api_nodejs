const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; 
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/stockprice', (req, res) => {
  const command = req.body;
  console.log('Command received:', command);

  
  // Extract necessary information from the command payload
  const { text, user_id } = command;

  // Forward the request to the provided URL
  axios.post('process.env.API', {
    text,
    user_id
  })
    .then(response => {
      // Process the response from the provided URL as needed
      const responseData = response.data;

      const responsePayload = {
        response_type: 'in_channel',
        text: 'Response received from the provided URL.',
        data: responseData // Include any relevant data from the response
      };

      res.json(responsePayload);
    })
    .catch(error => {
      console.error('Error:', error);
      res.status(500).send('An error occurred.');
    });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
