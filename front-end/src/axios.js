import axios from "axios";

const baseURL = "https://kn-e-library-backend.herokuapp.com/";

const instance = axios.create({
  // .. congigure axios baseURL
  baseURL: `${baseURL}`
});

export default instance;