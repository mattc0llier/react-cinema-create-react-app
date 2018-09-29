import React from "react";
import Movies from "./Movies.js";

class Favourites extends React.Component {
  constructor() {
    super();

    this.state = { favouriteMoviesObjects: [] };

    this.receiveFavouriteMovie = this.receiveFavouriteMovie.bind(this);
  }

  receiveFavouriteMovie(movie) {
    this.setState({
      favouriteMoviesObjects: movie
    });
  }

  render() {
    return (
      <div>
        <h1>Favourites</h1>
        <Movies
          movies={this.state.favouriteMoviesObjects}
          receiveFavouriteMovie={this.receiveFavouriteMovie}
        />
      </div>
    );
  }
}

export default Favourites;
