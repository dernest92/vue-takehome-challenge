const axios = require("axios");

exports.handler = function(event, context, callback) {
  const BASE_URL = "https://api.github.com";
  const { ACCESS_TOKEN } = process.env;
  const { q, page, per_page } = event.queryStringParameters;

  const send = body => {
    callback(null, {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept"
      },
      body: JSON.stringify(body)
    });
  };

  const apiCall = async () => {
    const res = await axios.get(
      `${BASE_URL}/search/repositories?q=${q}&page=${page}&per_page=${per_page}`,
      {
        headers: {
          Authorization: `Token ${ACCESS_TOKEN}`
        }
      }
    );

    const data = await res.data;
    send(data);
  };

  apiCall();
};
