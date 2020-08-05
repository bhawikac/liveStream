import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

class Spinner extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <div style={{textAlign:"center"}} className="classes-spinner">
              {!this.props.areCards && (
                <CircularProgress
                  label="lable"
                  size={70}
                  // className={this.props.classes.progress}
                  thickness={5}
                  color="secondary"
                />
              )}
        </div>
    );
  }
}

export default Spinner;
