import React from "react";

class MovieDetails extends React.Component {
  render() {
    return (
      <div>
        <img
          src={this.props.movieObject.Poster}
          alt={this.props.movieObject.Title}
        />
        <h4>{this.props.movieObject.Title}</h4>

        <p>{this.props.movieObject.Year}</p>
        <p>{this.props.movieObject.Rated}</p>
        <p>{this.props.movieObject.Runtime}</p>
        <a href={`https://www.imdb.com/title/${this.props.movieObject.imdbID}`}>
          IMDB
        </a>

        <button class="play-button" />
        <button class="watch-trailer-button" />

        <p>Watched</p>
        <p>Save</p>
      </div>
    );
  }
}

export default MovieDetails;
