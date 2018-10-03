import React from "react";

class NotePreview extends React.Component {
  constructor(){
    super()

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event){
    this.props.receiveCurrentNote(this.props.note)
  }



  render(){
    return(
      <li>
        <div onClick={this.handleClick}><p>{this.props.note.noteContent}</p></div>

      </li>
    )
  }
}

export default NotePreview;
