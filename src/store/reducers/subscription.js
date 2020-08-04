import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utils/updateObject";
import { CancelSubscription } from "../actions/subscription";
import { verifyFreeAccessCode } from "../APIConstants";
import { SubscriberStatusConstants } from '../../utils/constants'

const initialState = {
  subscriptionProduct: [],
  userSubscripton: null,
  loading: false,
  errorMessage: "",
  accessCodeErrorMessage: "",
  purchaseSuccessful: false,
  gotfreeTrialResponse: false,
  freeSubscriptionPurchaseStatus: false,
  hasPlayerAccess: false,
  isDiscountCodeApplied: false,
  dicountCodeInfo: null,
  isSubscriptionActive: null,
  subscriptionStatus: null,
  isSubscriptionLoading: false
};

const fetchUserSubscriptionStart = (state, action) => {
  return updateObject(state,
    {
      isSubscriptionLoading: true

    });
};
const fetchUserSubscriptionSuccess = (state, action) => {
  return updateObject(state,
    {
      userSubscripton: action.userSubscripton,
      hasPlayerAccess: action.status,
      subscriptionStatus: (action.status == true) ? SubscriberStatusConstants.ACTIVE : (action.status == false ? SubscriberStatusConstants.INACTIVE : SubscriberStatusConstants.UNKNOWN),
      isSubscriptionActive: action.status,
      isSubscriptionLoading: false
    });
};

const fetchUserSubscriptionFail = (state, action) => {
  return updateObject(state, {
    userSubscripton: null,
    subscriptionStatus: SubscriberStatusConstants.UNKNOWN,
    isSubscriptionActive: null,
    isSubscriptionLoading: false

  });
};

const fetchSubscriptionProductSuccess = (state, action) => {
  return updateObject(state, {
    subscriptionProduct: action.subscriptionProduct,
    loading: false
  });
};

const fetchSubscriptionProductFail = (state, action) => {
  return updateObject(state, {
    subscriptionProduct: [],
    loading: false,
    errorMessage: action.errorMsg
  });
};

const fetchSubscriptionProductStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
};

const startFreeTrialSubscriptionStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    errorMessage: "",
    gotfreeTrialResponse: false
  });
};

const startFreeTrialSubscriptionSuccess = (state, action) => {
  let subscriptionArray = [];
  let subscriptionObj = {}
  subscriptionObj["subscription"] = action.result
  subscriptionArray.push(subscriptionObj);
  return updateObject(state, {
    loading: false,
    gotfreeTrialResponse: true,
    hasPlayerAccess: true,
    errorMessage: "",
    userSubscripton: subscriptionArray,
  });
};

const startFreeTrialSubscriptionFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    errorMessage: action.errorMsg,
    gotfreeTrialResponse: true
  });
};

const purchaseSubscriptionFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    errorMessage: action.errorMsg,
    purchaseSuccessful: false,
    purchaseStarted: false
  });
};

const purchaseSubscriptionSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    purchaseSuccessful: true,
    hasPlayerAccess: true,
    errorMessage: "",
    purchaseStarted: false
  });
};

const purchaseSubscriptionStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    errorMessage: "",
    purchaseSuccessful: false,
    purchaseStarted: true
  });
};

const getFreeSubscriptionStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    accessCodeErrorMessage: "",
    purchaseSuccessful: false,
    freeSubscriptionPurchaseStatus: false
  });
};

const getFreeSubscriptionSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    accessCodeErrorMessage: "",
    purchaseSuccessful: true,
    freeSubscriptionPurchaseStatus: true,
    hasPlayerAccess: true
  });
};

const getFreeSubscriptionFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    accessCodeErrorMessage: action.errorMsg,
    purchaseSuccessful: false,
    freeSubscriptionPurchaseStatus: true
  });
};


//

const cancelSubscriptionStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    errorMessage: ""
  });
};

const cancelSubscriptionFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    errorMessage: action.errorMsg
  });
};
const verifyDiscountFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    isDiscountCodeApplied: false,
    dicountCodeInfo: action.data,
    errorMessage: action.errorMsg
  });
};
const verifyDiscountStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
};
const verifyDiscountSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    isDiscountCodeApplied: true,
    dicountCodeInfo: action.data
  });
};
const removeDiscount = (state, action) => {
  return updateObject(state, {
    loading: false,
    isDiscountCodeApplied: false,
  });
};
const verifyFreeAccessCodeFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    accessCodeErrorMessage: action.errorMsg
  });
};

const verifyFreeAccessCodeStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    accessCodeErrorMessage: ""
  });
};

const verifyFreeAccessCodeSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    accessCodeErrorMessage: ""
  });
};

const cancelSubscriptionSuccess = (state, action) => {
  return updateObject(state, {
    loading: false
  });
};

const resumeSubscriptionStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
};

const resumeSubscriptionSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    hasPlayerAccess: true
  });
};

const resumeSubscriptionFail = (state, action) => {
  return updateObject(state, {
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_SUBSCRIPTION_START:
      return fetchUserSubscriptionStart(state, action);
    case actionTypes.FETCH_USER_SUBSCRIPTION_SUCCESS:
      return fetchUserSubscriptionSuccess(state, action);
    case actionTypes.FETCH_SUBSCRIPTION_PRODUCT_SUCCESS:
      return fetchSubscriptionProductSuccess(state, action);
    case actionTypes.FETCH_USER_SUBSCRIPTION_FAIL:
      return fetchUserSubscriptionFail(state, action);
    case actionTypes.FETCH_SUBSCRIPTION_PRODUCT_FAIL:
      return fetchSubscriptionProductFail(state, action);
    case actionTypes.START_FREE_TRIAL_SUBSCRIPTION_START:
      return startFreeTrialSubscriptionStart(state, action);
    case actionTypes.START_FREE_TRIAL_SUBSCRIPTION_SUCCESS:
      return startFreeTrialSubscriptionSuccess(state, action);
    case actionTypes.START_FREE_TRIAL_SUBSCRIPTION_FAIL:
      return startFreeTrialSubscriptionFail(state, action);
    case actionTypes.PURCHASE_SUBSCRIPTION_START:
      return purchaseSubscriptionStart(state, action);
    case actionTypes.PURCHASE_SUBSCRIPTION_SUCCESS:
      return purchaseSubscriptionSuccess(state, action);
    case actionTypes.PURCHASE_SUBSCRIPTION_FAIL:
      return purchaseSubscriptionFail(state, action);
    case actionTypes.CANCEL_SUBSCRIPTION_START:
      return cancelSubscriptionStart(state, action);
    case actionTypes.CANCEL_SUBSCRIPTION_FAIL:
      return cancelSubscriptionFail(state, action);
    case actionTypes.CANCEL_SUBSCRIPTION_SUCCESS:
      return cancelSubscriptionSuccess(state, action);
    case actionTypes.RESUME_SUBSCRIPTION_START:
      return resumeSubscriptionStart(state, action);
    case actionTypes.RESUME_SUBSCRIPTION_SUCCESS:
      return resumeSubscriptionSuccess(state, action);
    case actionTypes.RESUME_SUBSCRIPTION_FAIL:
      return resumeSubscriptionFail(state, action);
    case actionTypes.VERIFY_DISCOUNT_FAIL:
      return verifyDiscountFail(state, action);
    case actionTypes.VERIFY_DISCOUNT_START:
      return verifyDiscountStart(state, action);
    case actionTypes.VERIFY_DISCOUNT_SUCCESS:
      return verifyDiscountSuccess(state, action);
    case actionTypes.REMOVE_DISCOUNT_COUPON:
      return removeDiscount(state, action);
    case actionTypes.VERIFY_FREEACCESSCODE_FAIL:
      return verifyFreeAccessCodeFail(state, action);
    case actionTypes.VERIFY_FREEACCESSCODE_START:
      return verifyFreeAccessCodeStart(state, action);
    case actionTypes.VERIFY_FREEACCESSCODE_SUCCESS:
      return verifyFreeAccessCodeSuccess(state, action);
    case actionTypes.FETCH_SUBSCRIPTION_PRODUCT_START:
      return fetchSubscriptionProductStart(state, action);
    case actionTypes.GET_FREE_SUBSCRIPTION_START:
      return getFreeSubscriptionStart(state, action);
    case actionTypes.GET_FREE_SUBSCRIPTION_SUCCESS:
      return getFreeSubscriptionSuccess(state, action);
    case actionTypes.GET_FREE_SUBSCRIPTION_FAIL:
      return getFreeSubscriptionFail(state, action);

    default:
      return state;
  }
};
export default reducer;
