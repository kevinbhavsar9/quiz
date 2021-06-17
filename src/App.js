import Quiz2 from "./Components/Quiz2";
import Result from "./Components/Results";
import { connect } from "react-redux";

import React, { Component } from "react";

class App extends Component {
  render() {
    return (
      <div className="App">
        {" "}
        <Quiz2 />
      </div>
    );
  }
}
function mapPropsToState(state) {
  return {
    data: state.data,
  };
}

export default connect(mapPropsToState)(App);
