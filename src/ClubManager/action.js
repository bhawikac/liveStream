import * as actionTypes from '../store/actions/actionTypes'
import api from './Api'
import userApi from './userApi'
import * as APIConstants from './Apiconstants'
import * as wexerAPIConstants from '../store/APIConstants'
import { ConsentType } from '../utils/constants'
import { Translate } from '../utils/Translate'
import { AuthenticateWexerUser } from '../store/actions/auth'
import axios from 'axios';
import environment from "./config";
import { config } from 'react-spring'
const URL = environment.BASE_URL
const configJSON = require('../assets/config.json')
//By Nikhil on 25th Nov, 2019
//Replicated the code of AuthenticateWexerUser as we need to hit the wexer server for authentication
//in future, we can have different authentication server for the tenant
// export const AuthenticateThirdPartyUser = (uname, pwd) => {
//   return dispatch => {
//     dispatch(AuthenticateWexerUser(uname, pwd))
//   }
// }
const clientID = process.env.REACT_APP_API_CLIENT_ID
const clientSecret = process.env.REACT_APP_API_CLIENT_SECRET
const signature = clientID + ':' + clientSecret
const base64Signature = btoa(signature)
const Authorization = `Basic ${base64Signature}`;

export const AuthenticateThirdPartyUser = (uname, pwd) => {
  return dispatch => {
    dispatch({ type: actionTypes.AUTH_START });
    var bodyFormData = new FormData()
    bodyFormData.append('client_id', process.env.REACT_APP_API_CLIENT_ID)
    bodyFormData.append('redirect_uri', process.env.REACT_APP_API_BASE_URL)
    bodyFormData.append('response_type', 'token')
    bodyFormData.append('scope', 'openid')
    bodyFormData.append('username', uname)
    bodyFormData.append('password', pwd)
    bodyFormData.append('tenantId', localStorage.getItem('clientId'))
    bodyFormData.append('email', uname);
    bodyFormData.append('skipConsent', true);
    bodyFormData.append('countryCode', 'de');

    api.setHeader('Content-Type', 'multipart/form-data')
    api.deleteHeader('Authorization')
    api.deleteHeader('TenantId')

    api.post(APIConstants.LoginAPI, bodyFormData).then(response => {
      console.log(response);
      if (response.status === 200 || response.status === 201) {
        if (response.data.SubscriptionStatusCode && response.data.SubscriptionStatusCode !== 601) {
          localStorage.setItem('token', response.data.Code)
          localStorage.setItem('userId', response.data.UserId)
          localStorage.setItem('ExternalUserId', response.data.ExternalUserId)
          dispatch({
            type: actionTypes.AUTH_SUCCESS,
            token: response.data.Code,
            userId: response.data.UserId
          })
        }
        else {
          dispatch({
            type: actionTypes.AUTH_ACCESSDENIED,
            showDialog: true
          })

        }
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
        }
        else {
          dispatch({
            type: actionTypes.AUTH_FAIL,
            error: response.originalError.message
          })
        }
      }
    })
  };
};
export const GetConsentDetail = () => {
  return dispatch => {
    api.get(wexerAPIConstants.consentAPI).then(response => {
      if (response.ok) {
        dispatch({
          type: actionTypes.FETCH_CONSENT_SUCCESS,
          consents: response.data
        })
      }
    })
  }
}

//By Nikhil on 26h Nov, 2019
//This method is used to get the user contracts from the third party server.

export const getThirdPartyUserSubscription = () => {

  const ExternalUserId = localStorage.getItem("ExternalUserId")
  return dispatch => {
    dispatch({
      type: actionTypes.FETCH_USER_SUBSCRIPTION_START
    });
    axios.get(URL + APIConstants.getUserSubscriptionAPI + ExternalUserId, {
      headers: {
        'Authorization': Authorization,
        'content-type': 'application/json',
        'TenantId': window.localStorage.getItem('clientId')
      }
    }).then(response => {
      if (response.status === 200) {
        if (response.data.length > 0) {
          if (configJSON.accessServiceTag) {
            response.data = response.data.filter((x) => {
              return x.Cservice.includes(configJSON.accessServiceTag)
            })
          }
          let activeStatusObj = response.data.find((data) => data.Status == "active")
          if (activeStatusObj) {
            dispatch({
              type: actionTypes.FETCH_USER_SUBSCRIPTION_SUCCESS,
              status: true,
            });
          }
          else {
            console.log(`userSusbcription error ${response}`)
            dispatch({
              type: actionTypes.FETCH_USER_SUBSCRIPTION_FAIL,
              status: false
            });
          }
        }
      }
    }).catch(function (er) {
      console.log(`userSusbcription catch ${er}`)
    });
  };
}

export const UpdateUserProfileData = data => {
  return dispatch => {
    var body = {
      ApplicationProfile: {
        FirstName: data.firstName,
        LastName: data.lastName,
        emailAddress: data.email
      }
    }

    body.ApplicationProfile.FirstName + body.ApplicationProfile.emailAddress

    dispatch({
      type: actionTypes.UPDATE_USER_START
    })

    userApi.put(wexerAPIConstants.updateUserDetails, body).then(response => {
      var msg = ''
      let Notification = Translate({
        id: body.ApplicationProfile.FirstName ? 'Profile.ProfileUpdated' : 'Profile.EmailUpdated'
      })
      if (response.status == 200) {
        dispatch(GetUserDetail())
        dispatch({
          type: actionTypes.NOTIFY_USER,
          NotificationText: Notification
        })
        dispatch({
          type: actionTypes.UPDATE_USER_SUCCESS
        })
      } else {
        if (response.status == 409) {
          msg = Translate({ id: 'ApiResponseStrings.EmailaddressInUse' })
        } else {
          msg = Translate({ id: 'ApiResponseStrings.GenericError' })
        }
        dispatch({
          type: actionTypes.UPDATE_USER_FAIL,
          errorMsg: msg
        })
      }
    })
  }
}

export const GetUserConsent = () => {
  return dispatch => {
    // api.setHeader("Authorization", "Bearer");
    userApi.get(wexerAPIConstants.userConsentAPI).then(response => {
      let tncAccepted = false
      if (response.ok) {
        let tncObject = response.data.find(x => x.policy === ConsentType.TNC)
        if (tncObject !== undefined) {
          tncAccepted = tncObject.userAccepted
        }

        dispatch({
          type: actionTypes.FETCH_USER_CONSENT_SUCCESS,
          userConsent: response.data,
          isLatestTncAccepted: tncAccepted
        })
      }
    })
  }
}

export const GetUserDetail = () => {
  return dispatch => {
    // api.setHeader("Authorization", "Bearer");
    dispatch({ type: actionTypes.FETCH_USER_DETAIL_START })
    userApi.get(wexerAPIConstants.getUserDetailAPI).then(response => {
      if (response.ok) {
        dispatch({
          type: actionTypes.FETCH_USER_DETAIL_SUCCESS,
          userDetail: response.data
        })
      } else {
        dispatch({ type: actionTypes.FETCH_USER_DETAIL_FAIL })
      }
    })
  }
}
