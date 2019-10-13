import React from "react";
import {
  Container,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Button
} from "@material-ui/core";
import Select from "react-select";
import axios from "axios";
import { getToken } from "../services/tokenService";

class QuickAddGameNote extends React.Component {
  state = {
    filter: "",
    note: "",
    universal: false,
    loading: false,
    success: true,
    error: null
  };

  setFilter = e => {
    const filter = e.value;
    this.setState({
      filter
    });
  };

  handleCheck = e => {
    const universal = !this.state.universal;
    this.setState({
      universal
    });
  };

  setNote = e => {
    const note = e.target.value;
    this.setState({
      note
    });
  };

  postNote = async e => {
    e.preventDefault();
    const { filter, note } = this.state;
    const { myCharacter, opponentCharacter, game, user } = this.props;
    const token = await getToken();
  };

  render() {
    return (
      <div className="quick-add">
        <Container>
          <Typography variant="h5">Quick Add:</Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.universal}
                onChange={this.handleCheck}
                value={this.state.universal}
                color="primary"
              />
            }
            label="This note should be across all opponents."
          />
          <Typography variant="h6">New note filter:</Typography>
          <Select
            options={this.props.filters.map(filter => {
              return {
                label: filter.name,
                value: filter._id
              };
            })}
            onChange={this.setFilter}
          />
          <Typography variant="h6">Note:</Typography>
          <TextField
            multiline
            name="note"
            value={this.state.note}
            onChange={this.setNote}
          />
          <Button onClick={this.postNote} variant="contained" color="primary">
            Create Note
          </Button>
        </Container>
      </div>
    );
  }
}

export default QuickAddGameNote;
