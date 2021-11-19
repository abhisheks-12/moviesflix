import React, { Component } from "react";
import "./Favourite.css";
import { genreids } from "./genreids";
// import { moviesdata } from "../tempdata/moviesdata";

export default class Favourite extends Component {
  constructor() {
    super();
    this.state = {
      currentgenre: "All Genres",
      genredata: [],
      moviesdata: [],
      serachinput: "",
      limit: 5,
      currentpage: 1,
    };
  }

  componentDidMount() {
    const olddata = JSON.parse(localStorage.getItem("movieapp") || "[]");
    // console.log(olddata);
    const genreList = [];
    olddata.forEach((mdata) => {
      if (!genreList.includes(genreids[mdata.genre_ids[0]])) {
        genreList.push(genreids[mdata.genre_ids[0]]);
      }
    });
    genreList.unshift("All Genres");
    this.setState({
      genredata: [...genreList],
      moviesdata: [...olddata],
    });
  }

  handelGneres = (genre) => {
    this.setState({
      currentgenre: genre,
    });
  };

  sortPopularityAscending = () => {
    const tempMovies = this.state.moviesdata;
    const sortedMovies = tempMovies.sort((a, b) => {
      return b.popularity - a.popularity;
    });
    this.setState({
      moviesdata: [...sortedMovies],
    });
  };

  sortPopularityDescending = () => {
    const tempMovies = this.state.moviesdata;
    const sortedMovies = tempMovies.sort((a, b) => {
      return a.popularity - b.popularity;
    });
    this.setState({
      moviesdata: [...sortedMovies],
    });
  };

  sortRatingAscending = () => {
    const tempMovies = this.state.moviesdata;
    const sortedMovies = tempMovies.sort((a, b) => {
      return b.vote_average - a.vote_average;
    });
    this.setState({
      moviesdata: [...sortedMovies],
    });
  };

  sortRatingDescending = () => {
    const tempMovies = this.state.moviesdata;
    const sortedMovies = tempMovies.sort((a, b) => {
      return a.vote_average - b.vote_average;
    });
    this.setState({
      moviesdata: [...sortedMovies],
    });
  };

  handelPageClick = (e, pageno) => {
    e.preventDefault();
    this.setState({
      currentpage: pageno,
    });
  };

  handelDelte = (id) => {
    // console.log(this.state.moviesdata)
    const arr = this.state.moviesdata.filter((data) => data.id !== id);
    this.setState({
      moviesdata: [...arr],
    });
    localStorage.setItem("moviesapp", JSON.stringify(arr));
  };

  render() {
    // search movie
    let filterMovies;
    if (this.state.serachinput === "") {
      filterMovies = this.state.moviesdata;
    } else {
      filterMovies = this.state.moviesdata.filter((mdata) => {
        const title = mdata.original_title.toLowerCase();
        return title.includes(this.state.serachinput.toLowerCase());
      });
    }

    // sort according to genre
    if (this.state.currentgenre !== "All Genres") {
      filterMovies = this.state.moviesdata.filter(
        (data) => genreids[data.genre_ids[0]] === this.state.currentgenre
      );
    } // console.log(filterMovies);

    // pagination
    const tempPages = [];
    const pagesAll = Math.ceil(filterMovies.length / this.state.limit);
    for (let i = 1; i <= pagesAll; i++) {
      tempPages.push(i);
    }
    const firstIdx = (this.state.currentpage - 1) * this.state.limit;
    const lastIdx = firstIdx + this.state.limit;

    filterMovies = filterMovies.slice(firstIdx, lastIdx);

    return (
      <div className="favourite">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-sm-12 genre_list">
              <ul className="list-group">
                {this.state.genredata.map((genre) => (
                  <>
                    {genre === this.state.currentgenre ? (
                      <li
                        className="list-group-item"
                        key={genre}
                        style={{
                          backgroundColor: "#EA3C53",
                          color: "white",
                          cursor: "pointer",
                        }}
                        onClick={() => this.handelGneres(genre)}
                      >
                        {genre}
                      </li>
                    ) : (
                      <li
                        className="list-group-item"
                        key={genre}
                        style={{
                          backgroundColor: "white",
                          color: "#EA3C53",
                          cursor: "pointer",
                        }}
                        onClick={() => this.handelGneres(genre)}
                      >
                        {genre}
                      </li>
                    )}
                  </>
                ))}
              </ul>
            </div>

            <div className="col-lg-9 col-sm-12 movie_table">
              <div className="row">
                <input
                  type="text"
                  className="col-8 input-group-text"
                  placeholder="search"
                  value={this.state.serachinput}
                  onChange={(e) =>
                    this.setState({ serachinput: e.target.value })
                  }
                />
                <input
                  type="number"
                  className="col-4 input-group-text"
                  placeholder="limit"
                  value={this.state.limit}
                  onChange={(e) => this.setState({ limit: e.target.value })}
                />
              </div>

              <table className="table">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Title</th>
                    <th scope="col">Genre</th>
                    <th scope="col">
                      <i
                        className="fas fa-sort-up  arrow_poinetr"
                        onClick={this.sortPopularityAscending}
                      />
                      Poularity
                      <i
                        className="fas fa-sort-down arrow_poinetr"
                        onClick={this.sortPopularityDescending}
                      />
                    </th>
                    <th scope="col">
                      <i
                        className="fas fa-sort-up arrow_poinetr"
                        onClick={this.sortRatingAscending}
                      />
                      Rating
                      <i
                        className="fas fa-sort-down arrow_poinetr"
                        onClick={this.sortRatingDescending}
                      />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filterMovies.map((movie) => (
                    <tr>
                      <td>
                        <img
                          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                          alt={movie.title}
                          style={{ width: "5rem" }}
                        />
                      </td>
                      <td style={{ width: "30%" }}>{movie.original_title}</td>
                      <td>{genreids[movie.genre_ids[0]]}</td>
                      <td>{movie.popularity.toFixed(1)}</td>
                      <td>{movie.vote_average}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => this.handelDelte(movie.id)}
                        >
                          <i className="fas fa-trash" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div
          className="fav_pagination"
          style={{
            display: "flex",
            justifyContent: "center",
            fontWeight: "800",
          }}
        >
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              {tempPages &&
                tempPages.map((page) => (
                  <li className="page-item" key={page}>
                    <a
                      className="page-link"
                      href="/"
                      onClick={(e) => this.handelPageClick(e, page)}
                    >
                      {page}
                    </a>
                  </li>
                ))}
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}
