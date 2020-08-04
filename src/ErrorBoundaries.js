import React from "react";

class ErrorBoundaries extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStatefromError(err) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something Went Wrong</h1>;
    }
    return this.props.children;
  }
}
export default ErrorBoundaries;
