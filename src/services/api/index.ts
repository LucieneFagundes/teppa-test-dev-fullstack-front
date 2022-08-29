import axios from "axios";

export const api = axios.create({
  baseURL: "https://teppa-test-dev-fullstack.herokuapp.com/",
});
