import React from "react";
import Search from "./Search.js";
import Movies from "./Movies.js";
import Pagination from "./Pagination.js";

//font awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare,
  faCoffee,
  faHeart,
  faSearch
} from "@fortawesome/free-solid-svg-icons";

library.add(faCheckSquare, faCoffee, faHeart, faSearch);

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      totalResults: 0,
      resultsPage: "1",
      searchQuery: "jaws"
    };

    this.fetchMovies = this.fetchMovies.bind(this);
    this.receiveSearchQuery = this.receiveSearchQuery.bind(this);
    this.receiveResultsPageNumber = this.receiveResultsPageNumber.bind(this);
  }

  fetchMovies() {
    fetch(
      `http://www.omdbapi.com/?s=${this.state.searchQuery}&page=${
        this.state.resultsPage
      }&apikey=edd66bb`
    )
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
    this.setState(
      {
        searchQuery: searchQuery
      },
      //() => this.fetchMovies()
      () => this.fetchMovies()
    );
  }

  receiveResultsPageNumber(resultsPage) {
    this.setState(
      {
        resultsPage: resultsPage
      },
      //() => this.fetchMovies()
      () => this.fetchMovies()
    );
  }

  render() {
    return (
      <div className="App">
        <h1>Hello</h1>
        <FontAwesomeIcon icon="coffee" />
        <FontAwesomeIcon icon="heart" />
        <Search
          receiveSearchQuery={this.receiveSearchQuery}
          searchQuery={this.state.searchQuery}
        />
        <Movies movies={this.state.movies} />
        <footer>
          <h4>Total results:{this.state.totalResults}</h4>
          <Pagination
            totalResults={this.state.totalResults}
            receiveResultsPageNumber={this.receiveResultsPageNumber}
          />
        </footer>
      </div>
    );
  }
}

export default App;
