import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utils/updateObject";

const initialState = {
  workoutResult: null,
  ClassDetails: null,
  PlayDuration: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.WORKOUT_RESULT_SUBMIT_SUCCESS:
      return workoutResultSubmitSuccess(state, action);
      case actionTypes.FETCH_USER_RECENT_ACTIVITY_START:
      return fetchUserRecentActivityStart(state, action);
    case actionTypes.FETCH_USER_RECENT_ACTIVITY:
      return fetchUserRecentActivity(state, action);
      case actionTypes.FETCH_USER_RECENT_ACTIVITY_FAIL:
      return fetchUserRecentActivityFail(state, action);
    case actionTypes.SEND_CLASSDETAILS_TO_LOCALYTICS:
      return sendClassDetailsToLocalytics(state, action);
    case actionTypes.SEND_PLAY_DURATION_TO_lOCALYTICS:
      return sendPlayDurationToLocalytics(state, action);
      case actionTypes.CONNECT_CLASS_CLICKED:
      return checkConnectClassClicked(state, action);

    default:
      return state;
  }
};

//const WORKOUT_RESULT_SUBMIT_SUCCESS
const workoutResultSubmitSuccess = (state, action) => {
  // return updateObject(state,{
  //     workoutResult = action.workoutResults
  // })
  return updateObject(state);
};
const sendClassDetailsToLocalytics = (state, action) => {
  return updateObject(state, {
    ClassDetails: action.classDetails
  });
};

const sendPlayDurationToLocalytics = (state, action) => {
  return updateObject(state, {
    PlayDuration: action.PlayDuration
  });
};
const fetchUserRecentActivity = (state, action) => {
  return updateObject(state, {
    recentActivities: action.recentActivityData,
    loading: false
  });
};



const fetchUserRecentActivityStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
};

const fetchUserRecentActivityFail = (state, action) => {
  return updateObject(state, {
    loading: false
  });
};
const checkConnectClassClicked = (state, action) => {
  return updateObject(state, {
    clubConnectClicked: action.val
  });
};


export default reducer;
