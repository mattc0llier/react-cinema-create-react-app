import React from "react";

class Search extends React.Component {
  constructor(){
    super()

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    console.log(event.target.value);
    this.props.receiveSearchInput(event.target.value)
  }

  render(){
    return(
      <form>
        <input type="search" onChange={this.handleChange}/>
      </form>
    )
  }
}

export default Search
