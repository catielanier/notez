import React from "react";
import Header from "./components/Header";
import "./App.css";

class App extends React.Component {
  state = {
    user: null,
    role: null
  };
  changeState = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  render() {
    return (
      <div className="App">
        <Header />
      </div>
    );
  }
}

export default App;
