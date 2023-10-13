import axios from 'axios';

export default axios.create({
  // (Delete when finish setting up this in CI/CD pipelines -> baseURL: 'https://api.svhackersclub.com/api/',
  // process.env is a global object in Node.js, and it is used to access application environment variables.
  baseURL: process.env.baseURL,
});
