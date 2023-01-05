import axios from "axios";
const config = require("./config/key");

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: config.movieDB_key,
    language: "ko-KR",
  },
});

export default instance;
