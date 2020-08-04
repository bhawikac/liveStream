import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Footer from "../../components/Footer/Footer";
import { logout } from "../../store/actions/auth";
// import { getUserActiveSubscription } from "../../store/selectors/subscription";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import Appbar from "../../components/AppBarComponents/Appbar";

var themeSettings = require("../../assets/config.json");
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifyUser: false,
      NotificationText: "",
    };
  }
  logoutUser = () => {
    this.props.onLogout();
    window.location.href = "/";
  };

  state = {
    // isActiveFreeTrial: false,
    // isExpiredFreeTrial: false,
    // otherSubs: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.notifyUser !== this.props.notifyUser) {
      this.setState({
        notifyUser: this.props.notifyUser,
        NotificationText: this.props.NotificationText,
      });
    }

    // if (this.props.userSubscription == null && this.props.isAuthenticated) {
    //   // this.props.loadUserSubscription();
    // }
  }

  // componentWillReceiveProps() {
  //   this.checkTrialSubscriptionStatus();
  // }

  // checkTrialSubscriptionStatus = () => {
  //   if (this.props.userSubscription != null) {
  //     var inactiveFreeTrial = this.props.userSubscription.find(
  //       x =>
  //         x.Status !== "active" || (x.hasOwnProperty("subscription") ? (x.subscription.planTag.indexOf("trial") >= 0 &&
  //           x.subscription.status != "active") : false)
  //     );
  //     var activeFreeTrial = this.props.userSubscription.find(
  //       x =>
  //         x.Status === "active" || (x.hasOwnProperty("subscription") ? (x.subscription.planTag.indexOf("trial") >= 0 &&
  //           x.subscription.status == "active") : false)
  //     );
  //     var userActiveSubscription = this.props.userActiveSubscription;
  //     if (activeFreeTrial != null || activeFreeTrial != undefined) {
  //       this.setState({ isActiveFreeTrial: true });
  //     } else {
  //       if (
  //         userActiveSubscription == null &&
  //         (inactiveFreeTrial != null || inactiveFreeTrial != undefined)
  //       ) {
  //         this.setState({ isExpiredFreeTrial: true });
  //       }
  //     }
  //   }
  // };
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ "notifyUser": false });
  };

  render() {
    return (<div>
      <div>
        {this.state.notifyUser ? (
          //  {/* <Notification NotificationText={this.state.NotificationText} /> */}
          <Snackbar open={true} autoHideDuration={6000} onClose={this.handleClose}>
            <Alert style={{
              borderRadius: "20px",
              backgroundColor: themeSettings.secondaryColor,
              marginBottom: "40px"
            }}>
              {this.state.NotificationText}
            </Alert>
          </Snackbar>
        ) : (
            <div />
          )
        }
        {
        
            <Appbar
              history={this.props.history}
              isAuthenticated={this.props.isAuthenticated}
            />
         
        }

        <main
          style={{
            // width: window.screen.width < 1368 ? "100%" : "1210px",
            margin: "auto",
          }}
          className="mainHolder"
        >
          {this.props.children}
        </main>

      </div >

      {
       
          <div className="footerText">
            <Footer clientName={localStorage.getItem("ClientDisplayName")} />
          </div>
     
      }
    </div>
    );
  }
}
  
const mapStateToProps = state => {
  return {
    // userSubscription: state.subscription.userSubscripton,
    // userActiveSubscription: getUserActiveSubscription(state),
    isAuthenticated: state.auth.token !== "",
    notifyUser: state.auth.notifyUser,
    NotificationText: state.auth.NotificationText,
    isPlayerOn: state.onDemand.isClassStarted,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(logout()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Layout));
