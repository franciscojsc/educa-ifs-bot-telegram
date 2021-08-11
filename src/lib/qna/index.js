const axios = require('axios');

const authorization = process.env.QNA_AUTHORIZATION;
const url = process.env.QNA_URL;

module.exports = async (text) => {
  try {
    const postData = {
      question: text,
    };

    const axiosConfig = {
      headers: {
        Authorization: authorization,
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
    };

    const response = await axios.post(url, postData, axiosConfig);

    return response.data.answers[0].answer;
  } catch (error) {
    throw new Error(`Error QnA: ${error}`);
  }
};
