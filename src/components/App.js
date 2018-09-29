import React from "react";
import Search from "./Search.js";
import Movies from "./Movies.js";
import Pagination from "./Pagination.js";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      totalResults: 0,
      resultsPage: 0
    };

    this.fetchMovies = this.fetchMovies.bind(this);
    this.receiveSearchQuery = this.receiveSearchQuery.bind(this);
    this.receiveResultsPageNumber = receiveResultsPageNumber.bind(this);
  }

  fetchMovies(searchQuery) {
    fetch(`http://www.omdbapi.com/?s=${searchQuery}&page=1&apikey=edd66bb`)
      .then(function(response) {
        return response.json();
      })
      .then(body => {
        this.setState({ movies: body.Search });
        this.setState({ totalResults: body.totalResults });
      });
  }

  componentDidMount() {
    this.fetchMovies("jaws");
  }

  /// Pass props down to searchQuery
  receiveSearchQuery(searchQuery) {
    this.fetchMovies(searchQuery);
  }

  receiveResultsPageNumber(resultsPage) {
    console.log(resultsPage);
  }

  render() {
    return (
      <div className="App">
        <h1>Hello</h1>
        <Search receiveSearchQuery={this.receiveSearchQuery} />
        <Movies movies={this.state.movies} />
        <footer>
          <h4>Total results:{this.state.totalResults}</h4>
          <Pagination
            totalResults={this.state.totalResults}
            receiveResultsPageNumber={this.state.receiveResultsPageNumber}
            resultsPage={this.state.resultsPage}
          />
        </footer>
      </div>
    );
  }
}

export default App;
