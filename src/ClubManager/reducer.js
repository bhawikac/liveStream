import * as actionTypes from '../actionTypes.js';
import { updateObject } from "../../utilities/updateObject";

const initialState = {
  firstName: "",
  token: "",
  userId: "",
  authRedirectPath: "/",
  loading: false,
  timeTableLoading: false,
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
  isLoggedIn: false,
  getClubsFailMessage: "",
  getClubsData: null,
  getClubsTimetableData: null,
  getClubsTimetableFailMessage: "",
  getMyBookingsData: null,
  getMyBookingsFailMessage: "",
  makeCenterFavSuccessMessage: "",
  makeCenterFavFailMessage: "",
  thirdPartyToken: "",
  thirdPartyUserId: "",
  makeBookingSuccessResponse: null,
  makeBookingFailResponse: null,
  cancelBookingSuccessResponse: null,
  cancelBookingFailResponse: null,
  clubVisitsSuccessResponse: null,
  clubVisitsFailResponse: null,
  makeBookingLoading: false,
  cancelBookingLoading: false,
  myBookingLoading: false,
  visitsLoading: false,
  userTrainingLoading: false,
  userTrainingSuccessResponse: null,
  userTrainingFailResponse: null,
  isAuthenticated: false
};

const checkAuthStatus = (state, action) => {
  return updateObject(state, {
    isLoggedIn: false,
  });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    firstName: action.firstName,
    loading: false,
    isLoggedIn: true,
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

const getClubsSuccess = (state, action) => {
  return updateObject(state, {
    getClubsData: action.data
  });
}

const getClubsFail = (state, action) => {
  return updateObject(state, {
    getClubsFailMessage: action.errorMsg
  });
}

const getClubsTimetableStart = (state, action) => {
  return updateObject(state, {
    timeTableLoading: true
  });
}

const getClubsTimetableSuccess = (state, action) => {
  return updateObject(state, {
    getClubsTimetableData: action.data,
    timeTableLoading: false
  });
}

const getClubsTimetableFail = (state, action) => {
  return updateObject(state, {
    getClubsTimetableFailMessage: action.data,
    timeTableLoading: false
  });
}

const getMyBookingsStart = (state, action) => {
  return updateObject(state, {
    myBookingLoading: true
  })
}

const getMyBookingsSuccess = (state, action) => {
  return updateObject(state, {
    getMyBookingsData: action.data,
    myBookingLoading: false
  });
}

const getMyBookingsFail = (state, action) => {
  return updateObject(state, {
    getMyBookingsFailMessage: action.data,
    myBookingLoading: false
  });
}

const makeCenterFavSuccess = (state, action) => {
  return updateObject(state, {
    makeCenterFavSuccessMessage: action.data
  });
}

const makeCenterFavFail = (state, action) => {
  return updateObject(state, {
    makeCenterFavFailMessage: action.data
  });
}

const thirdPartyAuthSuccess = (state, action) => {
  return updateObject(state, {
    thirdPartyToken: action.token,
    thirdPartyUserId: action.userId
  });
}

const makeBookingStart = (state, action) => {
  return updateObject(state, {
    makeBookingFailResponse: null,
    makeBookingSuccessResponse: null,
    makeBookingLoading: true
  });
}

const makeBookingSuccess = (state, action) => {
  return updateObject(state, {
    makeBookingSuccessResponse: action.data,
    makeBookingLoading: false
  });
}

const makeBookingFail = (state, action) => {
  return updateObject(state, {
    makeBookingFailResponse: action.data,
    makeBookingLoading: false
  });
}

const cancelBookingStart = (state, action) => {
  return updateObject(state, {
    cancelBookingSuccessResponse: null,
    cancelBookingFailResponse: null,
    cancelBookingLoading: true
  })
}

const cancelBookingSuccess = (state, action) => {
  return updateObject(state, {
    cancelBookingSuccessResponse: action.data,
    cancelBookingLoading: false
  });
}

const cancelBookingFail = (state, action) => {
  return updateObject(state, {
    cancelBookingFailResponse: action.data,
    cancelBookingLoading: false
  });
}

const userClubVisitsStart = (state, action) => {
  return updateObject(state, {
    visitsLoading: true
  })
}

const userClubVisitsSuccess = (state, action) => {
  return updateObject(state, {
    clubVisitSuccessResponse: action,
    visitsLoading: false
  });
}

const userClubVisitsFail = (state, action) => {
  return updateObject(state, {
    clubVisitsFailResponse: action,
    visitsLoading: false
  });
}

const getUserTrainingStart = (state, action) => {
  return updateObject(state, {
    userTrainingLoading: true
  });
}

const getUserTrainingSuccess = (state, action) => {
  return updateObject(state, {
    userTrainingSuccessResponse: action.data,
    userTrainingLoading: false
  });
}

const getUserTrainingFail = (state, action) => {
  return updateObject(state, {
    userTrainingFailResponse: action.data,
    userTrainingLoading: false
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGGEDOUT:
      return checkAuthStatus(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
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
    case actionTypes.GET_CLUBS_SUCCESS:
      return getClubsSuccess(state, action);
    case actionTypes.GET_CLUBS_FAIL:
      return getClubsFail(state, action);
    case actionTypes.GET_CLUBS_TIMETABLE_START:
      return getClubsTimetableStart(state, action);
    case actionTypes.GET_CLUBS_TIMETABLE_SUCCESS:
      return getClubsTimetableSuccess(state, action);
    case actionTypes.GET_CLUBS_TIMETABLE_FAIL:
      return getClubsTimetableFail(state, action);
    case actionTypes.GET_MYBOOKINGS_SUCCESS:
      return getMyBookingsSuccess(state, action);
    case actionTypes.GET_MYBOOKINGS_FAIL:
      return getMyBookingsFail(state, action);
    case actionTypes.MAKE_CENTER_FAVOURITE_SUCCESS:
      return makeCenterFavSuccess(state, action);
    case actionTypes.MAKE_CENTER_FAVOURITE_FAIL:
      return makeCenterFavFail(state, action);
    case actionTypes.THIRD_PARTY_AUTH_SUCCESS:
      return thirdPartyAuthSuccess(state, action);
    case actionTypes.MAKE_BOOKING_START:
      return makeBookingStart(state, action);
    case actionTypes.MAKE_BOOKING_SUCCESS:
      return makeBookingSuccess(state, action);
    case actionTypes.MAKE_BOOKING_FAIL:
      return makeBookingFail(state, action);
    case actionTypes.CANCEL_BOOKING_START:
      return cancelBookingStart(state, action);
    case actionTypes.CANCEL_BOOKING_SUCCESS:
      return cancelBookingSuccess(state, action);
    case actionTypes.CANCEL_BOOKING_FAIL:
      return cancelBookingFail(state, action);
    case actionTypes.GET_USER_CLUB_VISITS_START:
      return userClubVisitsStart(state, action);
    case actionTypes.GET_USER_CLUB_VISITS_SUCCESS:
      return userClubVisitsSuccess(state, action.data);
    case actionTypes.GET_USER_CLUB_VISITS_FAIL:
      return userClubVisitsFail(state, action.data);
    case actionTypes.GET_MYBOOKINGS_START:
      return getMyBookingsStart(state, action);
    case actionTypes.GET_USER_TRAINING_HISTORY_START:
      return getUserTrainingStart(state, action);
    case actionTypes.GET_USER_TRAINING_HISTORY_SUCCESS:
      return getUserTrainingSuccess(state, action);
    case actionTypes.GET_USER_TRAINING_HISTORY_FAIL:
      return getUserTrainingFail(state, action);
    default:
      return state;
  }
};
export default reducer;
