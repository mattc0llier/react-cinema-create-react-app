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

    const noteString = this.props.note.noteContent;
    const previewLength = 100;
    const previewNote = noteString.substring(0, previewLength)

    return(
      <li>
        <div onClick={this.handleClick}><p>{previewNote}</p></div>

      </li>
    )
  }
}

export default NotePreview;
