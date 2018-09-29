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
    if (movie.imdbID !== this.state.movie.imdbID) {
      this.setState(
        {
          movie: movie
        },
        () => this.fetchMovie(this.state.movie.imdbID)
      );
    } else {
      this.setState({
        movie: ""
      });
    }
  }

  render() {
    const currentMovie = this.state.movie.imdbID;

    return (
      <div>
        {this.props.movies.map(movie => (
          <div key={movie.imdbID}>
            <MoviePoster movieObject={movie} receiveMovie={this.receiveMovie} />
            {currentMovie === movie.imdbID ? (
              <MovieDetails
                movieObject={movie}
                receiveFavouriteMovie={this.props.receiveFavouriteMovie}
              />
            ) : null}
          </div>
        ))}
      </div>
    );
  }
}

export default Movies;
