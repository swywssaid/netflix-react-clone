import axios from "../api/axios";
import React, { useState, useEffect } from "react";
import requests from "../api/requests";
import "./Banner.css";

export default function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // 현재 상영중인 영화 정보를 가져오기(여러 영화)
    const request = await axios.get(requests.fetchNowPlaying);

    // 여러 영화 중 하나의 영화의 ID를 가져오기
    const movieId = request.data.results[Math.floor(Math.random() * request.data.results.length)].id;

    // 특정 영화의 더 상세한 정보 가져오기(비디오 정보도 포함)
    const { data: movieDetail } = await axios.get(`movie/${movieId}`, { params: { append_to_response: "videos" } });
    console.log(movieDetail, movieDetail.backdrop_path);

    setMovie(movieDetail);
  };

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`,
        backgroundPosition: "top center",
        backgroundSize: "cover",
      }}
    >
      <div className="banner__contents">
        {/**Tittle */}
        <hi className="banner__title">{movie.title || movie.name || movie.original_name}</hi>
        <div className="banner__buttons">
          <button className="banner__button play">Play</button>
          <button className="banner__button info">
            <div className="space"></div>More Information
          </button>
        </div>
        {/**Div > 2 BUTTONS */}
        <h1 className="banner__description">{truncate(movie.overview, 100)}</h1>
        {/*Description*/}
      </div>
      <div className="banner--fadeBottom"></div>
    </header>
  );
}
