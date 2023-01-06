import axios from "../api/axios";
import React, { useState, useEffect } from "react";
import "./Row.css";

export default function Row({ title, fetchUrl, isLargeRow, id }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovieData = async () => {
      const request = await axios.get(fetchUrl);
      console.log("request", request);
      setMovies(request.data.results);
    };

    fetchMovieData();
  }, [fetchUrl]);

  return (
    <section className="row">
      {/**Title */}
      <h2>{title}</h2>
      <div className="slider">
        <div
          className="slider__arrow-left"
          onClick={() => {
            document.getElementById(id).scrollLeft -= window.innerWidth - 80;
          }}
        >
          <span className="arrow">{"<"}</span>
        </div>
        <div id={id} className="row__posters">
          {/**SEVERAL ROW__POSTER */}
          {movies.map((movie) => (
            <img
              key={movie.id}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
              loading="lazy"
              alt={movie.name}
            />
          ))}
        </div>
        <div
          className="slider__arrow-right"
          onClick={() => {
            document.getElementById(id).scrollLeft += window.innerWidth - 80;
          }}
        >
          <span className="arrow">{">"}</span>
        </div>
      </div>
    </section>
  );
}
