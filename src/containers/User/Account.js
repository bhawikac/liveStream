import React, { Component } from "react";
import PageTitle from "../../components/PageTitle";
import { Grid, Typography, Fade } from "@material-ui/core";
import { Translate } from "../../utils/Translate";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  GetUserSubscription,
  CancelSubscription,
  ResumeSubscription,
} from "../../store/actions/subscription";
import { GetUserDetail } from "../../store/actions/auth";
import { logout } from "../../store/actions/auth";
import moment from "moment";
import { getUserActiveSubscription } from "../../store/selectors/subscription";
import CustomDialog from "../../components/Modal/Modal";
import Spinner from "../../components/spinner/spinner";
import { SubscriptionProductType } from "../../utils/constants";
// import CircularProgress from "@material-ui/core/CircularProgress";
const config = require('../../assets/config.json');

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDialogOpen: false,
      loading: true
    }
  }

  handleDialog = () => {

    this.setState({

      isDialogOpen: true,
    })
  }

  handleDialogClose = () => {
    this.setState(
      {
        isDialogOpen: false,
      }
    )
  }

  logoutUser = () => {
    this.props.onLogout();
    window.location.href = "/";
  };

  componentDidMount() {
    // if (this.props.userDetail === null) {
    this.props.loadUserDetail();
    // }
    this.props.loadUserSubscription();

    if (!this.props.isAuthenticated) {
      this.props.history.push({ pathname: "/signin" });
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.userDetail !== this.props.userDetail) {
      this.setState({ loading: false })
    }
  }

  checkUserSubscripton = () => {
    let msg = "";
    var userActiveSubscription = this.props.userActiveSubscription;
    if (userActiveSubscription != null) {
      console.log(userActiveSubscription);
      if (
        userActiveSubscription.Status == "trialing"
      ) {
        msg = Translate({ id: "Subscription.FreeTrialActiveMsg" });
        //  msg = "You are currently under the trail period of " + userActiveSubscription.plan.intervalCount + " days. Ending on " + moment(userActiveSubscription.subscription.trialPeriodEnd).format('Do MMM YYYY') + " .";
      } else {
        if (userActiveSubscription.subscription.canceledAt != null) {
          if (userActiveSubscription.subscription.cancelAtPeriodEnd == true) {
            //      msg = "Your current subscription will end by " + moment(userActiveSubscription.subscription.currentPeriodEnd).format('Do MMM YYYY') + " . Re-activate your subscription to continue accessing all content.  "
            msg = Translate({
              id: "Subscription.CanceledSubscriptionMessage",
              values: {
                subEndDate: moment(
                  userActiveSubscription.subscription.currentPeriodEnd
                ).format("Do MMM YYYY"),
              },
            });
            this.buttonType = "resume";
          }
        } else {
          if (
            userActiveSubscription.subscription.isFreeAccessSubscription != true
          ) {
            msg = Translate({
              id: "Subscription.ActiveSubscriptionMessage",
              values: {
                currency: config.currency,
                amount: userActiveSubscription.plan.amount,
                duration: userActiveSubscription.plan.interval,
              },
            });
            this.buttonType = "cancel";
          } else {
            msg = Translate({ id: "Subscription.FreeAccessSubscription" });
          }
        }
      }
    } else {
      msg = Translate({ id: "Subscription.NoActiveSubscription" });
    }
    return msg;
  };

  CancelUserSubscription = () => {
    this.props.cancelUserSubscription(
      this.props.userActiveSubscription.subscription.subscriptionTag
    );
  };
  //not working as if now
  ReactivateUserSubscription = () => {
    this.props.reactivateUserSubscription(
      this.props.userActiveSubscription.subscription.subscriptionTag,
      this.props.userActiveSubscription.plan.tag,
      this.props.userActiveSubscription.plan.productId
    );
  };

  changeEmailClickHandler = () => {
    this.props.history.push({
      pathname: "/user/update",
      state: { updateItem: "email" },
    });
  };

  editProfileClickHandler = () => {
    this.props.history.push({
      pathname: "/user/update",
      state: { updateItem: "name" },
    });
  };

  CancelUserSubscription = () => {
    this.props.cancelUserSubscription(
      this.props.userSubscription.subscriptionTag
    );
  };

  render() {
    let subscriptionStatus = ''
    let showCancelbutton = false

    if (this.props.userSubscription != null) {

      if (this.props.userSubscription.status == "trialing") {
        if (this.props.userSubscription.canceledAt != null) {
          if (this.props.userSubscription.cancelAtPeriodEnd == true) {
            subscriptionStatus = Translate({
              id: "Subscription.CanceledSubscriptionMessage",
              values: {
                subEndDate: moment(
                  this.props.userSubscription.currentPeriodEnd
                ).format("Do MMM YYYY"),
              },
            });
          }
        }
        else {
          showCancelbutton = true
          subscriptionStatus = Translate({
            id: "Subscription.FreeTrialActiveMsg"
          })
        }
      }
      else if (this.props.userSubscription.status == "active") {
        if (this.props.userSubscription.canceledAt != null) {
          if (this.props.userSubscription.cancelAtPeriodEnd == true) {
            showCancelbutton = false
            subscriptionStatus = Translate({
              id: "Subscription.CanceledSubscriptionMessage",
              values: {
                subEndDate: moment(
                  this.props.userSubscription.currentPeriodEnd
                ).format("Do MMM YYYY"),
              },
            });
          }
        }
        else if (config.AccessCodeMandatory) {
          showCancelbutton = true
          subscriptionStatus = Translate({
            id: "Subscription.FreeAccessSubscription",
          });
        }
        else {
          showCancelbutton = true
          subscriptionStatus = Translate({
            id: "Subscription.ActiveSubscriptionMessage",
            values: {
              amount: this.props.userSubscription && this.props.userSubscription.amountPaid,
              duration: this.props.userSubscription && this.props.userSubscription.displayName,
              currency: config.currency
            }
          });
        }
      } else {
        subscriptionStatus = Translate({
          id: "Subscription.NoActiveSubscription",
        });
      }
    } else if (this.props.isSubscriptionActive == false) {
      subscriptionStatus = Translate({
        id: "Subscription.NoActiveSubscription",
      });
    }

    return (
      <div className="page-container">
        {/* {this.state.loading ? */}
        {/* ( */}
        <Fade
          in={this.props.loading}
          style={{
            transitionDelay: this.props.loading ? "800ms" : "0ms"
          }}
          unmountOnExit
        >
          <Spinner backColor="white" />
        </Fade>
        {/* ) : ( */}
        <Grid container spacing={0}>
          <div className="browse-collection-menu">
            <Grid item>
              <Grid item xs={12} sm={12}>
                <Typography variant="h1" className="m-b-20 m-t-55">
                  {Translate({ id: "UserAccount.Title" })}
                </Typography>
              </Grid>
              <Grid container direction="column" className="p-t-30">

                <div className="">
                  <Grid container direction='row' justify='space-between'>
                    <div >
                      <Typography variant="h2" className="subscribe-input">
                        {Translate({ id: "Profile.Title" })}
                      </Typography>
                    </div>
                    {config.showSignUpPage === false ? (<div></div>) : (
                      <Typography
                        variant='subtitle2'
                        color="secondary"
                        className="alignright valign-end makeTextClickable"
                        onClick={this.editProfileClickHandler}
                      >
                        {Translate({ id: "Actions.Edit" })}
                      </Typography>)}
                  </Grid>
                </div>
                <hr className="hrow" />
              </Grid>

              <div className="">
                <Grid
                  className="mbottom-why57 align-left"
                  item
                  xs={12}
                  sm={12}
                >
                  <Grid container spacing={0} >

                    <Grid container className="">
                      <Typography variant="body1" className="subscribe-input">
                        {this.props.userDetail != null
                          ? this.props.userDetail.firstName
                          : ""}
                      </Typography>
                      <hr className="hrow" />

                      <Typography variant="body1" className="subscribe-input">
                        {this.props.userDetail != null
                          ? this.props.userDetail.lastName
                          : ""}
                      </Typography>
                      <hr className="hrow" />
                    </Grid>
                    <Grid
                      container className=""
                    >
                      <Typography variant="body1" className="subscribe-input">
                        {this.props.userDetail != null
                          ? this.props.userDetail.emailAddress
                          : ""}
                      </Typography>
                      <hr className="hrow" />
                      <Typography variant="body1" className="subscribe-input">
                        {this.props.userDetail && this.props.userDetail.password
                          ? this.props.userDetail.password
                          : "........."}
                      </Typography>
                      <hr className="hrow" />
                    </Grid>
                  </Grid>
                </Grid>
                <div>
                  {config.isThirdPartyEnabled ?
                    null : (
                      <React.Fragment>
                        <div />
                        <Grid >
                          <div className="makeTextClickable"  >
                            <Typography variant="h3" onClick={this.logoutUser} className="button-link m-t-15 m-t-xs-15 align-left" color='secondary'>
                              {Translate({ id: "layout.LogOut" })}
                            </Typography>
                          </div>
                          <div className="clear" />
                        </Grid>
                        <Grid>
                          <div className="alignleft" >
                            <Typography variant="h2" className="m-t-40 m-t-xs-15">
                              {Translate({ id: "Subscription.Title" })}
                            </Typography>
                          </div>
                        </Grid>
                        <hr className="hrow" />
                      </React.Fragment>)
                  }
                </div>
                {config.isThirdPartyEnabled ? <div></div> : <Grid
                  className="subText m-t-15 m-t-xs-15"
                  item
                  xs={12}
                  sm={12}
                >
                  <Typography variant="h3" className="align-left text-lightgray">
                    {subscriptionStatus}
                  </Typography>
                </Grid>
                }
                <Grid container spacing={0} justify='flex-start'>
                  {showCancelbutton ? (

                    <Grid
                      className="subText m-t-5 m-t-xs-15"
                      item
                      xs={12}
                      sm={12}
                    >

                      <div
                        className="makeTextClickable alignleft"
                      >
                        <Button className="button-link"
                          onClick={this.handleDialog}>
                          {<Typography variant="h3" color='secondary'>{Translate({ id: "Actions.Cancel" })}</Typography>}

                        </Button>
                      </div>
                      <CustomDialog
                        open={this.state.isDialogOpen}
                        title={Translate({ id: "Subscription.Cancel" })}
                        heading={Translate({ id: "Subscription.CancelText" })}

                      >
                        <Grid container direction="row" className="m-t-40 m-t-xs-20 padding16">

                          <Grid item sm={6} xs={6} className="m-t-5 text-right">
                            <Button
                              onClick={this.handleDialogClose}
                              variant="contained"
                              color="secondary"
                              className="dialogBtn"
                            >

                              {<Typography variant="subtitle1">{Translate({ id: "Actions.No" })}</Typography>}

                            </Button>
                          </Grid>
                          <Grid item sm={6} xs={6} className="m-t-5 align-left">
                            <Button
                              onClick={() => { this.CancelUserSubscription(); this.handleDialogClose() }}
                              variant="contained"
                              color="secondary"
                              className="dialogBtn"
                            >
                              {<Typography variant="subtitle1">{Translate({ id: "Actions.Yes" })}</Typography>}

                            </Button>
                          </Grid>
                        </Grid>
                      </CustomDialog>
                    </Grid>
                  ) : (
                      ""
                    )}
                </Grid>
              </div>
            </Grid>
          </div>
        </Grid>
        {/* )} */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    updateUserMsg: state.auth.updateUserMsg,
    isAuthenticated: state.auth.token != "",
    errorMessage: state.subscription.errorMessage,
    userSubscription: state.subscription.userSubscripton,
    userDetail: state.auth.userDetail,
    userActiveSubscription: getUserActiveSubscription(state),
    userDetailLoading: state.auth.loading,
    loading: state.subscription.loading,
    isSubscriptionActive: state.subscription.isSubscriptionActive,

  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(logout()),
    loadUserDetail: () => dispatch(GetUserDetail()),
    loadUserSubscription: () => dispatch(GetUserSubscription()),
    cancelUserSubscription: subscriptionTag =>
      dispatch(CancelSubscription(subscriptionTag)),
    reactivateUserSubscription: (subscriptionTag, planId, productId) =>
      dispatch(ResumeSubscription(subscriptionTag, planId, productId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Account));
