import React from "react";
import Button from "@material-ui/core/Button";
import { Translate } from "../../utils/Translate";
import AppBarButtonStyle from "../style/AppBarButtonStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import { Grid, Typography } from "@material-ui/core";
import AccountButtonDotsMobile from "../components/AccountButtonDotsMobile";
import { FontStyle } from "../../utils/font";
var config = require("../config.json");

// const style = {
//   buttonLoginMobile:{ ['@media (min-width:780px)']:{
//     textTransform: 'none',
//     width: '64px',
//     height: '30px',
//     borderRadius: '15px',
//     padding: '4px 8px'
//   }
// }
// }

class AccountButtons extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="loginButtonHolder">
          <Grid container justify="flex-end" style={{ height: "inherit", alignItems: "center" }}>
            {config.showSignUpPage === false ? (<div></div>) : (
              <Grid item
                variant="contained"
                // color="secondary"
                className={this.props.classes.AccountBarButton}
                style={
                  {
                    // ...FontStyle.SFProDisplaySmall,
                    paddingRight: "16px",
                    cursor: "pointer"
                  }}
                onClick={() => {
                  this.props.history.push({ pathname: "/signup" });
                }}
              >
                <Typography variant="button">{Translate({ id: "layout.SignUp" })}</Typography>
              </Grid>)}
            <Grid item>
              <Button className={this.props.classes.loginButton}
                style={{
                  // ...FontStyle.SFProDisplaySmall,                  
                }}
                color="secondary"
                variant="contained"
                onClick={() => {
                  this.props.history.push({ pathname: "/signin" });
                }}
              >
                <Typography variant="button">
                  {Translate({ id: "layout.SignIn" })}
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </div>

        <div className="loginButtonHolderMobile pull-right">
          <Grid container justify="flex-end">

            <Grid item>
              <Button style={{
                textTransform: 'none',
                width: '64px',
                height: '30px',
                borderRadius: '15px',
                padding: '4px 8px',
                marginTop: '6px'
              }}
                color="secondary"
                variant="contained"
                onClick={() => {
                  this.props.history.push({ pathname: "/signin" });
                }}
              >
                <Typography variant="h5">
                  {Translate({ id: "layout.SignIn" })}
                </Typography>
              </Button>
            </Grid>
            <Grid item style={{ paddingTop: "7px" }}>
              {config.showSignUpPage === false ? (<div></div>) :
                // <img
                //   className=""
                //   src={require("../images/more.svg")}
                //   onClick={() => {
                //     this.props.history.push({ pathname: "/options" });
                //   }}
                // />
                <AccountButtonDotsMobile></AccountButtonDotsMobile>
              }</Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}
export default withStyles(AppBarButtonStyle)(AccountButtons);

