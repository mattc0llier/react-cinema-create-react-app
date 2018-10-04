import React from "react";
import Note from "./Note.js";
import Notebook from "./Notebook.js";
import Menu from "./Menu.js";

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

      this.state = { notes: [], currentNote: { noteContent: "" }, cumulativeNoteID: 0, noteContent: "" }

      this.handleNoteSave = this.handleNoteSave.bind(this)
      //this.incrementNoteID = this.incrementNoteID.bind(this)
      this.receiveCurrentNote = this.receiveCurrentNote.bind(this)
      this.receiveCreateNewNote = this.receiveCreateNewNote.bind(this)
      this.createNewNote = this.createNewNote.bind(this)
    };

    componentDidMount(){
      const notes = window.localStorage.getItem('notes');
      const notesArr = notes ? JSON.parse(notes) : [];

     this.setState({
       notes: notesArr
      });
    }

    createNewNote(savedNoteContent){
      console.log('createNewNote reached', savedNoteContent);
      console.log('createNewNote currentNote', this.state.currentNote);
      console.log('cumulativeNoteID on createNew', this.state.cumulativeNoteID)

      this.setState({ cumulativeNoteID: this.state.cumulativeNoteID + 1 })


      const newNote = {
        noteID: this.state.cumulativeNoteID,
        noteContent: savedNoteContent
      }

      console.log('newNOte', newNote)

      this.setState({
        notes: this.state.notes.concat(newNote)
      }), () => window.localStorage.setItem('notes', JSON.stringify(this.state.notes));

      this.setState({
        currentNote: newNote
      })
    }


    handleNoteSave(savedNoteContent, createNewNote){

      console.log('Saved note content', savedNoteContent);
      console.log('currentNote on saved', this.state.currentNote);
      console.log('cumulativeNoteID on saved', this.state.cumulativeNoteID)


      const editingIDExisting = this.state.currentNote.noteID;

      //Check if note has existing NoteID
      if (editingIDExisting) {
        //Edit existing note
        console.log('editingIDExisting reached');
        //Map over all existing notes, find existing note equals currentNote.noteID and update NoteConetnt then assign tthis back as the overall notes state.
        this.setState({
          notes: this.state.notes.map(note => {
            if (note.noteID === this.state.currentNote.noteID) {
              return {
                noteID: note.noteID,
                noteContent: savedNoteContent
              }
            } else {
              return note;
            }
          })
        })
      } else {
        //Create a new note with an ID
        this.createNewNote(savedNoteContent)
      }
    }

    receiveCurrentNote(selectedNote){
      console.log('Note slected to edit', selectedNote);
      this.setState({
        currentNote: selectedNote
      })
      console.log('Note slected now currentNote', this.state.currentNote);
    }

    receiveCreateNewNote(){
      console.log("new note", this.state.currentNote)
      this.setState({currentNote: { noteContent: "" }})
      console.log("new note after", this.state.currentNote)
    }

  render() {
    return (
      <div className="App">
        <Menu />
        <Notebook notes={this.state.notes} receiveCurrentNote={this.receiveCurrentNote} receiveCreateNewNote={this.receiveCreateNewNote}/>
        <Note
          currentNote={this.state.currentNote}
          handleNoteSave={this.handleNoteSave}
        />
      </div>
    );
  }
}

export default App;
