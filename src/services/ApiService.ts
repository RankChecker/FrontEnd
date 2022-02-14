import axios from "axios";

export const ApiService = axios.create({
  baseURL: "https://rankcheckerapp.herokuapp.com",
});
