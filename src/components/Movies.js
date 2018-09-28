import React from "react";
import MoviePoster from "./MoviePoster.js";
import MovieDetails from "./MovieDetails.js";

class Movies extends React.Component {
  constructor() {
    super();

    this.state = { movie: "" };

    this.receiveMovie = this.receiveMovie.bind(this);
    this.fetchMovie = this.fetchMovie.bind(this);
  }

  fetchMovie(movieImdbID) {
    fetch(`http://www.omdbapi.com/?i=${movieImdbID}&apikey=edd66bb`)
      .then(function(response) {
        return response.json();
      })
      .then(body => {
        console.log(body);
      });
  }

  receiveMovie(movie) {
    this.setState(
      {
        movie: movie
      },
      () => this.fetchMovie(this.state.movie.imdbID)
    );
  }

  render() {
    const movieExists = !!this.state.movie.imdbID;

    return (
      <div>
        {this.props.movies.map(movie => (
          <div key={movie.imdbID}>
            <MoviePoster movieObject={movie} receiveMovie={this.receiveMovie} />
            {movieExists ? <MovieDetails movieObject={movie} /> : null}
          </div>
        ))}
      </div>
    );
  }
}

export default Movies;
