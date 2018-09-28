import React from "react";

class MoviePoster extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.receiveMovie(this.props.movieObject);
  }

  render() {
    return (
      <div>
        <img
          onClick={this.handleClick}
          src={this.props.movieObject.Poster}
          alt={this.props.movieObject.Title}
        />
        <h4>{this.props.movieObject.Title}</h4>
        <div className="year">
          <p>{this.props.movieObject.Year}</p>
          <a
            href={`https://www.imdb.com/title/${this.props.movieObject.imdbID}`}
          >
            IMDB
          </a>
        </div>
      </div>
    );
  }
}

export default MoviePoster;
