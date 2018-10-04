import React from "react";

class Note extends React.Component {
  constructor(props){
    super(props)

    this.state = { noteContent: this.props.currentNote.noteContent }

    this.handleNoteContentChange = this.handleNoteContentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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



  render(){
    return(
      <div className="note">
        <form id="note__form" onSubmit={this.handleSubmit}>

          <textarea onChange={this.handleNoteContentChange} name="textarea"
            autoComplete="on" form="note__form" wrap="soft"
            placeholder="What are you thinking?" value={this.state.noteContent}>

            </textarea>

          <button type="submit">Save</button>
        </form>
        <button type="click">Delete</button>
      </div>
    )
  }
}

export default Note
