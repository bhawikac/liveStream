import React from "react";


class GrayBack extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <div style={{ zIndex: 0, backgroundColor: "#fff" }}>
          <div style={{ zIndex: "100000", backgroundColor: "red" }}>
            <div style={{ zIndex: "1000000", marginTop: "-200px" }}>
              {this.props.children}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default GrayBack;