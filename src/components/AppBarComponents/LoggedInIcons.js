import React from "react";

class LoggedInIcons extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <div className="PlayerButtonHolder">
        <img
          className="playerButtonShape"
          src={require("../../assets/images/recent.svg")}
          onClick={() => {
            this.props.history.push({ pathname: "/ondemand/recent" });
          }}
        />
        <img
          className="playerButtonShape"
          src={require("../../assets/images/fav.svg")}
          onClick={() => {
            this.props.history.push({ pathname: "/ondemand/fav" });
          }}
        />
        <img
          className="playerButtonShape"
          src={require("../../assets/images/searchGlass.svg")}
          onClick={() => {
            this.props.history.push({ pathname: "/ondemand/search" });
          }}
        />
        <img
          style={{ height: "24px", width: "25px" }}
          className="playerButtonShape"
          src={require("../../assets/images/userprofile.svg")}
          onClick={() => {
            this.props.history.push({ pathname: "/user/account" });
          }}
        />
      </div>
    );
  }
}
export default LoggedInIcons;
