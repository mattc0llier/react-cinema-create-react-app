import React from "react";
import NotePreview from "./NotePreview"

class Notebook extends React.Component {
  constructor(){
    super()

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event){
    this.props.receiveCreateNewNote()
  }


  render(){
    return(
      <div className="notebook">
        <h2>Notebook</h2>
        <ul>
          {this.props.notes.map( note => {
            return <NotePreview key={note.noteID} note={note} receiveCurrentNote={this.props.receiveCurrentNote}/>
          })}
        </ul>
        <button onClick={this.handleClick}>New note</button>
      </div>
    )
  }
}

export default Notebook
