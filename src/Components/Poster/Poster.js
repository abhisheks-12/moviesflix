import React, { Component } from "react";
import { moviesdata } from "../tempdata/moviesdata";
import "./Poster.css";

export default class Poster extends Component {
  render() {
    const movies = moviesdata.results;
    // console.log(movies);

    return (
      <div className="poster">
        {movies.length === 0 ? (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div className="card movies_card">
            <img
              src={`https://image.tmdb.org/t/p/original${movies[5].backdrop_path}`}
              className="card-img-top movies_poster"
              alt={movies.title}
              style={{width:"100vw",height:"100vh"}}
            />
            <h1 className="card-title movies_title">
              {movies[5].original_title}
            </h1>
            <p className="card-text movies_text">{movies[5].overview}</p>
          </div>
        )}
      </div>
    );
  }
}
