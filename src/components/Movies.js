import React from "react";
import MoviePoster from "./MoviePoster.js";

class Movies extends React.Component {
  constructor() {
    super();

    this.state = { image: "" };

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
    return (
      <div>
        {this.props.movies.map(movie => (
          <MoviePoster
            key={movie.imdbID}
            movieObject={movie}
            receiveMovie={this.receiveMovie}
          />
        ))}
      </div>
    );
  }
}

export default Movies;
