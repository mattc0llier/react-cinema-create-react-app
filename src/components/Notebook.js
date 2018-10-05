import React from "react";
import NotePreview from "./NotePreview.js"
import Search from "./Search.js"
import cx from 'classnames';

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
        <div className="notebook__actions">
          <Search receiveSearchInput={this.props.receiveSearchInput}/>
          <button onClick={this.handleNewNoteClick}>New note</button>
        </div>

        <ul>
          {notes.map( note => {
            return <NotePreview key={note.noteID} note={note} receiveCurrentNote={this.props.receiveCurrentNote}/>
          })}
        </ul>
        <div className="notebook__info">
          <p>{this.props.cumulativeNoteID} notes</p>
          <button onClick={this.handleClearAllClick}>Clear localStorage</button>
        </div>

      </div>
    )
  }
}

export default Notebook
