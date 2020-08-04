import * as actionTypes from './actionTypes'
import api from '../../api'
import userApi from '../../userAPI'
import * as APIConstants from '../APIConstants'
import { GetUserSubscription, GetSubscriptionProduct } from './subscription'
import { ConsentType } from '../../utils/constants'
import { Translate } from '../../utils/Translate'
import { AuthenticateThirdPartyUser } from '../../ClubManager/action'
import config from '../../assets/config.json'

export const AuthenticateUser = (uname, pwd) => {
  return dispatch => {
    if (config.isThirdPartyEnabled) {
      dispatch(AuthenticateThirdPartyUser(uname, pwd))

    } else {
      dispatch(AuthenticateWexerUser(uname, pwd))
    }
  }
}

export const AuthenticateWexerUser = (uname, pwd) => {
  return dispatch => {
    dispatch({ type: actionTypes.AUTH_START })

    var bodyFormData = new FormData()
    bodyFormData.append('client_id', process.env.REACT_APP_API_CLIENT_ID)
    bodyFormData.append('redirect_uri', process.env.REACT_APP_API_BASE_URL)
    bodyFormData.append('response_type', 'token')
    bodyFormData.append('scope', 'openid')
    bodyFormData.append('username', uname)
    bodyFormData.append('password', pwd)
    bodyFormData.append('tenantId', localStorage.getItem('clientId'))

    api.setHeader('Content-Type', 'multipart/form-data')
    api.deleteHeader('Authorization')
    api.deleteHeader('TenantId')
    api.post(APIConstants.authenticatePlatformUserAPI, bodyFormData).then(response => {
      if (response.ok) {
        localStorage.setItem('token', response.data.Code)
        localStorage.setItem('userId', response.data.UserId)
        dispatch({
          type: actionTypes.AUTH_SUCCESS,
          token: response.data.Code,
          userId: response.data.UserId
        })
        dispatch(GetUserDetail())
        dispatch(GetConsentDetail())
        dispatch(GetUserConsent())
      } else {
        if (response.status === 404) {
          dispatch({
            type: actionTypes.AUTH_FAIL,
            error: Translate({
              id: 'ApiResponseStrings.InvalidUserNameOrPassword'
            })
          })
        } else if (response.status === 500) {
          dispatch({
            type: actionTypes.AUTH_FAIL,
            error: Translate({ id: 'ApiResponseStrings.InternalServerError' })
          })
        } else {
          dispatch({
            type: actionTypes.AUTH_FAIL,
            error: response.originalError.message
          })
        }
      }
    })
  }
}

export const GetConsentDetail = () => {
  return dispatch => {
    api.get(APIConstants.consentAPI).then(response => {
      if (response.ok) {
        dispatch({
          type: actionTypes.FETCH_CONSENT_SUCCESS,
          consents: response.data
        });
      }
    });
  };
};

export const UpdateUserProfileData = data => {
  return dispatch => {
    var body = {
      ApplicationProfile: {
        FirstName: data.firstName,
        LastName: data.lastName,
        emailAddress: data.email
      }
    };

    body.ApplicationProfile.FirstName + body.ApplicationProfile.emailAddress;

    dispatch({
      type: actionTypes.UPDATE_USER_START
    });
    userApi.put(APIConstants.updateUserDetails, body).then(response => {
      var msg = "";
      let Notification = Translate({
        id: body.ApplicationProfile.FirstName
          ? "Profile.ProfileUpdated"
          : "Profile.EmailUpdated"
      });
      if (response.status == 200) {
        dispatch(GetUserDetail());
        dispatch({
          type: actionTypes.NOTIFY_USER,
          NotificationText: Notification
        });
        dispatch({
          type: actionTypes.UPDATE_USER_SUCCESS
        });
      } else {
        if (response.status == 409) {
          msg = Translate({ id: "ApiResponseStrings.EmailaddressInUse" });
        } else {
          msg = Translate({ id: "ApiResponseStrings.GenericError" });
        }
        dispatch({
          type: actionTypes.UPDATE_USER_FAIL,
          errorMsg: msg
        });
      }
    });
  };
};

export const GetUserConsent = () => {
  return dispatch => {
    // api.setHeader("Authorization", "Bearer");
    userApi.get(APIConstants.userConsentAPI).then(response => {
      let tncAccepted = false;
      if (response.ok) {
        let tncObject = response.data.find(x => x.policy === ConsentType.TNC);
        if (tncObject !== undefined) {
          tncAccepted = tncObject.userAccepted;
        }

        dispatch({
          type: actionTypes.FETCH_USER_CONSENT_SUCCESS,
          userConsent: response.data,
          isLatestTncAccepted: tncAccepted
        });
      }
    });
  };
};

export const GetUserDetail = () => {
  return dispatch => {
    // api.setHeader("Authorization", "Bearer");
    dispatch({ type: actionTypes.FETCH_USER_DETAIL_START });
    userApi.get(APIConstants.getUserDetailAPI).then(response => {
      if (response.ok) {
        dispatch({
          type: actionTypes.FETCH_USER_DETAIL_SUCCESS,
          userDetail: response.data
        });
      } else {
        dispatch({ type: actionTypes.FETCH_USER_DETAIL_FAIL });
      }
    });
  }; 
};

export const clearAuthData = () => {
  return dispatch => {
    dispatch({
      type: actionTypes.USER_SIGNUP_FAIL,
      errorMsg: ""
    });
  };
};

export const ForgetPasswordRequest = email => {
  return dispatch => {
    let url = APIConstants.forgetPassword;
    var body = {
      EmailAddress: email
    };
    api.post(url, body).then(response => {
      if (response.status === 200) {
        dispatch({
          type: actionTypes.SEND_FORGOT_PASSWORD_MAIL_SUCCESS
        });
      } else {
        let errorMsg = "";
        if (response.status == 400) {
          errorMsg = Translate({ id: "ApiResponseStrings.InvalidDataPassed" });
        } else if (response.status === 204) {
          errorMsg = Translate({
            id: "ApiResponseStrings.ForgotPasswordAccountNotFound"
          });
        } else {
          errorMsg = Translate({
            id: "ApiResponseStrings.InternalServerError"
          });
        }
        dispatch({
          type: actionTypes.SEND_FORGOT_PASSWORD_MAIL_FAIL,
          errorMsg: errorMsg
        });
      }
    });
  };
};

export const ResetPasswordRequest = data => {
  return dispatch => {
    api.post(APIConstants.resetPassword, data).then(response => {
      let errorMsg = "";
      if (response.status === 200) {
        errorMsg = Translate({ id: "ApiResponseStrings.ResetSuccessful" });
        dispatch({
          type: actionTypes.RESET_PASSWORD_SUCCESS,
          errorMsg: errorMsg
        });
      } else {
        if (response.status === 400) {
          errorMsg = Translate({ id: "ApiResponseStrings.InvalidDataPassed" });
        } else if (response.status === 404) {
          errorMsg = Translate({
            id: "ApiResponseStrings.ForgotPasswordAccountNotFound"
          });
        } else if (response.status === 401) {
          errorMsg = Translate({ id: "ApiResponseStrings.ResetTokenExpired" });
        } else {
          errorMsg = Translate({
            id: "ApiResponseStrings.InternalServerError"
          });
        }
        dispatch({
          type: actionTypes.RESET_PASSWORD_ERROR,
          errorMsg: errorMsg
        });
      }
    });
  };
};

export const SaveUserConsent = (consentTag, action) => {
  return dispatch => {
    var data = {
      ConsentTag: consentTag,
      Action: action
    };
    userApi.post(APIConstants.saveUserConsentAPI, data).then(response => {
      if (response.ok) {
        dispatch(GetUserConsent());
      }
    });
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_FAIL
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const userId = localStorage.getItem("userId"); 
      dispatch({
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
      });
      dispatch(GetUserSubscription());
      dispatch(GetUserDetail());
      dispatch(GetConsentDetail());
      dispatch(GetUserConsent());
    }
  };
}; 

// export const storeDeepLinkDataToStore = (payload) => {
//   return dispatch => {
//     dispatch({ type: actionTypes.SAVE_DEEPLINK_PAYLOAD, deeplinkData: payload })
//   }
// }

export const createUserWrapper = (userData, freeAccessCode) => {
  return dispatch => {
    if (freeAccessCode != "") {
      var url = APIConstants.verifyFreeAccessCode + freeAccessCode;
      api.post(url).then(response => {
        if (response.status === 200) {
          let Notification = Translate({
            id: "Signup.CodeSignUp"
          });
          dispatch({
            type: actionTypes.VERIFY_FREEACCESSCODE_SUCCESS,
            code: freeAccessCode
          });
          dispatch(createUser(userData));
          dispatch({
            type: actionTypes.SET_NOTIFICATION_TEXTS,
            NotificationText: Notification
          });
        } else {
          let errorMsg = "";
          if (response.status === 400) {
            errorMsg = Translate({
              id: "ApiResponseStrings.InvalidDataPassed"
            });
          } else if (response.status === 409) {
            errorMsg = Translate({ id: "ApiResponseStrings.InvalidCoupon" });
          } else {
            errorMsg = Translate({
              id: "ApiResponseStrings.InternalServerError"
            });
          }
          dispatch({
            type: actionTypes.USER_SIGNUP_FAIL,
            errorMsg: errorMsg
          });
        }
      });
    } else {
      let Notification = Translate({
        id: "Signup.FreeTrialSignUp"
      });
      dispatch(createUser(userData));
      dispatch({
        type: actionTypes.SET_NOTIFICATION_TEXTS,
        NotificationText: Notification
      });
    }
  };
};

export const createUser = userData => {
  const uname = userData.UserDetail.ApplicationProfile.EmailAddress;
  const pwd = userData.UserDetail.ApplicationProfile.PasswordHash;
  return dispatch => {
    dispatch({ type: actionTypes.USER_SIGNUP_START });
    api.post(APIConstants.createPlatformUserAPI, userData).then(response => {
      if (response.ok) {
        dispatch({ type: actionTypes.USER_SIGNUP_SUCCESS });
        dispatch({
          type: actionTypes.SHOW_PRESET_NOTIFICATION
        });
        dispatch(AuthenticateUser(uname, pwd));
      } else {
        let errorMsg = "";
        if (response.status === 400) {
          errorMsg = Translate({ id: "ApiResponseStrings.InvalidDataPassed" });
        } else if (response.status === 409) {
          errorMsg = Translate({ id: "ApiResponseStrings.EmailaddressInUse" });
        } else {
          errorMsg = Translate({
            id: "ApiResponseStrings.InternalServerError"
          });
        }
        dispatch({
          type: actionTypes.USER_SIGNUP_FAIL,
          errorMsg: errorMsg
        });
      }
    });
  };
};
