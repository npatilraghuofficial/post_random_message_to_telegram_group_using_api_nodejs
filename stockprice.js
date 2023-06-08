//implement this logic on slack slash command using blitzico flow

// This function fetches the current stock price of a given symbol
// and prints it to the console
// Usage: fetchStockPrice('AAPL', 'INR');




const axios = require('axios');

const fetchStockPrice = (symbol, currency) => {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?range=1d&interval=1d&includePrePost=false&corsDomain=finance.yahoo.com&.tsrc=finance`;

  axios.get(url)
    .then(response => {
      const data = response.data;

      // Extract the current stock price from the response
      const currentPrice = data.chart.result[0].meta.regularMarketPrice;
      console.log(`The current stock price of ${symbol} is: ${currentPrice} ${currency}`);
    })
    .catch(error => {
      console.error('Error fetching stock price:', error);
    });
};

// Usage example: fetchStockPrice('AAPL', 'INR');

module.exports = fetchStockPrice;
