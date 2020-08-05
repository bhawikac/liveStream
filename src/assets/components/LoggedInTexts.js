import React from "react";
import { Translate } from "../../utils/Translate";
import { Avatar, Grid, Button, Typography } from '@material-ui/core';
import AccountButtonDotsMobile from "./AccountButtonDotsMobile";
import Routes from '../../components/Router/Routes'
const avatarImg = require("../images/me.jpg")

class LoggedInTexts extends React.Component {
  componentDidMount() { }
  render() {
    return (
      <React.Fragment>
        <div className="loginButtonHolder">
          <Grid container justify="flex-end" alignItems="center">
          {/* <Grid item>
              <a
                className={
                  this.props.history.location.pathname == "/connect"
                    ? `secondarycolor-headerLinks-fitness`
                    : "headerLinks-fitness"
                }
                onClick={() => {
                  this.props.history.push({ pathname: "/connect" });
                }} style={{marginLeft:"0"}}
              >
                <Typography variant="body2" className="top-label btn-default">{Translate({ id: "club.Id" })}</Typography>
              </a>
            </Grid> */}
            <Grid item>
              <a
                className={
                  this.props.history.location.pathname == Routes.classListViewRoute
                    ? `secondarycolor-headerLinks-fitness`
                    : "headerLinks-fitness"
                }
                onClick={() => {
                  this.props.history.push({ pathname: Routes.classListViewRoute });
                }}
              >
                <Typography variant="button">{Translate({ id: "footer.home" })}</Typography>
              </a>
            </Grid>
            <Grid item>
              <a
                className={
                  this.props.history.location.pathname == Routes.recentActivityRoute
                    ? `secondarycolor-headerLinks-fitness`
                    : "headerLinks-fitness"
                }
                onClick={() => {
                  this.props.history.push({ pathname: Routes.recentActivityRoute });
                }}
              >
                <Typography variant="button">{Translate({ id: "ClassListViews.MyActivity" })}</Typography>
              </a>
            </Grid>
            <Grid item>
              <a
                className={
                  this.props.history.location.pathname == Routes.favClassRoute
                    ? `secondarycolor-headerLinks-fitness`
                    : "headerLinks-fitness"
                }
                onClick={() => {
                  this.props.history.push({ pathname: Routes.favClassRoute });
                }}
              >
                <Typography variant="button">{Translate({ id: "ClassListViews.FavTitle" })}</Typography>
              </a>
            </Grid>
            <Grid item>
              <a
                className={
                  this.props.history.location.pathname == Routes.searchRoute
                    ? `secondarycolor-headerLinks-fitness`
                    : "headerLinks-fitness"
                }
                style={{
                  marginRight: "10px"
                }}
                onClick={() => {
                  this.props.history.push({ pathname: Routes.searchRoute });
                }}
              >
                <Typography variant="button">{Translate({ id: "ClassListViews.Search" })}</Typography>
              </a>
            </Grid>
            <Grid item>
              <Avatar style={{cursor :"pointer"} }alt="Travis Howard"
                // src={avatarImg}
                onClick={() => {
                  this.props.history.push({ pathname: "/user/account" });
                }}
              />
            </Grid>
          </Grid>
        </div>

        <div className="loginButtonHolderMobile pull-right">
          <Grid container justify="flex-end" alignItems="center">
            {/* <Grid item style={{ paddingTop: "7px", paddingRight: "10px" }}>
              <img
                className=""
                src={require("../images/more.svg")}
                onClick={() => {
                  this.props.history.push({ pathname: "/" });
                }}
              />
            </Grid> */}
            <Grid item>
              <Avatar alt="Travis Howard"
                // src={avatarImg}
                onClick={() => {
                  this.props.history.push({ pathname: "/user/account" });
                }}
                />
            </Grid>
                <AccountButtonDotsMobile></AccountButtonDotsMobile>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}
export default LoggedInTexts;
