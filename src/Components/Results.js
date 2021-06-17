import React from "react";
import { connect } from "react-redux";

function Results(props) {
  const { count } = this.props.data;
  console.log(this.props.data);
  return (
    <div>
      <h1>Your score is {count}</h1>
    </div>
  );
}
function mapPropsToState(state) {
  return {
    data: state.data,
  };
}

export default connect(mapPropsToState)(Results);
