import React from "react";

class Pagination extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    console.log("button number:" + event.target.innerHTML);
    this.props.receiveResultsPageNumber(event.target.innerHTML);
  }

  /// Generate button for Pagination

  render() {
    const pageNumbers = this.props.totalResults / 10;
    const numberOfButtons = Math.ceil(pageNumbers);
    const buttons = [];
    for (let p = 1; p <= numberOfButtons; p++) {
      buttons.push(
        <button key={p} onClick={this.handleClick}>
          {p}
        </button>
      );
    }

    return <div>{buttons}</div>;
  }
}

export default Pagination;
