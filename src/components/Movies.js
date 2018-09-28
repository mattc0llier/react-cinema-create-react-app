import React from "react";
import MoviePoster from "./MoviePoster.js";

class Movies extends React.Component {
  render() {
    return (
      <div>
        {this.props.movies.map(movie => (
          <MoviePoster key={movie.imdbID} movieObject={movie} />
        ))}
      </div>
    );
  }
}

export default Movies;
