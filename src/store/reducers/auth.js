import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utils/updateObject";

const initialState = {
  token: "",
  userId: "",
  authRedirectPath: "/",
  loading: false,
  consents: [],
  userConsent: [],
  isLatestTncAccepted: false,
  userDetail: null,
  userSubscripton: null,
  errorMessage: "",
  userCreated: false,
  sendMailerrorMessage: "",
  resetPassworderrorMessage: null,
  resetPasswordSuccessMessage: null,
  ForgotEmailSent: false,
  VerifiedAccessCode: "",
  userUpdatedSucessfully: false,
  notifyUser: false,
  NotificationText: "",
  autoClosableNotification: false,
  isAuthenticated: false,
  deepLinkPayload: null
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    userId: action.userId,
    loading: false,
    isAuthenticated: true
  });
};

const updateUserSuccess = (state, action) => {
  return updateObject(state, {
    userUpdatedSucessfully: true,
    loading: false
  });
};

const updateUserFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    errorMessage: action.errorMsg,
    userUpdatedSucessfully: false
  });
};

const updateUserStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    errorMessage: "",
    userUpdatedSucessfully: false
  });
};

const authStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    errorMessage: ""
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    errorMessage: action.error,
    isAuthenticated: false
  });
};

const authAccessDenied = (state, action) => {
  return updateObject(state, {
    loading: false,
    showDialog: action.showDialog
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    userId: null,
    token: null,
    isAuthenticated: false
  });
};

const fetchUserDetailStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
};

const fetchUserDetailSuccess = (state, action) => {
  return updateObject(state, { loading: false, userDetail: action.userDetail });
};

const fetchUserDetailFail = (state, action) => {
  return updateObject(state, {
    loading: false
  });
};

const fetchUserConsentSuccess = (state, action) => {
  return updateObject(state, {
    userConsent: action.userConsent,
    isLatestTncAccepted: action.isLatestTncAccepted
  });
};

const fetchConsentSuccess = (state, action) => {
  return updateObject(state, {
    consents: action.consents
  });
};

const userSignupStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    errorMessage: ""
  });
};

const userSignupSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    userCreated: true
  });
};
const showNotificationToUser = (state, action) => {
  return updateObject(state, {
    notifyUser: true,
    NotificationText: action.NotificationText
  });
};
const showPresetNotificationToUser = (state, action) => {
  return updateObject(state, {
    notifyUser: true
  });
};
const setNotificationTexts = (state, action) => {
  return updateObject(state, {
    NotificationText: action.NotificationText
  });
};
const closeUserNotification = (state, action) => {
  return updateObject(state, {
    notifyUser: false,
    NotificationText: ""
  });
};
const ForgotPasswordMailSuccess = (state, action) => {
  return updateObject(state, {
    ForgotEmailSent: true
  });
};

const ForgotPasswordMailFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    sendMailerrorMessage: action.errorMsg
  });
};

const verifyFreeAccessCodeSuccess = (state, action) => {
  return updateObject(state, {
    VerifiedAccessCode: action.code
  });
};

const ResetPasswordError = (state, action) => {
  return updateObject(state, {
    resetPassworderrorMessage: action.errorMsg,
    resetPasswordSuccessMessage: null
  });
};
const ResetPasswordSuccess = (state, action) => {
  return updateObject(state, {
    resetPasswordSuccessMessage: action.errorMsg,
    resetPassworderrorMessage: null
  });
};

const userSignupFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    errorMessage: action.errorMsg
  });
};
const storeDeeplinkPayload = (state, action) => {
  return updateObject(state, {
    deepLinkPayload: action.deeplinkData
  });
};
const resetUserCreatedFlag = (state, action) => {
  return updateObject(state, {
    userCreated: false
  });
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RESET_USER_CREATED_FLAG:
      return resetUserCreatedFlag(state, action);
    case actionTypes.SAVE_DEEPLINK_PAYLOAD:
      return storeDeeplinkPayload(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_ACCESSDENIED:
      return authAccessDenied(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.FETCH_USER_DETAIL_START:
      return fetchUserDetailStart(state, action);
    case actionTypes.FETCH_USER_DETAIL_SUCCESS:
      return fetchUserDetailSuccess(state, action);
    case actionTypes.FETCH_USER_SUBSCRIPTION_FAIL:
      return fetchUserDetailFail(state, action);
    case actionTypes.FETCH_USER_CONSENT_SUCCESS:
      return fetchUserConsentSuccess(state, action);
    case actionTypes.FETCH_CONSENT_SUCCESS:
      return fetchConsentSuccess(state, action);
    case actionTypes.USER_SIGNUP_START:
      return userSignupStart(state, action);
    case actionTypes.USER_SIGNUP_SUCCESS:
      return userSignupSuccess(state, action);
    case actionTypes.USER_SIGNUP_FAIL:
      return userSignupFail(state, action);
    case actionTypes.SEND_FORGOT_PASSWORD_MAIL_FAIL:
      return ForgotPasswordMailFail(state, action);
    case actionTypes.SEND_FORGOT_PASSWORD_MAIL_SUCCESS:
      return ForgotPasswordMailSuccess(state, action);
    case actionTypes.VERIFY_FREEACCESSCODE_SUCCESS:
      return verifyFreeAccessCodeSuccess(state, action);
    case actionTypes.RESET_PASSWORD_ERROR:
      return ResetPasswordError(state, action);
    case actionTypes.RESET_PASSWORD_SUCCESS:
      return ResetPasswordSuccess(state, action);
    case actionTypes.UPDATE_USER_SUCCESS:
      return updateUserSuccess(state, action);
    case actionTypes.UPDATE_USER_FAIL:
      return updateUserFail(state, action);
    case actionTypes.UPDATE_USER_START:
      return updateUserStart(state, action);
    case actionTypes.NOTIFY_USER:
      return showNotificationToUser(state, action);
    case actionTypes.CLOSE_NOTIFICATION:
      return closeUserNotification(state, action);
    case actionTypes.SET_NOTIFICATION_TEXTS:
      return setNotificationTexts(state, action);
    case actionTypes.SHOW_PRESET_NOTIFICATION:
      return showPresetNotificationToUser(state, action);

    default:
      return state;
  }
};
export default reducer;
