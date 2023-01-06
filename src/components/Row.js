import axios from "../api/axios";
import React, { useState, useEffect } from "react";
import "./Row.css";
import MovieModal from "./MovieModal/MovieModal";

export default function Row({ title, fetchUrl, isLargeRow, id }) {
  // 영화 정보 가져오기
  const [movies, setMovies] = useState([]);
  // 모달 오픈 체크 상태
  const [modalOpen, setModalOpen] = useState(false);
  // 오픈된 모달 정보 가져오기
  const [movieSelected, setMovieSelected] = useState({});

  useEffect(() => {
    const fetchMovieData = async () => {
      const request = await axios.get(fetchUrl);
      console.log("request", request);
      setMovies(request.data.results);
    };

    fetchMovieData();
  }, [fetchUrl]);

  const openModal = (movie) => {
    setModalOpen(true);
    setMovieSelected(movie);
  };

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
              onClick={() => {
                openModal(movie);
              }}
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
      {modalOpen && <MovieModal {...movieSelected} setModalOpen={setModalOpen} />}
    </section>
  );
}
