import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Search extends React.Component {
  constructor() {
    super();

    this.state = { searchInput: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    //console.log(event.target.value);
    this.setState({
      searchInput: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.receiveSearchQuery(this.state.searchInput);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Search<FontAwesomeIcon icon="search" />:
          </label>
          <input
            name="movie"
            placeholder="Search Movies"
            autoComplete="movie"
            onChange={this.handleChange}
          />
          <button>Go</button>
        </form>
      </div>
    );
  }
}

export default Search;
