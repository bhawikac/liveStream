import React from "react";
import { Grid } from '@material-ui/core';

export default function LoggedInIcons(props)  {
  // componentDidMount() { }
  // render() {
    return (
      // <div className="PlayerButtonHolder">
      //   <img
      //     className="playerButtonShape"
      //     src={require("../images/recent.svg")}
      //     onClick={() => {
      //       this.props.history.push({ pathname: "/ondemand/recent" });
      //     }}
      //   />
      //   <img
      //     className="playerButtonShape"
      //     src={require("../images/fav.svg")}
      //     onClick={() => {
      //       this.props.history.push({ pathname: "/ondemand/fav" });
      //     }}
      //   />
      //   <img
      //     className="playerButtonShape"
      //     src={require("../images/searchGlass.svg")}
      //     onClick={() => {
      //       this.props.history.push({ pathname: "/ondemand/search" });
      //     }}
      //   />
      //   <img
      //     style={{ height: "24px", width: "25px" }}
      //     className="playerButtonShape"
      //     src={require("../images/userprofile.svg")}
      //     onClick={() => {
      //       this.props.history.push({ pathname: "/user/account" });
      //     }}
      //   />
      // </div>
      <div >
        <Grid container className="tripleDotsPage" onClick={() => {
          props.history.push({ pathname: "/signup" });
        }}>
          <Grid item >SignUp</Grid>
          <Grid item><img
            className=""
            src={require("../../assets/images/RightArrow.svg")}
          /></Grid>
        </Grid>
        <div >
            <Grid container className="tripleDotsPage" onClick={() => {
                    props.history.push({ pathname: "/signup" });
                }}>
                <Grid item >SignUp</Grid>
                <Grid item><img
                    className=""
                    src={require("../../assets/images/RightArrow.svg")}
                /></Grid>
            </Grid>

        </div>

      </div>
    );
  }
// }
// export default LoggedInIcons;
