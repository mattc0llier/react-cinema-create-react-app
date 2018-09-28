import React from "react";
import Search from "./Search.js";
import Movies from "./Movies.js";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: []
    };

    this.fetchMovies = this.fetchMovies.bind(this);
    this.receiveSearchQuery = this.receiveSearchQuery.bind(this);
  }

  fetchMovies(searchQuery) {
    fetch(`http://www.omdbapi.com/?s=${searchQuery}&page=1&apikey=edd66bb`)
      .then(function(response) {
        return response.json();
      })
      .then(body => {
        this.setState({ movies: body.Search });
        console.log(this.state.movies);
      });
  }

  componentDidMount() {
    this.fetchMovies("jaws");
  }

  /// Pass props down to searchQuery
  receiveSearchQuery(searchQuery) {
    this.fetchMovies(searchQuery);
  }

  render() {
    return (
      <div className="App">
        <h1>Hello</h1>
        <Search receiveSearchQuery={this.receiveSearchQuery} />
        <Movies movies={this.state.movies} />
      </div>
    );
  }
}

export default App;
