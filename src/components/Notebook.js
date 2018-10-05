import React from "react";
import NotePreview from "./NotePreview.js"
import Search from "./Search.js"

class Notebook extends React.Component {
  constructor(){
    super()

    this.handleNewNoteClick = this.handleNewNoteClick.bind(this)
    this.handleClearAllClick = this.handleClearAllClick.bind(this)
  }

  handleNewNoteClick(event){
    this.props.receiveCreateNewNote()
  }

  handleClearAllClick(event){
    console.log(event);
    this.props.receiveClearAllClick();
  }


  render(){

    console.log('search notes notebook',this.props.searchNotes);

    let notes = this.props.notes
    if(this.props.searchNotes.length){
      notes = this.props.searchNotes
    }


    return(
      <div className="notebook">
        <h2>Notebook</h2>
        <Search receiveSearchInput={this.props.receiveSearchInput}/>
        <button onClick={this.handleNewNoteClick}>New note</button>
        <ul>
          {notes.map( note => {
            return <NotePreview key={note.noteID} note={note} receiveCurrentNote={this.props.receiveCurrentNote}/>
          })}
        </ul>
        <p>{this.props.cumulativeNoteID} notes</p>

        <button onClick={this.handleClearAllClick}>Clear localStorage</button>

      </div>
    )
  }
}

export default Notebook
