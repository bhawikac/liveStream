import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import { connect } from "react-redux";
import { Translate } from "../../utils/Translate";
import { Typography, Grid } from "@material-ui/core";
import SubscriptionPricing from "../../components/Subscription/SubscriptionPricing";
import { GetUserSubscription } from "../../store/actions/subscription";
import withStyles from "@material-ui/core/styles/withStyles";
import withMobileDialog from "@material-ui/core/withMobileDialog";
var config = require("../../assets/config.json");

class Subscribe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPlan: "",
      selectedProduct: "",
      code: "",
      errorMessage: "",
      isDialogOpen: false,
      isSubscriptionActive: false
    };

  }

  componentDidMount() {
    if (this.props.userSubscription === null) {
      this.props.loadUserSubscription();
    }
    this.setState({ isSubscriptionActive: this.props.isSubscriptionActive })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isSubscriptionActive !== this.props.isSubscriptionActive) {
      this.setState({ isSubscriptionActive: this.props.isSubscriptionActive })
    }

  }


  render() {
    const { classes, ...props } = this.props

    if (this.state.isSubscriptionActive) {
      this.props.history.push({ pathname: "/user/account" });
    }

    return (
      <div className="page-container">
        <Grid container>

          <div className="browse-collection-menu">
            {config.AccessCodeMandatory !== true ? (
              <div>
                <Grid item>
                  <Typography variant="h1" className="m-t-55">
                    {Translate({ id: "Subscription.Title" })}
                  </Typography>
                </Grid>
                <div className="subscriptionTagline subText">
                  <Typography variant="h6">
                    {Translate({ id: "Subscription.SelectSubscription" })}
                  </Typography>
                </div>
                <div className="m-t-40">
                  <SubscriptionPricing
                    showButton={true}
                    onSelectSubscription={this.selectSubscription}
                  />
                </div>
              </div>
            ) : (
                <div className="subText m-t-55">
                  <Typography variant="h6">
                    {Translate({
                      id: "Subscription.SubscriptionExpiredText",
                      values: {
                        email: <span
                        style={{
                          color: localStorage.getItem("clientcolor"),
                          paddingLeft: "5px",
                          paddingRight: "5px",
                        }}
                      >
                        {config.supportEmail}
                      </span>
                      }})}

                  </Typography>
                </div>
              )
            }
          </div>
        </Grid>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    userSubscription: state.subscription.userSubscripton,
    isSubscriptionActive: state.subscription.isSubscriptionActive
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUserSubscription: () => dispatch(GetUserSubscription()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter((Subscribe)));


