import React from "react";
import cx from 'classnames';

class Note extends React.Component {
  constructor(props){
    super(props)

    this.state = { noteContent: this.props.currentNote.noteContent }

    this.handleNoteContentChange = this.handleNoteContentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.autoSave = this.autoSave.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleNotebookClick = this.handleNotebookClick.bind(this);
    this.handleNoteClick = this.handleNoteClick.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState({ noteContent: nextProps.currentNote.noteContent })
  }

  handleNoteContentChange(event){
    this.setState({
      noteContent: event.target.value
    })
    //currently auto saves on everytime
    window.setTimeout(this.autoSave, 3000);
  }

  handleSubmit(event){
    event.preventDefault();

    this.props.handleNoteSave(this.state.noteContent)
  }

  handleDeleteClick(event){
    this.props.receiveDeleteClick(this.props.currentNote)
  }

  autoSave(){
    console.log("this note is saved");
    this.props.handleNoteSave(this.state.noteContent)
  }

  handleMenuClick(){
    this.props.receiveHandleMenuClick()
  }

  handleNotebookClick(event){
    this.props.receiveHandleNotebookClick()
  }

  handleNoteClick(event){
    this.props.receiveHandleNoteClick()
  }

  render(){

    const noteUpdatedTimeStamp = this.props.currentNote.noteUpdatedAt
    const currentDateTimeStamp = Date.now()
    const timeDifference = currentDateTimeStamp - noteUpdatedTimeStamp

    const timeDifferenceInHours = (timeDifference / 1000 / 60 / 60).toFixed(1);

    return(
      <div className="note">
        <form id="note__form" onSubmit={this.handleSubmit}>

          <textarea
            className="note__textarea"
            onChange={this.handleNoteContentChange}
            name="textarea"
            autoComplete="on" form="note__form" wrap="soft"
            placeholder="What are you thinking?" value={this.state.noteContent}
            rows="30"
          >

            </textarea>

          {/* <button type="submit">Save</button> */}
          {/* <p>Last updated {timeDifferenceInHours}h ago</p> */}
        </form>
        <div className="note__buttons">
          <button type="click" onClick={this.handleDeleteClick}>Delete</button>
          <br />

          <button type="click" onClick={this.handleMenuClick}>menu view</button>
          <button type="click" onClick={this.handleNotebookClick}>notebook view</button>
          <button type="click" onClick={this.handleNoteClick}>note view</button>
        </div>

      </div>
    )
  }
}

export default Note
