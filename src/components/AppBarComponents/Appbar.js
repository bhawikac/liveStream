import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Logo from "../Logo/Logo";
import AppBar from "@material-ui/core/AppBar";
import { isMobile } from "react-device-detect";
import AccountButtons from "../../assets/components/AccountButtons";
import LoggedInIcons from "../../assets/components/LoggedInIcons";
import LoggedInTexts from "../../assets/components/LoggedInTexts";
import { withStyles } from '@material-ui/core/styles';
const config=require("../../assets/config.json");
const style = {
  appbar: {
    boxShadow: '0 2px 100px 0 rgba(0, 0, 0, 0.2)',
  },
  headHeight: {
    ['@media (min-width:780px)']: {
      height: "96px"
    }
  },
  margin: {
    ['@media (min-width:780px)']: {
      marginTop: '15px',
      marginBottom: '15px'
    },
    paddingLeft: "0px",
    paddingRight: "0px",
  }
}


class Appbar extends React.Component {
  render() {
    const { classes } = this.props;
    return (
     
      <AppBar
        position="static" color={config.barColor==="#ffffff" ? "transparent": "primary"}
        className="m-b-32 m-b-xs-20"
      >
         <div className="page-container full-width">
           <Toolbar className={classes.margin} style={{
          justifyContent: "space-between"
        }} >
          <Logo />
          {/* <div className="flex" /> */}
          {this.props.isAuthenticated &&
            <LoggedInTexts history={this.props.history} />
          }

          {!this.props.isAuthenticated &&
            (<div className="login-panel">
              <AccountButtons history={this.props.history} />
            </div>
            )}
        </Toolbar>        
      </div>
      </AppBar>
    );
  }
}


export default withStyles(style)(Appbar) 
