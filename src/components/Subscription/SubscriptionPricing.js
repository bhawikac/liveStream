import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Translate } from "../../utils/Translate";
import { connect } from "react-redux";
import {
  GetSubscriptionProduct,
  StartFreeTrail,
} from "../../store/actions/subscription";
import { SubscriptionProductType } from "../../utils/constants";
import Fade from "@material-ui/core/Fade";
import Spinner from "../spinner/spinner";
import SubsrciptionRow from "./SubsriptionRow";
import { withRouter } from "react-router-dom";

class SubscriptionPricing extends Component {
  state = {
    plans: []
  }
  componentDidMount() {
    //getting subscription from api
    this.props.onSubscriptionLoad();

  }
  componentDidUpdate(prevprops) {
    if (prevprops.subscriptionProduct !== this.props.subscriptionProduct) {
      if (this.props.subscriptionProduct.length > 0)
        this.setState({ plans: this.props.subscriptionProduct[0].plans })
    }
  }

  selectPlanCallback = (planTag, planType, amount) => {
    let productTag = this.props.subscriptionProduct[0].product.productTag
    if (planTag != undefined && productTag != undefined) {
      this.props.history.push({
        pathname: "/subscribe/CheckOut",
        state: {
          selectedPlan: planTag,
          selectedProduct: productTag,
          planType,
          amount
        },
      });
    }
  };


  render() {

    return (
      <div style={{ width: "100%" }}>
        {
          this.props.loading ?
            <div className="clipLoaderDiv">
              <Fade
                in={this.props.loading}
                style={{
                  transitionDelay: this.props.loading ? "800ms" : "0ms"
                }}
                unmountOnExit
              >
                <Spinner backColor="#fff" />
              </Fade>
            </div> :
            <Grid justify='center'>
              <div>
                {this.state.plans.length > 0 &&
                  this.state.plans && this.state.plans.sort((a,b)=> a.amount -b.amount).filter((plan) => !(plan.tag.includes("trial")||plan.trialPeriodDays > 0)).map((plan, index) => (
                    <SubsrciptionRow callback={this.selectPlanCallback} planIndex={index} key={index} plan={plan} displayName={plan.displayName} />
                  ))
                }
              </div>

            </Grid>
        }
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    subscriptionProduct: state.subscription.subscriptionProduct,
    loading: state.subscription.loading,
    // errorMessage: state.subscription.errorMessage,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubscriptionLoad: () => dispatch(GetSubscriptionProduct()),
    onStartFreeTrail: (planId, productId) =>
      dispatch(StartFreeTrail(planId, productId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SubscriptionPricing));
