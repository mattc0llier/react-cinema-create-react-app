import React from "react";
import YouTube from "react-youtube";

class MovieDetails extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    console.log(event);
    this.props.receiveFavouriteMovie(this.props.movieObject);
  }

  render() {
    // YOUtube options
    const opts = {
      height: "390",
      width: "640",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: -1
      }
    };

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
        <div>
          <YouTube videoId="U1fu_sA7XhE" opts={opts} onReady={this._onReady} />
        </div>
        <button onClick={this.handleClick}>Add to favourites</button>
        <button>Remove from favourites</button>
        <button>Add to watched</button>
        <button>Remove from watched</button>

        <p>Watched</p>
        <p>Save</p>
      </div>
    );
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}

export default MovieDetails;
