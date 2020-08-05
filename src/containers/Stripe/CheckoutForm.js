import React, { Component, Fragment } from "react";
import { Typography, Button, Fade, Input } from "@material-ui/core";
import { PurchaseSubscription, VerifyDiscountCouponCode, RemoveCouponCode } from "../../store/actions/subscription";
import { connect } from "react-redux";
import { StripeSourceType } from "../../utils/constants";
import { Translate } from "../../utils/Translate";
import { withRouter } from "react-router-dom";
import Spinner from "../../components/spinner/spinner";
import { CardElement } from '@stripe/react-stripe-js';
const config = require("../../assets/config.json")

class CheckoutForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isValidCardNuber: false,
      applyDisabled: false,
      check: "",
      isDiscountCodeApplied: false,
      accessCode: "",
      purchaseSuccessful: false,
      paymentButtonClicked: false
    };
    this.CARD_ELEMENT_OPTIONS = {
      style: {
        base: {
          fontFamily: "SFProRounded-Regular",
          lineHeight: "1.41",
          letterSpacing: "-0.3px",
          color: "#000",
          fontSize: "17px",
          "::placeholder": {
            color: "#99999e",
            fontFamily: "SFProRounded-Regular",
          },
        },
        invalid: {
          color: "#fa755a",
          iconColor: "#fa755a",
        },
      },
    };
  }

  componentDidMount() {
    if (!this.props.isAuthenticated) {
      this.props.history.push({ pathname: "/signin" });
    }
  }

  handleChange = (event) => {
    this.setState({ accessCode: event.target.value })
    if (event.target.value === "") {
      this.props.removeAccessCode()
    }
  }
  checkAccessCode = () => {
    if (this.state.accessCode === "") return
    this.props.getFreeAccessCodeEvent(this.state.accessCode);
  }
  removeAccessCode = () => {
    this.props.removeAccessCode()
    this.props.RemoveCouponCodeEvent()
    this.setState({ accessCode: "" })

  }

  stripePayment = () => {
    try {
      const { stripe, elements } = this.props;

      if (!stripe || !elements) {
        // Stripe.js has not loaded yet. Make sure to disable
        // form submission until Stripe.js has loaded.
        return;
      }

      // Get a reference to a mounted CardElement. Elements knows how
      // to find your CardElement because there can only ever be one of
      // each type of element.
      const cardElement = elements.getElement(CardElement);

      this.props.stripe.createSource(cardElement, { type: StripeSourceType.Card }).then(
        (response, error) => {
          if (response != null) {
            if (response.source != undefined && response.source != null) {
              this.props.onPurchaseSubscription(
                this.props.selectedPlanTag,
                response.source.id,
                this.props.selectedProductTag,
                this.state.accessCode
              );
            }
          }
        });
    }
    catch (error) {
      console.log(error)
      this.setState({ paymentButtonClicked: false })

    }
  }
  submit = (event) => {
    event.preventDefault();
    if (this.state.paymentButtonClicked) {
      return
    }
    else {
      this.setState({ paymentButtonClicked: !this.state.paymentButtonClicked }, this.stripePayment)

    }
  }
  stripeElementChange = (element) => {
    if (!element.empty && element.complete) {
      this.setState({ isValidCardNuber: true });
    } else {
      this.setState({ isValidCardNuber: false });
    }
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.isDiscountCodeApplied != this.props.isDiscountCodeApplied
    ) {
      this.setState({ isDiscountCodeApplied: this.props.isDiscountCodeApplied })
    }
    if (
      prevProps.purchaseSuccessful != this.props.purchaseSuccessful
    ) {
      this.setState({ purchaseSuccessful: this.props.purchaseSuccessful})
    }
    if(prevProps.purchaseStarted !== this.props.purchaseStarted){
      this.setState({paymentButtonClicked:false})
    }
  }

  render() {

    return (
      <div className="checkoutForm m-t-40 m-t-xs-15">
        <div className="clipLoaderDiv">
          {this.state.purchaseSuccessful &&
            this.props.history.push({ pathname: "/success" })}

          <Fade
            in={this.props.loading}
            style={{
              transitionDelay: this.props.loading ? "800ms" : "0ms",
              backgroundColor: "#fff"
            }}
            unmountOnExit
          >
            <Spinner backColor="#fff" />
          </Fade>
        </div>

        <div id="card-errors" role="alert" />
        <div className="m-b-10">
          <CardElement options={this.CARD_ELEMENT_OPTIONS}
            onChange={event => {
              console.log("CardElement [change]", event);
              this.stripeElementChange(event)
            }}
          />
        </div>
        {config.ShowDiscountTextFeild &&
          <Fragment>
            <Input
              fullWidth
              onChange={this.handleChange}
              name="accessCode"
              disabled={this.props.isDiscountCodeApplied}
              value={this.state.accessCode}
              validators={["required"]}
              className="errorbold couponCode p-lr-24"
              placeholder="Enter discount code"
              errorMessages={[
                Translate({ id: "" })
              ]}

            />
            {!this.state.isDiscountCodeApplied ?
              <Typography variant="body2" className={this.state.accessCode.length > 0 ? "codeLink" : "codeLinkDisable"}
                disabled={this.state.accessCode.length > 0 ? false : true}
                onClick={() => this.checkAccessCode()}
              >
                {Translate({ id: "Subscription.Apply" })}
              </Typography>
              :
              <Typography variant="body2" className="codeLink"
                disabled={this.state.accessCode.length > 0 ? false : true}
                onClick={() => this.removeAccessCode()}
              >
                {Translate({ id: "Subscription.Remove" })}
              </Typography>
            }
          </Fragment>
        }
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          className="m-t-40 m-t-xs-20"
          onClick={this.submit}
          disabled={
            !(
              this.state.isValidCardNuber &&
              !this.props.loading
            )
          }
        >
          <Typography variant="button">{Translate({ id: "Subscription.pay" })}</Typography>
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token != "",
    loading: state.subscription.loading,
    purchaseSuccessful: state.subscription.purchaseSuccessful,
    dicountCodeInfo: state.subscription.dicountCodeInfo,
    isDiscountCodeApplied: state.subscription.isDiscountCodeApplied,
    errorMessage: state.subscription.errorMessage,
    purchaseStarted: state.subscription.purchaseStarted
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPurchaseSubscription: (planId, sourceToken, productId, discountCode) =>
      dispatch(PurchaseSubscription(planId, sourceToken, productId, discountCode)),
    getFreeAccessCodeEvent: (freeAccessCode) => dispatch(VerifyDiscountCouponCode(freeAccessCode)),
    RemoveCouponCodeEvent: () => dispatch(RemoveCouponCode())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CheckoutForm));
