import React from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";

const BarStyle = {
  height: "18px",
  width: "100%",
  padding: "0px",
  backgroundColor: "#fff",
};
const TextStyle = {
  height: "14px",
  margin: "7px auto 7px auto",
  fontSize: "10px",
  fontWeight: "bold",
  fontStyle: "normal",
  fontStretch: "normal",
  lineHeight: "normal",
  letterSpacing: "normal",
  textAlign: "center",
  color: localStorage.getItem("clientcolor"),
  textTransform: "uppercase",
};
const SpanStyle = {
  TextStyle,
  color: localStorage.getItem("clientcolor"),
};
const mapDispatchToProps = dispatch => {
  return {
    CloseNotification: () => dispatch({ type: actionTypes.CLOSE_NOTIFICATION }),
  };
};

class Notification extends React.Component {
  componentDidUpdate(prevProps) {}

  componentDidMount() {
    window.scrollTo(0, 0);
    //  if (this.props.autoCloseNotification) {
    setTimeout(this.props.CloseNotification, 10000);
    //}
  }
 
  render() {
    return (
      <div style={BarStyle}>
        <p style={TextStyle}>{this.props.NotificationText}</p>

        <img
          onClick={this.props.CloseNotification}
          className="CloseNotification"
          src={require("../../assets/images/clear_search.png")}
        />
      </div>
    );
  }
}
export default connect(
  null,
  mapDispatchToProps
)(Notification);
