import React from "react";
import Search from "./Search.js";

class App extends React.Component {
  constructor() {
    super();

    this.fetchMovies = this.fetchMovies.bind(this);
    this.receiveSearchQuery = this.receiveSearchQuery.bind(this);
  }

  fetchMovies(searchQuery) {
    fetch(`http://www.omdbapi.com/?s=${searchQuery}&page=1&apikey=edd66bb`)
      .then(function(response) {
        return response.json();
      })
      .then(body => {
        console.log(body);
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
      </div>
    );
  }
}

export default App;
