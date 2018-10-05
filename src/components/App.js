import React from "react";
import Note from "./Note.js";
import Notebook from "./Notebook.js";
import Menu from "./Menu.js";

import cx from 'classnames';

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

      this.state = { notes: [],
        currentNote: { noteContent: "" },
        cumulativeNoteID: 0,
        noteContent: "",
        searchInput: "",
        searchNotes: [],
        displayType: "noteView"
      }

      this.handleNoteSave = this.handleNoteSave.bind(this)
      //this.incrementNoteID = this.incrementNoteID.bind(this)
      this.receiveCurrentNote = this.receiveCurrentNote.bind(this)
      this.receiveCreateNewNote = this.receiveCreateNewNote.bind(this)
      this.createNewNote = this.createNewNote.bind(this)
      this.receiveDeleteClick = this.receiveDeleteClick.bind(this)
      this.receiveClearAllClick = this.receiveClearAllClick.bind(this)
      this.receiveSearchInput = this.receiveSearchInput.bind(this)
      this.searchNotes = this.searchNotes.bind(this)
      this.receiveHandleNoteClick = this.receiveHandleNoteClick.bind(this)
      this.receiveHandleNotebookClick = this.receiveHandleNotebookClick.bind(this)
      this.receiveHandleMenuClick = this.receiveHandleMenuClick.bind(this)
    };

    //load in notes array from localstorage on loading the page
    componentDidMount(){
      const notes = window.localStorage.getItem('notes');
      const notesArr = notes ? JSON.parse(notes) : [];
      this.setState({
        notes: notesArr
       });

      const cumulativeNoteID = window.localStorage.getItem('cumulativeNoteID');
      const updatedCumulativeNoteID = cumulativeNoteID ? JSON.parse(cumulativeNoteID) : 0;
      this.setState({
        cumulativeNoteID: updatedCumulativeNoteID
      });

      console.log('notesArr on page load', this.state.notes)
    }


    createNewNote(savedNoteContent){
      console.log('createNewNote reached', savedNoteContent);
      console.log('createNewNote currentNote', this.state.currentNote);
      console.log('cumulativeNoteID on createNew', this.state.cumulativeNoteID)

      this.setState({ cumulativeNoteID: this.state.cumulativeNoteID + 1 })


      const newNote = {
        noteID: this.state.cumulativeNoteID,
        noteContent: savedNoteContent,
        noteCreatedAt: new Date(),
        noteCreatedAtTimeStamp: Date.now(),
        noteUpdatedAt: new Date(),
        noteUpdatedAtTimeStamp: Date.now()
      }

      console.log('newNOte', newNote)

      this.setState({
        notes: this.state.notes.concat(newNote)
      },
      () => {
        window.localStorage.setItem('notes', JSON.stringify(this.state.notes))
        window.localStorage.setItem('cumulativeNoteID', JSON.stringify(this.state.cumulativeNoteID))
        console.log('notesArr on create note', this.state.notes);
      });



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
                noteContent: savedNoteContent,
                noteCreatedAt: note.noteCreatedAt,
                noteCreatedAtTimeStamp: note.noteCreatedAtTimeStamp,
                noteUpdatedAt: new Date(),
                noteUpdatedAtTimeStamp: Date.now()
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

    receiveDeleteClick(noteToDelete){
      console.log('noteToDelete', noteToDelete);

      console.log('noteToDelete', noteToDelete.noteID);
      console.log('all note objects', this.state.notes);

      const filteredNotes = this.state.notes.filter(notesObject => {
      //if noteID === deleting ID then return array with noteID object taken out
        return notesObject.noteID !== noteToDelete.noteID
      })

      this.setState({

        notes: filteredNotes
      },
      () => {
        //delete items from localStorage
        window.localStorage.setItem('notes', JSON.stringify(this.state.notes))
              //find the note with the previsous id to the deleted id.
        const newCurrentNote = this.state.notes.find( notesObject => {
            return notesObject.noteID === 0
          }
        )
        console.log(newCurrentNote);

        //setState to the new current note
        this.setState({
          currentNote: newCurrentNote
        })
        console.log('all note objects after DELETE', this.state.notes)
      })

    }

    receiveClearAllClick(){
      console.log('clear all notes');
      localStorage.clear();
    }

    receiveSearchInput(searchInput, searchNotes){
      console.log(searchInput);

      this.setState({
        searchInput: searchInput
      },
    () => this.searchNotes(searchInput))


    }

    searchNotes(searchInput){
      // reset se`rch state to clear for each key press`
      this.setState({
        searchNotes: []
      })

      const filteredNotes = this.state.notes.filter(note => {
        const termIndex = note.noteContent.indexOf(searchInput)
        console.log('index of search term', termIndex);
        return termIndex >= 0;
      })

      console.log('filteredNotes', filteredNotes);

      this.setState({
        searchNotes: filteredNotes
      })

      if(this.state.searchNotes.length){
        this.setState({
          currentNote: this.state.searchNotes[0]
        })
      }
    }

    //hande clicks and display divs if available

    receiveHandleNoteClick(){
      this.setState({
        displayType: "noteView"
      })
    }
    receiveHandleNotebookClick(){
      this.setState({
        displayType: "noteBookView"
      })
    }
    receiveHandleMenuClick(){
      this.setState({
        displayType: "menuView"
      })
    }

  render() {

    console.log('display type',this.state.displayType);



    // const favouritesExists = !!this.state.favouriteMoviesObjects;
    //
    // {favouritesExists ? (
    //       <Favourites
    //         favouriteMoviesObjects={this.state.favouriteMoviesObjects}
    //       />
    //     ) : null}

    return (
      <div className="app">
        {this.state.displayType === "menuView" ?
        <div className="menu__notebook">
          <Menu />
          <Notebook
            notes={this.state.notes}
            receiveCurrentNote={this.receiveCurrentNote}
            receiveCreateNewNote={this.receiveCreateNewNote}
            cumulativeNoteID={this.state.cumulativeNoteID}
            receiveClearAllClick={this.receiveClearAllClick}
            receiveSearchInput={this.receiveSearchInput}
            searchInput={this.state.searchInput}
            searchNotes={this.state.searchNotes}
          />
        </div>
        : null}

        {this.state.displayType === "noteBookView" ?
          <Notebook
            notes={this.state.notes}
            receiveCurrentNote={this.receiveCurrentNote}
            receiveCreateNewNote={this.receiveCreateNewNote}
            cumulativeNoteID={this.state.cumulativeNoteID}
            receiveClearAllClick={this.receiveClearAllClick}
            receiveSearchInput={this.receiveSearchInput}
            searchInput={this.state.searchInput}
            searchNotes={this.state.searchNotes}
          />
        : null}


        <Note
          currentNote={this.state.currentNote}
          handleNoteSave={this.handleNoteSave}
          receiveDeleteClick={this.receiveDeleteClick}
          searchNotes={this.state.searchNotes}
          receiveHandleNoteClick={this.receiveHandleNoteClick}
          receiveHandleNotebookClick={this.receiveHandleNotebookClick}
          receiveHandleMenuClick={this.receiveHandleMenuClick}
        />
      </div>
    );
  }
}

export default App;
