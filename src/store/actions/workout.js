import * as actionTypes from "./actionTypes";
import api from "../../api";
import * as APIConstants from "../APIConstants";
import userApi from "../../userAPI";

export const postWorkoutResult = data => {
  return dispatch => {
    api.post(APIConstants.logWorkoutResult, data).then(response => {
      dispatch(postWorkoutResultSuccess());
    });
  };
};

export const getUserRecentActivity = () => {
  return dispatch => {
    dispatch({ type: actionTypes.FETCH_USER_RECENT_ACTIVITY_START });
    userApi.get(APIConstants.getUserRecentActivity).then(response => {
      if (response.ok) {
        dispatch({
          type: actionTypes.FETCH_USER_RECENT_ACTIVITY,
          recentActivityData: response.data
        });
      } else {
        dispatch({ type: actionTypes.FETCH_USER_RECENT_ACTIVITY_FAIL });
      }
    });
  };
};

export const postWorkoutResultSuccess = () => {
  return {
    type: actionTypes.FETCH_USER_CONSENT_SUCCESS
  };
};

export const sendClassDetailsToLocalytics = items => {
  return dispatch => {
    dispatch({
      type: actionTypes.SEND_CLASSDETAILS_TO_LOCALYTICS,
      classDetails: items
    });
  };
};
export const sendPlayDurationToLocalytics = duration => {
  return dispatch => {
    dispatch({
      type: actionTypes.SEND_PLAY_DURATION_TO_lOCALYTICS,
      PlayDuration: duration
    });
  };
};

export const checkConnectClassClicked = (val) => {
  return dispatch => {
    dispatch({
      type: actionTypes.CONNECT_CLASS_CLICKED,
      val
    })
  }
}
