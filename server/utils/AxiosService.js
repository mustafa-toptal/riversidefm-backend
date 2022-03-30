const axios = require("axios");

class Service {
  constructor() {
    this.get = (endpoint, token, extraHeaders = {}) => {
      let url = process.env.TRANSCRIPTION_URL;
      return axios.get(url + endpoint, {
        headers: { Authorization: token, ...extraHeaders },
      });
    };
    this.post = (endpoint, postData, token) => {
      let url = process.env.TRANSCRIPTION_URL;
      return axios.post(url + endpoint, postData, {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${postData._boundary}`,
          Authorization: token,
        },
        maxBodyLength: Infinity,
      });
    };
    this.delete = (endpoint, token) => {
      let url = process.env.TRANSCRIPTION_URL;
      return axios.delete(url + endpoint, {
        headers: { Authorization: token },
      });
    };
  }
}

module.exports = {
  Service,
};
