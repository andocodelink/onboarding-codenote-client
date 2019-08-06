import React, { Component } from "react";
import { API, Storage } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import './index.css';
import LoaderButton from '../../components/LoaderButton';
import config from '../../config';
import { s3Upload } from '../../libs/awsLib';

class NoteForm extends Component {
  constructor(props) {
    super(props);

    this.file = null;
    this.state = {
      isAdding: null,
      content: ""
    };
  }

  addNote(newNote) {
    return API.post("notes", "/notes", { body: { attachment: newNote.attachment, content: newNote.content }});
  }

  validateForm() {
    return this.state.content.length > 0;
  }

  formatFilename(str) {
    return str.replace(/^\w+-/, "");
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleFileChange = event => {
    this.file = event.target.files[0];
  }

  handleSubmit = async event => {
    event.preventDefault();

    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE/1000000} MB.`);
      return;
    }

    this.setState({ isAdding: true });

    let attachment;
    try {
      if (this.file) {
        attachment = await s3Upload(this.file);
      }

      await this.addNote({
        content: this.state.content,
        attachment: attachment ? attachment : 'No Attachment'
      })

      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isAdding: false });
    }
  }

  render() {
    return (
      <div className="note-form">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="content">
            <FormControl
              onChange={this.handleChange}
              value={this.state.content}
              componentClass="textarea"
            />
          </FormGroup>
          <FormGroup controlId="file">
            <ControlLabel>Attachment</ControlLabel>
            <FormControl onChange={this.handleFileChange} type="file" />
          </FormGroup>
          <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isAdding}
            text="Create"
            loadingText="Creating..."
          />
        </form>
      </div>
    );
  }
}

export default NoteForm
