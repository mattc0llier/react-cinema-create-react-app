import React from "react";

class Note extends React.Component {
  constructor(props){
    super(props)

    this.state = { noteContent: this.props.currentNote.noteContent }

    this.handleNoteContentChange = this.handleNoteContentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState({ noteContent: nextProps.currentNote.noteContent })
  }

  handleNoteContentChange(event){
    this.setState({
      noteContent: event.target.value
    })
  }

  handleSubmit(event){
    event.preventDefault();

    this.props.handleNoteSave(this.state.noteContent)
  }

  handleDeleteClick(event){
    this.props.receiveDeleteClick(this.props.currentNote)
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

          <button type="submit">Save</button><p>Last updated {timeDifferenceInHours}h ago</p>
        </form>
        <button type="click" onClick={this.handleDeleteClick}>Delete</button>
        <button type="click" >Display time series</button>
      </div>
    )
  }
}

export default Note
