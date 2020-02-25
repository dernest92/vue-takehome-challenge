const axios = require("axios");

exports.handler = async function(event, context, callback) {
  const BASE_URL = "https://api.github.com";

  const { CLIENT_ID, CLIENT_SECRET, ACCESS_TOKEN } = process.env;
  const { repo } = event.queryStringParameters;
  console.log(ACCESS_TOKEN);

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
    try {
      const res = await axios.get(`${BASE_URL}/repos/${repo}/commits`, {
        headers: {
          Authorization: `Token ${ACCESS_TOKEN}`
        }
      });
      const data = await res.data;
      // console.log(data);
      send(data);
    } catch (err) {
      console.log(err);
      send(err);
    }
  };

  await apiCall();
};

// export default async function fetchRepoData(repoFullName) {
//   const url = "https://api.github.com";

//   const commitsRes = await fetch(`${url}/repos/${repoFullName}/commits`);

//   const commitsData = await commitsRes.json();

//   const {
//     sha,
//     html_url,
//     commit: {
//       author: { name, email, date }
//     }
//   } = commitsData[0];

//   return {
//     repoFullName,
//     lastUpdated: date,
//     authorName: name,
//     hash: sha,
//     authorEmail: email,
//     commitLink: html_url
//   };
// }
