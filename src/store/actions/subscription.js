import * as actionTypes from "./actionTypes";
import api from "../../api";
import userApi from "../../userAPI";
import * as APIConstants from "../APIConstants";
import { Translate } from "../../utils/Translate";
import { getThirdPartyUserSubscription } from '../../ClubManager/action';
const config = require('../../assets/config.json');

export const GetUserSubscription = () => {
  return dispatch => {
    config.isThirdPartyEnabled ? dispatch(getThirdPartyUserSubscription()) : dispatch(getWexerUserSubscription());
  };
}; 

export const getWexerUserSubscription = () => {
  return dispatch => { 
    dispatch({
      type: actionTypes.FETCH_USER_SUBSCRIPTION_START
    });
    userApi.get(APIConstants.getUserSubscriptionAPI).then(response => {
      if (response.ok) {

        if (response.data.length > 1) {
          let status = response.data.find((plan) => {
            if (plan.subscription.status == "active") {
              console.log(plan.subscription.status);
              return plan;
            }
            return null;
          })
          if (status != null) {
            dispatch({
              type: actionTypes.FETCH_USER_SUBSCRIPTION_SUCCESS,
              userSubscripton: { ...status.subscription, displayName: status.plan.displayName },
              status: true
            });
          } else {
            dispatch({
              type: actionTypes.FETCH_USER_SUBSCRIPTION_SUCCESS,
              userSubscripton: { ...response.data[0].subscription, displayName: response.data[0].plan.displayName },
              status: false
            });
          }
          console.log(status);
        } else {
          if (response.data[0].subscription != null) {
            if (response.data[0].subscription.status == "active" || response.data[0].subscription.status == "trialing") {

              dispatch({
                type: actionTypes.FETCH_USER_SUBSCRIPTION_SUCCESS,
                userSubscripton: response.data[0].subscription,
                status: true
              });
            }
            else {
              dispatch({
                type: actionTypes.FETCH_USER_SUBSCRIPTION_SUCCESS,
                userSubscripton: null,
                status: false
              });
            }
          }
        }
      } else {
        dispatch({
          type: actionTypes.FETCH_USER_SUBSCRIPTION_FAIL,
          userSubscripton: null,
          status: null
        });
      }
    });
  };
}
export const GetSubscriptionProduct = () => {
  return dispatch => {
    dispatch({
      type: actionTypes.FETCH_SUBSCRIPTION_PRODUCT_START
    });
    api.get(APIConstants.getSubscriptionProductAPI).then(response => {
      if (response.ok) {
        dispatch({
          type: actionTypes.FETCH_SUBSCRIPTION_PRODUCT_SUCCESS,
          subscriptionProduct: response.data
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_SUBSCRIPTION_PRODUCT_FAIL,
          errorMsg: Translate({ id: "ApiResponseStrings.InternalServerError" })
        });
      }
    });
  };
};

export const StartFreeTrail = (planId, productId) => {
  let trailPlanData = {
    planId: planId,
    productId: productId
  };

  return dispatch => {
    dispatch({
      type: actionTypes.START_FREE_TRIAL_SUBSCRIPTION_START
    });

    userApi.post(APIConstants.FreeTrailAPI, trailPlanData).then(response => {
      if (response.ok) {
        dispatch({
          type: actionTypes.START_FREE_TRIAL_SUBSCRIPTION_SUCCESS,
          result: response.data
        });


        if (response.data.status == "active" || response.data.status == "trialing") {
          dispatch({
            type: actionTypes.FETCH_USER_SUBSCRIPTION_SUCCESS,
            status: true
          });
        } else {
          dispatch({
            type: actionTypes.FETCH_USER_SUBSCRIPTION_SUCCESS,
            status: false
          });
        }
        //dispatch(GetUserSubscription);
      } else {
        dispatch({
          type: actionTypes.FETCH_USER_SUBSCRIPTION_FAIL,
          status: null
        });
        dispatch({
          type: actionTypes.START_FREE_TRIAL_SUBSCRIPTION_FAIL,
          errorMsg: response.data.message
        });
      }
    });
  };
};

export const PurchaseSubscription = (planId, sourceToken, productId, discountCode) => {
  let purchasePlanData = {
    planId: planId,
    sourceToken: sourceToken,
    productId: productId,
    paymentMethod: 2
  };
  if (discountCode != "" && discountCode != null) {
    purchasePlanData.DiscountCode = discountCode
  }
  return dispatch => {
    dispatch({
      type: actionTypes.PURCHASE_SUBSCRIPTION_START
    });

    userApi
      .post(APIConstants.purchaseSubscriptionAPI, purchasePlanData)
      .then(response => {
        if (response.ok) {
          let Notification = Translate({
            id: "Subscription.Subscriptionpurchased"
          });
          dispatch({
            type: actionTypes.PURCHASE_SUBSCRIPTION_SUCCESS,
            result: response.data
          });
          dispatch(GetUserSubscription);
          dispatch({
            type: actionTypes.NOTIFY_USER,
            NotificationText: Notification
          });
        } else if (response.status === 409) {
          dispatch({
            type: actionTypes.PURCHASE_SUBSCRIPTION_FAIL,
            errorMsg: Translate({ id: "ApiResponseStrings.AlreadyActiveSubscription" })
          });
        }
        else {
          dispatch({
            type: actionTypes.PURCHASE_SUBSCRIPTION_FAIL,
            errorMsg:
              response != null && response.data != null
                ? response.data.message
                : ""
          });
        }
      });
  };
};
export const VerifyDiscountCouponCode = freeAccessCode => {

  return dispatch => {
    dispatch({
      type: actionTypes.VERIFY_DISCOUNT_START
    });
    var url = APIConstants.verifyFreeAccessCode + freeAccessCode;
    api.post(url).then(response => {
      if (response.status === 200) {
        dispatch({
          type: actionTypes.VERIFY_DISCOUNT_SUCCESS,
          data: response.data
        });
      } else {
        let msg = "";
        if (response.status === 400) {
          msg = Translate({ id: "ApiResponseStrings.InvalidDataPassed" });
        } else if (response.status === 409) {
          msg = Translate({ id: "ApiResponseStrings.InvalidCoupon" });
        } else {
          msg = Translate({ id: "ApiResponseStrings.InternalServerError" });
        }
        dispatch({
          type: actionTypes.VERIFY_DISCOUNT_FAIL,
          errorMsg: msg,
          result: response.data
        });
      }
    });
  };
};
export const RemoveCouponCode = () => {

  return dispatch => {

    dispatch({
      type: actionTypes.REMOVE_DISCOUNT_COUPON,

    });

  };
};
export const VerifyAndPurchaseFreeSubscription = freeAccessCode => {

  return dispatch => {
    dispatch({
      type: actionTypes.VERIFY_FREEACCESSCODE_START
    });
    var url = APIConstants.verifyFreeAccessCode + freeAccessCode;
    api.post(url).then(response => {
      if (response.status === 200) {
        dispatch(GetFreeSubscription(freeAccessCode));
      } else {
        let msg = "";
        if (response.status === 400) {
          msg = Translate({ id: "ApiResponseStrings.InvalidDataPassed" });
        } else if (response.status === 409) {
          msg = Translate({ id: "ApiResponseStrings.InvalidCoupon" });
        } else {
          msg = Translate({ id: "ApiResponseStrings.InternalServerError" });
        }
        dispatch({
          type: actionTypes.VERIFY_FREEACCESSCODE_FAIL,
          errorMsg: msg
        });
      }
    });
  };
};

export const GetFreeSubscription = code => {
  let purchasePlanData = {
    DiscountCode: code
  };
  return dispatch => {
    dispatch({
      type: actionTypes.FETCH_USER_SUBSCRIPTION_START
    });
    userApi
      .post(APIConstants.getFreeAccessSubscription, purchasePlanData)
      .then(response => {
        if (response.ok) {
          if (response.data.status == "active" || response.data.status == "trialing") {
            dispatch({
              type: actionTypes.FETCH_USER_SUBSCRIPTION_SUCCESS,
              status: true,

            });
          } else {
            dispatch({
              type: actionTypes.FETCH_USER_SUBSCRIPTION_SUCCESS,
              status: false,

            });
          }
          let Notification = Translate({
            id: "Subscription.Subscriptionpurchased"
          });
          dispatch({
            type: actionTypes.GET_FREE_SUBSCRIPTION_SUCCESS,
            result: response.data
          });
          dispatch({
            type: actionTypes.NOTIFY_USER,
            NotificationText: Notification
          });
          dispatch(GetUserSubscription);
        } else {
          dispatch({
            type: actionTypes.GET_FREE_SUBSCRIPTION_FAIL,
            errorMsg:
              response != null && response.data != null
                ? response.data.message
                : Translate({ id: "ApiResponseStrings.InternalServerError" })
          });
        }
      });
  };
};

export const CancelSubscription = subscriptionTag => {
  var url = APIConstants.cancelUserSubscriptionAPI + "/" + subscriptionTag;
  return dispatch => {
    dispatch({
      type: actionTypes.CANCEL_SUBSCRIPTION_START
    });
    userApi.delete(url).then(response => {
      if (response.ok) {
        dispatch({
          type: actionTypes.CANCEL_SUBSCRIPTION_SUCCESS
        });
        dispatch(GetUserSubscription());
      } else {
        dispatch({
          type: actionTypes.CANCEL_SUBSCRIPTION_FAIL,
          errorMsg:
            response != null && response.data != null
              ? response.data.message
              : ""
        });
      }
    });
  };
};

export const ResumeSubscription = (subscriptionTag, planId, productId) => {
  var data = {
    PlanId: planId,
    SubscriptionId: subscriptionTag,
    ProductId: productId
  };
  var url = APIConstants.resumeUserSubscriptionAPI + "/" + subscriptionTag;
  return dispatch => {
    dispatch({
      type: actionTypes.RESUME_SUBSCRIPTION_START
    });
    userApi.put(url, data).then(response => {
      if (response.ok) {
        dispatch({
          type: actionTypes.RESUME_SUBSCRIPTION_SUCCESS
        });
        dispatch(GetUserSubscription());
      } else {
        dispatch({
          type: actionTypes.RESUME_SUBSCRIPTION_FAIL
        });
      }
    });
  };
};
