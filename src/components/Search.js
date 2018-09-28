import React from "react";

class Search extends React.Component {
  constructor() {
    super();

    this.state = { searchQuery: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    //console.log(event.target.value);
    this.setState({
      searchQuery: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.searchQuery);
    this.props.receiveSearchQuery(this.state.searchQuery);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Search:</label>
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
