import * as actionTypes from "./actionTypes";
import api from "../../api";
import moment from "moment";
import * as APIConstants from "../APIConstants";
import userApi from "../../userAPI";
import { Translate } from "../../utils/Translate";
var config = require("../../assets/config.json");

//const FETCH_ONDEMAND_CLASSES
export const savePrevPlayer = data => {
  return dispatch => {
    console.log("player saved")
    dispatch({ type: actionTypes.SAVE_PREV_PLAYER, player: data });
  };
};

export const getCollectionById = () => {
  return dispatch => {
    console.log(localStorage.getItem('userId'));
    let userID = localStorage.getItem('userId');

    if (userID != undefined || userID != null || userID != "") {
      dispatch(fetchOnDemandClasses(userID));
    } else {
      dispatch(fetchOnDemandClasses())
    }

    // api.setHeader("Authorization","Bearer");
    // let url = APIConstants.collectionByTagAPI + id;

    // if (userId !== undefined || userId !== null || userId !== "") {
    //   url = url + "/" + userId;
    // }
    // dispatch({ type: actionTypes.FETCH_ONDEMAND_DEEPLINK_COLLECTION_START });
    // api.get(url).then(response => {
    //   if (response.ok) {
    //     console.log(response)
    //     dispatch({ type: actionTypes.FETCH_ONDEMAND_DEEPLINK_COLLECTION_SUCCESS, collection: response.data[0] });
    //   } else {
    //     dispatch({ type: actionTypes.FETCH_ONDEMAND_DEEPLINK_COLLECTION_FAIL });
    //   }
    // });
  };
};
export const fetchTenantConfig = () => {
  console.log("fetchTenantConfig")
  return dispatch => {
    dispatch({ type: actionTypes.TENENT_CONFIG_LOADING_START });
    // api.setHeader("Authorization","Bearer");
    let url = APIConstants.getTenantConfigAPI + config.name;

    api.get(url).then(response => {
      if (response.ok) {
        /**
         * RR// July 04, 2020 pc 
         * CF-8288 ||Tenant Config added from API
         * Setting Tenent Config in Runtime Memory
         */
        let newConfig = response.data[0];
        console.log(newConfig.showClassOfTheDay);
        config.supportEmail = newConfig.contactEmailAddress;
        config.AccessCodeMandatory = newConfig.isAccessCodeMandatory;
        config.showClassOfTheDay = newConfig.showClassOfTheDay;
        config.ShowDiscountTextFeild = newConfig.showDiscountTextField;
        config.ShowLiveConnect = newConfig.showLiveConnect;
        config.showLiveEvent=newConfig.showLiveEvent; 
        config.EventCardSize=newConfig.eventCardSize 

        dispatch({ type: actionTypes.TENENT_CONFIG_LOADING_SUCCESS, tenantConfig: true });
      } else {
        dispatch({ type: actionTypes.TENENT_CONFIG_LOADING_FAIL, tenantConfig: true });
      }
    });
  };
};

export const fetchOnDemandClasses = userId => {
  console.log("making collection api call")
  return dispatch => {
    // dispatch(fetchTenantConfig());
    // api.setHeader("Authorization","Bearer");
    let url = APIConstants.onDemandCollectionAPI;
    if (userId != null) {
      url = url + "/" + userId;
    } else {
      url = url + "/";
    }
    dispatch({ type: actionTypes.FETCH_ONDEMAND_CLASSES_START });
    api.get(url).then(response => {
      if (response.ok) {
        dispatch(fetchOnDemandClassesSuccess(response.data));
      } else {
        dispatch({ type: actionTypes.FETCH_ONDEMAND_CLASSES_FAIL });
      }
    });
  };
};

export const fetchOnDemandDeepLinkClass = userId => {
  return (dispatch) => {
    dispatch({ type: actionTypes.FETCH_ONDEMAND_DEEPLINK_CLASSES_START });

    let url = APIConstants.onDemandDeepLinkClassAPI;
    url = url + "/" + userId;

    userApi.get(url).then(response => {
      if (response.ok) {

        dispatch({
          type: actionTypes.FETCH_ONDEMAND_DEEPLINK_CLASSES_SUCCESS,
          classes: response.data
        });

      } else {
        dispatch({ type: actionTypes.FETCH_ONDEMAND_DEEPLINK_CLASSES_FAIL });
      }
    });
  };
};


export const fetchOnDemandClassesSuccess = data => {
  return {
    type: actionTypes.FETCH_ONDEMAND_CLASSES_SUCCESS,
    classes: data
  };
};

export const fetchConnectDeepLinkClass = classId => {
  return (dispatch) => {
    dispatch({ type: actionTypes.FETCH_ONDEMAND_DEEPLINK_CLASSES_START });

    let url = `${APIConstants.clubLiveConnectAPI}${config.name}/videos/${classId}`;
    api.get(url).then(response => {

      if (response.ok) {
        console.log(response);
        let clubData = response.data[0];
        const getMaxResolutionThumbnail = (picturesObj) => {
          if (picturesObj.length === 0) {
            return;
          }

          var max = picturesObj[0].height;
          var maxIndex = 0;

          for (var i = 1; i < picturesObj.length; i++) {
            if (picturesObj[i].height > max) {
              maxIndex = i;
              max = picturesObj[i].height;
            }
          }

          return maxIndex;
        }
        let video = {
          tag: clubData.id,
          streamingLink: clubData.streamingLink,
          creationDate: clubData.created_Time ? clubData.created_Time : "",
          trailerLinkWeb: clubData.trailerLink,
          classDescription: clubData.description,
          className: clubData.name,
          imageLink: clubData.pictures ? clubData.pictures.sizes[getMaxResolutionThumbnail(clubData.pictures.sizes)].link : "",
          durationSecond: clubData.duration,
        };

        dispatch({
          type: actionTypes.FETCH_ONDEMAND_DEEPLINK_CLASSES_SUCCESS,
          classes: [video]
        });
        console.log(response.data);
      } else {
        dispatch({ type: actionTypes.FETCH_ONDEMAND_DEEPLINK_CLASSES_FAIL });
      }
    });
  };
};

export const FetchClubLiveConnect = () => {

  return dispatch => {
    dispatch({
      type: actionTypes.FETCH_LIVECONNECT_START
    });
    let url = `${APIConstants.clubLiveConnectAPI}${config.name}/videos`;
    api.get(url).then(response => {
      if (response.ok) {
        dispatch({
          type: actionTypes.FETCH_LIVECONNECT_SUCCESS,
          data: response.data
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_LIVECONNECT_FAIL,
          result: response.data
        });
      }
    });
  };
};

export const FetchLSConnectHome = () => {

  return dispatch => {
    dispatch({
      type: actionTypes.FETCH_LSCONNECTHOME_START
    });
    let url = `${APIConstants.clubLiveConnectAPI}${config.name}/preview/3`;
    api.get(url).then(response => {
      if (response.ok) {
        dispatch({
          type: actionTypes.FETCH_LSCONNECTHOME_SUCCESS,
          data: response.data
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_LSCONNECTHOME_FAIL,
          result: response.data
        });
      }
    });
  };
};

export const FetchLSConnectList = () => {

  return dispatch => {
    dispatch({
      type: actionTypes.FETCH_LSCONNECTLIST_START
    });
    let url = `${APIConstants.clubLiveConnectAPI}${config.name}/live`;
    api.get(url).then(response => {
      if (response.ok) {
        dispatch({
          type: actionTypes.FETCH_LSCONNECTLIST_SUCCESS,
          data: response.data
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_LSCONNECTLIST_FAIL,
          result: response.data
        });
      }
    });
  };
};

export const fetchIntensity = () => {
  return dispatch => {
    api.get(APIConstants.intensityAPI).then(response => {
      if (response.ok) {
        dispatch({
          type: actionTypes.FETCH_INTENSITY,
          intensities: response.data
        });
      }
    });
  };
};

export const logOnDemandTracking = (selectedClass, userId, elapsedTime) => {
  if (selectedClass.id) {
    var body = {
      requestsource: 1,
      subscriptiontag: "",
      performDate: moment().format("YYYY-MM-DDTHH:mm:ss"),
      providerName: selectedClass.provider_id,
      contentID: selectedClass.id,
      contentName: selectedClass.title,
      actualDurationSecond: selectedClass.duration * 60,
      playedDurationSecond: elapsedTime,
      subscriptionStartDate: "",
      userId: userId,
      ID: userId + "-" + selectedClass.id + "-" + moment().unix()
    };
  } else {
    var body = {
      requestsource: 1,
      subscriptiontag: "",
      performDate: moment().format("YYYY-MM-DDTHH:mm:ss"),
      providerName: selectedClass.provider,
      contentID: selectedClass.tag,
      contentName: selectedClass.className,
      actualDurationSecond: selectedClass.durationSecond,
      playedDurationSecond: elapsedTime,
      subscriptionStartDate: "",
      userId: userId,
      ID: userId + "-" + selectedClass.tag + "-" + moment().unix()
    };
  }

  return dispatch => {
    if (body.playedDurationSecond > 0) {
      dispatch({
        type: actionTypes.CLASS_LOGGED,
        playedDurationSecond: body.playedDurationSecond
      });

      api.post(APIConstants.logOnDemandTrackingAPI, body).then(response => { });
    }
  };
};

export const setClassFavourite = (
  selectedClassTag,
  userId,
  isSettingFavourite
) => {
  /*  dispatch({ type: actionTypes.IS_FAV, isFav: isSettingFavourite }); */
  if (isSettingFavourite) {
    const body = {
      userId: userId,
      virtualClassTag: selectedClassTag
    };

    return dispatch => {
      userApi.post(APIConstants.setClassFavourite, body).then(response => { });
    };
  } else {
    let url = APIConstants.setClassFavourite;
    url = url + "/" + selectedClassTag;
    return dispatch => {
      userApi.delete(url).then(response => { });
    };
  }
};

export const setClassFavouriteOnLocalColletion = (selectedCollection, classId, isSettingFavourite) => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_FAV_LOCAL,
      payload: {
        collectionName: selectedCollection,
        tag: classId,
        isSettingFavourite
      }
    });
  };
};
//below one for deeplink class
export const setDeeplinkClassFavUnfavOnLocalColletion = (Collection) => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_FAV_UNFAV_LOCAL,
      payload: [Collection]
    });
  };
};
//below one for deeplink collection
export const setDeeplinkCollectionFavUnfavOnLocal = (id) => {
  console.log(id)
  return dispatch => {
    dispatch({
      type: actionTypes.SET_FAV_UNFAV_LOCAL_COLLECTION,
      index: id
    });
  };
};
export const changeSkippedState = () => {
  return dispatch => {
    dispatch({
      type: actionTypes.CHANGE_SKIPPED_STATE
    });
  };
};

export const clearClassData = () => {
  return dispatch => {
    dispatch({
      type: actionTypes.CLEAR_CALSS_DATA
    });
  };
};
export const clearSearchData = () => {
  return dispatch => {
    dispatch({
      type: actionTypes.CLEAR_SEARCH_CALSS_DATA
    });
  };
};
export const clearCategorySearchData = () => {
  return dispatch => {
    dispatch({
      type: actionTypes.CLEAR_CATEGORY_SEARCH_CALSS_DATA
    });
  };
};
export const clearFavClassData = () => {
  return dispatch => {
    dispatch({
      type: actionTypes.CLEAR_FAV_CALSS_DATA,
      classes: null
    });
  };
};
export const searchMetadata = () => {
  return dispatch => {
    dispatch({
      type: actionTypes.SEARCH_METADATA_START
    });

    userApi.get(APIConstants.onDemandSearchMetadataAPI).then(response => {
      dispatch({
        type: actionTypes.GET_SEARCH_METADATA,
        Metadata: response.data
      });
    });
  };
};
export const searchOnDemandClass = (
  searchTerm,
  fromRecent,
  searchType,
  skip
) => {
  let body;
  if (fromRecent) {
    body = {
      virtualClasses: searchTerm
    };
  } else if (!fromRecent && searchType == 1) {
    body = {
      query: searchTerm,
      take: 50,
      skip: skip ? skip : 0
    };
  } else if (!fromRecent && searchType == 0) {
    let presecond;
    if (searchTerm[0] != "") {
      if (searchTerm[0] == "10 mins") {
        presecond = "0,960";
      } else if (searchTerm[0] == "20 mins") {
        presecond = "961,1559";
      } else if (searchTerm[0] == "30 mins") {
        presecond = "1560,2159";
      } else if (searchTerm[0] == "40+ mins") {
        presecond = "2160,18000";
      } else if (searchTerm[0] == "all") {
        presecond = "0,18000";
      }
    }
    body = {
      duration: presecond,
      type: searchTerm[1],
      provider: searchTerm[2],
      take: 50,
      skip: skip ? skip : 0
    };
  } else if (searchType == undefined) {
    if (searchTerm) {
      body = { duration: "0,30800" };
    }
  }

  return dispatch => {
    if (!skip) {
      dispatch({
        type: actionTypes.SEARCH_ONDEMAND_START
      });
      if (searchType == 0) {
        dispatch({
          type: actionTypes.CATEGORY_PARAMS_SKIPPED,
          prevSearchParams: searchTerm
        });
      }
    }

    userApi.put(APIConstants.onDemandSearchAPI, body).then(response => {
      if (fromRecent) {
        dispatch({
          type: actionTypes.SEARCH_ONDEMAND_CLASS_RECENT_SUCCESS,
          classes: response.data
        });
      } else {
        if (skip) {
          if (searchType == 0) {
            dispatch({
              type: actionTypes.SKIPPED_CATEGORY_SEARCH_ONDEMAND_CLASS_SUCCESS,
              classes: response.data,
              searchType: searchType
            });
          } else {
            dispatch({
              type: actionTypes.SKIPPED_SEARCH_ONDEMAND_CLASS_SUCCESS,
              classes: response.data,
              searchTerm: searchTerm,
              searchType: searchType
            });
          }
        } else {
          if (searchType == 0) {
            dispatch({
              type: actionTypes.CATEGORY_SEARCH_ONDEMAND_CLASS_SUCCESS,
              classes: response.data,
              searchType: searchType
            });
          } else {
            dispatch({
              type: actionTypes.SEARCH_ONDEMAND_CLASS_SUCCESS,
              classes: response.data,
              searchTerm: searchTerm,
              searchType: searchType
            });
          }
        }
      }
    });
    // return Promise.resolve();
  };
};

export const storeSearchParams = params => {
  return dispatch => {
    dispatch({ type: actionTypes.STORE_SEARCH_PARAMS, params: params });
  };
};
export const selectOnDemandClass = sClass => {
  return dispatch => {
    dispatch({
      type: actionTypes.SELECT_ONDEMAND_CLASS,
      selectedClass: sClass
    });
  };
};
