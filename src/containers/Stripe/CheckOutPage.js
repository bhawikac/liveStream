import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import { connect } from "react-redux";
import { Translate } from "../../utils/Translate";
import { Grid, Typography, Button } from "@material-ui/core";
import {
  GetUserSubscription,
  VerifyAndPurchaseFreeSubscription,
} from "../../store/actions/subscription";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import CheckOutWrapperForm from "./CheckOutWrapperForm";
const config = require('../../assets/config.json')

const stripePromise = loadStripe(localStorage.getItem("clientStripeKey"));
var planType, amount = "", discountedAmount
class CheckOutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPlan: "",
      selectedProduct: "",
      showPayment: false,
      code: "",
      errorMessage: "",
      check: "",
      amount: "",
      showDiscounted: false,
      forever: false,

    };
    this.removeAccessCode = this.removeAccessCode.bind(this);
  }

  componentDidMount() {
    if (this.props.userSubscription === null) {
      this.props.loadUserSubscription();
    }

    if (this.props.isAuthenticated != true) {
      this.props.history.push({ pathname: "/signin" });
    }

    let planTag = null;
    let productTag = null;
    if (
      this.props.location.state != undefined ||
      this.props.location.state != null
    ) {
      planTag = this.props.location.state.selectedPlan;
      productTag = this.props.location.state.selectedProduct;
    }

    if (planTag == null || productTag == null) {
      this.props.history.push({ pathname: "/subscribe" });
    } else {
      this.setState({
        selectedPlan: planTag,
        selectedProduct: productTag,
        errorMessage: "",
      });
    }

  }

  componentDidUpdate(prevProps) {
    if (prevProps.errorMessage !== this.props.errorMessage) {

      this.setState({ errorMessage: this.props.errorMessage })
    }

  }

  //
  backButtonClick = () => {
    this.props.history.goBack();
  }
  removeAccessCode = () => {
    this.setState({ errorMessage: "", showDiscounted: false })
    console.log("Amount", this.props.location.state.amount)
    amount = this.props.location.state.amount

  }

  checkAccessCode = () => {
    this.props.getFreeAccessCodeEvent(this.state.accessCode);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.isDiscountCodeApplied !== this.props.isDiscountCodeApplied) {
      if (this.props.isDiscountCodeApplied) {
        let discountedamount = 0
        if (this.props.dicountCodeInfo) {
          if (this.props.dicountCodeInfo.percentOff !== 0) {
            let off = amount * this.props.dicountCodeInfo.percentOff / 100
            discountedAmount = (amount - off).toFixed(2)
            this.setState({ showDiscounted: true, errorMessage: "" })
          }
          else if (this.props.dicountCodeInfo.amountOff) {
            this.setState({ showDiscounted: true, errorMessage: "" })
            discountedAmount = (amount - this.props.dicountCodeInfo.amountOff).toFixed(2)
          }
          if(discountedAmount <0){
            discountedAmount = 0;
          }
        }
        if (this.props.dicountCodeInfo.duration === "forever") {
          this.setState({ forever: true })
        } else {
          this.setState({ forever: false })
        }
        console.log("DiscountedAmount", discountedAmount);
      }

    }
    if (prevProps.errorMessage !== this.props.errorMessage) {
      this.setState({ errorMessage: this.props.errorMessage })

    }
  }

  render() {

    if (this.props.location.state) {
      planType = this.props.location.state.planType,
        amount = this.props.location.state.amount
    }

    return (
      <div className="page-container">
        <img
          className="left-arrow btn-default"
          src={require("../../assets/images/arrow-down.svg")}
          onClick={this.backButtonClick}
        />
        <div className="browse-collection-menu">
          <PageTitle label={Translate({ id: "Subscription.PaymentPageTitle" })} />
          <Grid container className="m-t-55 m-b-32 p-lr-24">
            <Grid item lg={6} md={6} sm={6} xs={6} className="align-left">
              <Typography variant="subtitle2" className="m-t-15 m-t-xs-15 textCapitalize">
                {planType} {Translate({ id: `Subscription.Subscription` })}
              </Typography>
              {/* -------------Discounted invoices: 1  ----------------*/}
              {this.state.showDiscounted && !this.state.forever ?
                <Typography variant="body2" className="m-t-5 m-t-xs-15 textCapitalize text-gray">
                  {planType} {Translate({ id: `Subscription.discountInvoice` })}
                </Typography>
                : null
              }
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6} className="text-right">

              {/*------------ Line through amount--------------------------- */}
              {this.state.showDiscounted ?
                <Typography variant="subtitle2" className="m-t-15 m-t-xs-15 text-strike text-gray">
                  {`${config.currency} ${amount} `}
                </Typography>
                :
                <Typography variant="subtitle2" className="m-t-15 m-t-xs-15">
                  {`${config.currency} ${amount} `}
                </Typography>
              }
              {this.state.showDiscounted ?
                <Typography variant="subtitle2" className="m-t-15 m-t-xs-15">
                  {`${config.currency} ${discountedAmount} `}
                </Typography>
                : null}
            </Grid>
          </Grid>


          {/* {!this.props.isDiscountCodeApplied? */}
          <div className="m-t-xs-15 m-t-15">
            <span className="errorMessage">{this.state.errorMessage}</span>
          </div>
          {/*  :null} */}
          <Elements stripe={stripePromise}>
            <CheckOutWrapperForm
              selectedPlanTag={this.state.selectedPlan}
              selectedProductTag={this.state.selectedProduct}
              removeAccessCode={this.removeAccessCode}
            />
          </Elements>
          <Typography variant="body2" className="text-lightgray m-t-15 m-t-xs-15 m-b-10">{Translate({ id: "Subscription.cancelPaymentMsg" })}</Typography>
          <img src={require("../../assets/images/powered-by-stripe-3-x.jpg")} />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    subscriptionProduct: state.subscription.subscriptionProduct,
    isAuthenticated: state.auth.token != "",
    errorMessage: state.subscription.errorMessage,
    userSubscription: state.subscription.userSubscripton,
    accessCodeErrorMessage: state.subscription.accessCodeErrorMessage,
    loading: state.subscription.loading,
    purchaseSuccessful: state.subscription.purchaseSuccessful,
    dicountCodeInfo: state.subscription.dicountCodeInfo,
    isDiscountCodeApplied: state.subscription.isDiscountCodeApplied,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUserSubscription: () => dispatch(GetUserSubscription()),
    OnPurcahseFreeSubscription: code =>
      dispatch(VerifyAndPurchaseFreeSubscription(code)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CheckOutPage));
