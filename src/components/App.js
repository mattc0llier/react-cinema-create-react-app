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

      this.state = { notes: [], currentNote: { noteContent: "" }, noteID: 0, noteContent: "" }

      this.handleNoteSave = this.handleNoteSave.bind(this)
      //this.incrementNoteID = this.incrementNoteID.bind(this)
      this.receiveCurrentNote = this.receiveCurrentNote.bind(this)
      this.receiveCreateNewNote = this.receiveCreateNewNote.bind(this)
    };

    componentDidMount(){
      const notes = window.localStorage.getItem('notes');
      const notesArr = notes ? JSON.parse(notes) : [];

     this.setState({
       notes: notesArr
      });
    }


    handleNoteSave(savedNoteContent){
      ///// set to note noteContent
      //// if exisiting id -> update existing // note
      /// if new incrementNoteID
      //// update state of notes

      if(!this.state.currentNote.noteID){
        this.setState({ noteID: this.state.noteID + 1 })

        const newNote = {
          noteID: this.state.noteID,
          noteContent: savedNoteContent
        }
        this.setState({
          notes: this.state.notes.concat(newNote)
        }), () => window.localStorage.setItem('notes', JSON.stringify(this.state.notes));

        this.setState({
          currentNote: newNote
        })


      }



    }

    // incrementNoteID(){
    //   this.setState({ noteID: this.state.noteID + 1 })
    // }

    receiveCurrentNote(selectedNote){

      this.setState({
        currentNote: selectedNote
      })
    }

    receiveCreateNewNote(){
      console.log("new note", this.state.currentNote)
      this.setState(this.state.currentNote: {})
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
