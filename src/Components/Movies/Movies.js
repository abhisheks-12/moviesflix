import axios from "axios";
import React, { Component } from "react";
import { moviesdata } from "../tempdata/moviesdata";
import "./Movies.css";

export default class Movies extends Component {
  constructor() {
    super();
    this.state = {
      showbtn: "",
      currentpage: 1,
      movieslist: [],
      pages: [1],
      favouritelist: [],
      
    };
  }

  fetchMoviesData = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=ba1157f9e5a5f8d283c2950226c2aea4&language=en-US&page=${this.state.currentpage}`
    );
    const data = response.data.results;
    this.setState({
      movieslist: [...data],
    });
  };

  async componentDidMount() {
    this.fetchMoviesData();
  }

  displayHover = (id) => {
    this.setState({
      showbtn: id,
    });
    // console.log(this.state.showbtn);
  };

  hideHover = () => {
    this.setState({
      showbtn: "",
    });
  };

  handelNextClick = (e) => {
    e.preventDefault();
    const tempPages = [];
    for (let i = 1; i <= this.state.pages.length + 1; i++) {
      tempPages.push(i);
    }
    this.setState(
      {
        pages: [...tempPages],
        currentpage: this.state.currentpage + 1,
      },
      this.fetchMoviesData
    );
  };

  handelPreviousClick = (e) => {
    e.preventDefault();
    if (this.state.currentpage !== 1) {
      const tempPages = [];
      for (let i = 1; i < this.state.pages.length; i++) {
        tempPages.push(i);
      }
      this.setState(
        {
          pages: [...tempPages],
          currentpage: this.state.currentpage - 1,
        },
        this.fetchMoviesData
      );
      console.log(this.state.pages);
    }
  };

  handelPageClick = (page, e) => {
    e.preventDefault();
    const tempPages = [];
    for (let i = 1; i <= page; i++) {
      tempPages.push(i);
    }
    this.setState(
      {
        pages: [...tempPages],
        currentpage: page,
      },
      this.fetchMoviesData
    );
  };

  handelFavourite = (e, movie) => {
    e.preventDefault();
    let oldData = JSON.parse(localStorage.getItem("movieapp") || "[]");
    if (this.state.favouritelist.includes(movie.id)) {
      oldData = oldData.filter((mdata) => mdata.id !== movie.id);
    } else {
      oldData.push(movie);
    }
    localStorage.setItem("movieapp", JSON.stringify(oldData));

    // console.log(oldData);

    const tempFav = oldData.map((data) => data.id);
    // console.log(tempFav);
    this.setState({
      favouritelist: [...tempFav],
    });
  };

  render() {
    const movies = moviesdata.results;
    // console.log(movies);
    return (
      <div className="movies">
        {movies.length === 0 ? (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <>
            <div className="title">
              <center>
                <h3>
                  Trending Movies <i class="fas fa-fire"></i>
                </h3>
              </center>
            </div>

            <div className="card_wrapper">
              {this.state.movieslist.map((movie) => (
                <div
                  className="card card_margin"
                  key={movie.id}
                  onMouseOver={() => this.displayHover(movie.id)}
                  onMouseLeave={this.hideHover}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    className="card-img-top movie_img"
                    alt={movie.title}
                    style={{ width: "19rem" }}
                  />

                  <h5 className="card-title movie_title">{movie.title}</h5>
                  <div
                    className="btn_wrapper"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    {this.state.showbtn === movie.id && (
                      <a
                        href="/"
                        className="btn btn-primary  movie_btn"
                        onClick={(e) => this.handelFavourite(e, movie)}
                      >
                        {this.state.favouritelist.includes(movie.id)
                          ? "Remove from favourite"
                          : "Add to favourite"}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        <div
          className="navigation"
          style={{
            display: "flex",
            justifyContent: "center",
            fontWeight: "bold",
            margin: "10px 0",
          }}
        >
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <a
                  className="page-link"
                  href="/"
                  onClick={this.handelPreviousClick}
                >
                  Previous
                </a>
              </li>

              {this.state.pages.map((page) => (
                <li className="page-item" key={page}>
                  <a
                    className="page-link"
                    href="/"
                    onClick={(e) => this.handelPageClick(page, e)}
                  >
                    {page}
                  </a>
                </li>
              ))}

              <li className="page-item">
                <a
                  className="page-link"
                  href="/"
                  onClick={this.handelNextClick}
                >
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}
