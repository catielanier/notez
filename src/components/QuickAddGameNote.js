import React from "react";
import axios from "axios";

class QuickAddGameNote extends React.Component {
  state = {
    filter: "",
    note: "",
    universal: false,
    loading: false,
    success: true,
    error: null
  };

  render() {
    return (
      <div className="quick-add">
        <p>Quick Add</p>
      </div>
    );
  }
}

export default QuickAddGameNote;
