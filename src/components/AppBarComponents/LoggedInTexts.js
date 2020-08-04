import React from "react";
import Routes from '../Router/Routes'

class LoggedInTexts extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <div className="loginButtonHolder">
        <a
          className={
            this.props.history.location.pathname == Routes.recentActivityRoute
              ? `secondarycolor-headerLinks`
              : "headerLinks"
          }
          onClick={() => {
            this.props.history.push({ pathname: Routes.recentActivityRoute });
          }}
        >
          MY ACTIVITY
        </a>
        <a
          className={
            this.props.history.location.pathname == Routes.favClassRoute
              ? `secondarycolor-headerLinks`
              : "headerLinks"
          }
          onClick={() => {
            this.props.history.push({ pathname: Routes.favClassRoute });
          }}
        >
          FAVOURITES
        </a>
        <a
          className={
            this.props.history.location.pathname == Routes.searchRoute
              ? `secondarycolor-headerLinks`
              : "headerLinks"
          }
          onClick={() => {
            this.props.history.push({ pathname: Routes.searchRoute});
          }}
        >
          SEARCH
        </a>
        <a
          className={
            this.props.history.location.pathname == "/user/account"
              ? `secondarycolor-headerLinks`
              : "headerLinks"
          }
          onClick={() => {
            this.props.history.push({ pathname: "/user/account" });
          }}
        >
          ACCOUNT
        </a>
      </div>
    );
  }
}
export default LoggedInTexts;
