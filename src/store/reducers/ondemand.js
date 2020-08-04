import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utils/updateObject";
import { config } from "react-transition-group";

const initialState = {
  onDemandCollection: null,
  selectedOnDemandClass: null,
  intensity: null,
  loading: false,
  searchedOnDemandClasses: null,
  categorySearchedOnDemandClasses: null,
  categorySearchLoading: false,
  searchTerm: "",
  typedSearchTerm: "",
  searchType: 0,
  recentOnDemandClasses: null,
  searchLoading: false,
  isOndemandClassLogged: false,
  PlayDuration: 0,
  isClassStarted: false,
  Metadata: null,
  searchParams: null,
  skipped: false,
  categoryParamSkipped: null,
  prevPlayer: null,
  clubClasses: null,
  loadingDeeplinkCollection: false,
  deeplinkCollection: null,
  deeplinkClass: null,
  tenantConfig: null,
  isTenantConfigLoading:false

};

const fetchOnDemandClassesSuccess = (state, action) => {
  return updateObject(state, {
    onDemandCollection: action.classes,
    loading: false
  });
};
const storeSearchParams = (state, action) => {
  return updateObject(state, {
    searchParams: action.params
  });
};
const savePrevPlayer = (state, action) => {
  return updateObject(state, {
    prevPlayer: action.player
  });
};

const fetchOnDemandDeepLinkClassesSuccess = (state, action) => {
  return updateObject(state, {
    deeplinkClass: action.classes,
    loading: false
  });

};

const ClassStarted = (state, action) => {
  return updateObject(state, {
    isClassStarted: true
  });
};
const ClassClosed = (state, action) => {
  return updateObject(state, {
    isClassStarted: false
  });
};

const loggingOnDemandClass = (state, action) => {
  return updateObject(state, {
    isOndemandClassLogged: true,
    PlayDuration: action.playedDurationSecond
  });
};
const loggingOffDemandClass = (state, action) => {
  return updateObject(state, {
    isOndemandClassLogged: false,
    PlayDuration: 0
  });
};
const fetchOnDemandClassesStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
};
const fetchOnDemandDeepLinkClassesStart = (state, action) => {

  return updateObject(state, {
    loading: true
  });
};
const fetchOnDemandClassesFail = (state, action) => {
  return updateObject(state, {
    loading: false
  });
};

const fetchIntensity = (state, action) => {
  return updateObject(state, {
    intensity: action.intensities
  });
};
const CategoryParamSearch = (state, action) => {
  return updateObject(state, {
    categoryParamSkipped: action.prevSearchParams
  });
};

const searchOnDemandSuccess = (state, action) => {
  return updateObject(state, {
    searchedOnDemandClasses: action.classes,
    searchLoading: false,
    searchTerm: action.searchTerm,
    searchType: action.searchType
  });
};
const skippedsearchOnDemandSuccess = (state, action) => {
  return updateObject(state, {
    searchedOnDemandClasses: action.classes,
    searchLoading: false,
    searchTerm: action.searchTerm,
    searchType: action.searchType,
    skipped: true
  });
};
const skippedCategorysearchOnDemandSuccess = (state, action) => {
  return updateObject(state, {
    searchedOnDemandClasses: action.classes,
    searchLoading: false,
    searchType: action.searchType,
    skipped: true
  });
};
const categorySearchOnDemandSuccess = (state, action) => {
  return updateObject(state, {
    searchedOnDemandClasses: action.classes,
    searchLoading: false,
    searchType: action.searchType
  });
};
const clearFavData = (state, action) => {
  return updateObject(state, {
    onDemandCollection: action.classes
  });
};
const clearFavDataLocal = (state, action) => {
  let collection = state.onDemandCollection;
  let reqCollectionindex
  let reqClassIndex
  if (collection) {
    if (action.payload.collectionName === "MyRecentActivity" || !action.payload.collectionName) {
      console.log(collection)
      for (let i = 0; i < collection.length; i++) {
        console.log(collection[i].collectionItems)
        reqClassIndex = collection[i].collectionItems.findIndex(particularClass => particularClass.tag === action.payload.tag);
        if (reqClassIndex > -1) {
          reqCollectionindex = i
          break;
        }
      }
    } else {
      console.log(collection)
      reqCollectionindex = collection.findIndex((particularCollection, i) => particularCollection.collectionName === action.payload.collectionName);
    }

    if (reqCollectionindex > -1) {
      reqClassIndex = collection[reqCollectionindex].collectionItems.findIndex(particularClass => particularClass.tag === action.payload.tag);
      collection[reqCollectionindex].collectionItems[reqClassIndex].favourite = action.payload.isSettingFavourite
      if (!action.payload.isSettingFavourite) {
        let favClassIndex = collection[collection.length - 1].collectionItems.findIndex(particularClass => particularClass.tag === action.payload.tag);
        collection[collection.length - 1].collectionItems.splice(favClassIndex, 1)
      }
      else {
        console.log(collection)
        collection[collection.length - 1].collectionItems.push(collection[reqCollectionindex].collectionItems[reqClassIndex])
      }
    }
  }
  return updateObject(state, {
    onDemandCollection: collection,
  });
};

const clearClassData = (state, action) => {
  return updateObject(state, {
    onDemandCollection: null,
    loading: true
  });
};
const clearSearchData = state => {
  return updateObject(state, {
    searchedOnDemandClasses: null,
    searchTerm: ""
  });
};

const changeSkippedState = state => {
  return updateObject(state, {
    skipped: false
  });
};
const clearCategorySearchData = state => {
  return updateObject(state, {
    searchedOnDemandClasses: null,
    searchParams: null
  });
};
const categorySearchOnDemandStart = (state, action) => {
  return updateObject(state, {
    categorySearchedOnDemandClasses: null,
    categorySearchLoading: true
  });
};
const searchOnDemandStart = (state, action) => {
  return updateObject(state, {
    searchedOnDemandClasses: null,
    searchLoading: true
  });
};
const searchMetadata = (state, action) => {
  return updateObject(state, {
    Metadata: action.Metadata
  });
};

const fetchLSConnectFail = (state, action) => {
  return updateObject(state, {
    loading: false,
  });
};
const fetchLSConnectStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
};
const fetchLSConnectSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    LSHomeClasses: action.data
  });
};
//----------------------------
const fetchLSConnectListFail = (state, action) => {
  return updateObject(state, {
    loading: false,
  });
};
const fetchLSConnectListStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
};
const fetchLSConnectListSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    ListClasses: action.data
  });
};

const fetchLiveConnectFail = (state, action) => {
  return updateObject(state, {
    loading: false,
  });
};
const fetchLiveConnectStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
};
const fetchLiveConnectSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    clubClasses: action.data
  });
};
const searchMetadataStart = (state, action) => {
  return updateObject(state, {
    searchLoading: true
  });
};
const searchOnDemandClassesRecent = (state, action) => {
  return updateObject(state, {
    recentOnDemandClasses: action.classes,
    searchLoading: false
  });
};
const handleSearchTab = (state, action) => {
  return updateObject(state, {
    searchType: 1
  });
};
const handleCatTab = (state, action) => {
  return updateObject(state, {
    searchType: 0
  });
};

const selectOnDemandClass = (state, action) => {
  return updateObject(state, {
    selectedOnDemandClass: action.selectedClass
  });
};

const fetchDeeplinkCollectionSuccess = (state, action) => {
  return updateObject(state, {
    deeplinkCollection: action.collection,
    //onDemandCollection: action.collection,
    loadingDeeplinkCollection: false
  });
};
const fetchDeeplinkClassFail = (state, action) => {
  return updateObject(state, {
    deeplinkClass: false,
    loadingDeeplinkCollection: false
  });
};
const fetchDeeplinkCollectionStart = (state, action) => {
  return updateObject(state, {
    loadingDeeplinkCollection: true
  });
};
const fetchDeeplinkCollectionFail = (state, action) => {
  return updateObject(state, {
    deeplinkCollection: false,
    loadingDeeplinkCollection: false
  });
};
const setFavUnfavForDeepLink = (state, action) => {
  return updateObject(state, {
    deeplinkClass: action.payload
  });
};
const setFavUnfavForDeepLinkCollection = (state, action) => {
  let newCollction = { ...state.deeplinkCollection }
  newCollction.collectionItems[action.index].favourite = !newCollction.collectionItems[action.index].favourite;
  return updateObject(state, {
    deeplinkClass: newCollction
  });
}; 
const tenantConfigLoadingStart = (state, action) => {
  return updateObject(state, {
    isTenantConfigLoading: true,
    tenantConfig: null
  });
};
const tenantConfigLoadingSuccess = (state, action) => {
  return updateObject(state, {
    isTenantConfigLoading: false,
    tenantConfig: action.tenantConfig
  });
};
const tenantConfigLoadingFail = (state, action) => {
  return updateObject(state, {
    isTenantConfigLoading: false,
   // tenantConfig: null
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    //Loading Tenant Config
    case actionTypes.TENENT_CONFIG_LOADING_START:
      return tenantConfigLoadingStart(state, action);
    case actionTypes.TENENT_CONFIG_LOADING_SUCCESS:
      return tenantConfigLoadingSuccess(state, action);
    case actionTypes.TENENT_CONFIG_LOADING_FAIL:
      return tenantConfigLoadingFail(state, action);

    //Deeplink collection
    case actionTypes.FETCH_ONDEMAND_DEEPLINK_COLLECTION_SUCCESS:
      return fetchDeeplinkCollectionSuccess(state, action);
    case actionTypes.FETCH_ONDEMAND_DEEPLINK_COLLECTION_START:
      return fetchDeeplinkCollectionStart(state, action);
    case actionTypes.FETCH_ONDEMAND_DEEPLINK_COLLECTION_FAIL:
      return fetchDeeplinkCollectionFail(state, action);

    case actionTypes.SET_FAV_UNFAV_LOCAL:
      return setFavUnfavForDeepLink(state, action);


    case actionTypes.SET_FAV_UNFAV_LOCAL_COLLECTION:
      return setFavUnfavForDeepLinkCollection(state, action);

    case actionTypes.FETCH_ONDEMAND_CLASSES_SUCCESS:
      return fetchOnDemandClassesSuccess(state, action);

    case actionTypes.FETCH_ONDEMAND_DEEPLINK_CLASSES_SUCCESS:
      return fetchOnDemandDeepLinkClassesSuccess(state, action);


    case actionTypes.FETCH_ONDEMAND_DEEPLINK_CLASSES_FAIL:
      return fetchDeeplinkClassFail(state, action);
    case actionTypes.FETCH_ONDEMAND_CLASSES_START:
      return fetchOnDemandClassesStart(state, action);
    case actionTypes.FETCH_ONDEMAND_DEEPLINK_CLASSES_START:
      return fetchOnDemandDeepLinkClassesStart(state, action);
    case actionTypes.FETCH_ONDEMAND_CLASSES_FAIL:
      return fetchOnDemandClassesFail(state, action);
    case actionTypes.SEARCH_ONDEMAND_CLASS_SUCCESS:
      return searchOnDemandSuccess(state, action);
    case actionTypes.FETCH_INTENSITY:
      return fetchIntensity(state, action);
    case actionTypes.SELECT_ONDEMAND_CLASS:
      return selectOnDemandClass(state, action);
    case actionTypes.SEARCH_ONDEMAND_CLASS_RECENT_SUCCESS:
      return searchOnDemandClassesRecent(state, action);
    case actionTypes.SEARCH_ONDEMAND_START:
      return searchOnDemandStart(state, action);
    case actionTypes.CATEGORY_SEARCH_ONDEMAND_START:
      return categorySearchOnDemandStart(state, action);
    case actionTypes.CATEGORY_SEARCH_ONDEMAND_CLASS_SUCCESS:
      return categorySearchOnDemandSuccess(state, action);
    case actionTypes.GET_SEARCH_METADATA:
      return searchMetadata(state, action);

    case actionTypes.FETCH_LSCONNECTHOME_FAIL:
      return fetchLSConnectFail(state, action);
    case actionTypes.FETCH_LSCONNECTHOME_START:
      return fetchLSConnectStart(state, action);
    case actionTypes.FETCH_LSCONNECTHOME_SUCCESS:
      return fetchLSConnectSuccess(state, action);
//-----------------------------------------------
case actionTypes.FETCH_LSCONNECTLIST_FAIL:
      return fetchLSConnectListFail(state, action);
    case actionTypes.FETCH_LSCONNECTLIST_START:
      return fetchLSConnectListStart(state, action);
    case actionTypes.FETCH_LSCONNECTLIST_SUCCESS:
      return fetchLSConnectListSuccess(state, action);

      //liveStream and connect classes on home page
      case actionTypes.FETCH_LIVECONNECT_FAIL:
      return fetchLiveConnectFail(state, action);
    case actionTypes.FETCH_LIVECONNECT_START:
      return fetchLiveConnectStart(state, action);
    case actionTypes.FETCH_LIVECONNECT_SUCCESS:
      return fetchLiveConnectSuccess(state, action);

    /*  case actionTypes.SEARCH_METADATA_START:
      return searchMetadataStart(state, action); */
    case actionTypes.CLASS_LOGGED:
      return loggingOnDemandClass(state, action);
    case actionTypes.CLASS_LOGGED_OFF:
      return loggingOffDemandClass(state, action);
    case actionTypes.CLASS_STARTED:
      return ClassStarted(state, action);
    case actionTypes.CLASS_CLOSED:
      return ClassClosed(state, action);
    case actionTypes.CLEAR_FAV_CALSS_DATA:
      return clearFavData(state, action);

    case actionTypes.SET_FAV_LOCAL:
      return clearFavDataLocal(state, action);

    case actionTypes.CLEAR_SEARCH_CALSS_DATA:
      return clearSearchData(state, action);
    case actionTypes.CLEAR_CATEGORY_SEARCH_CALSS_DATA:
      return clearCategorySearchData(state, action);
    case actionTypes.HANDLE_CAT_TAB:
      return handleCatTab(state, action);
    case actionTypes.HANDLE_SEARCH_TAB:
      return handleSearchTab(state, action);
    case actionTypes.CLEAR_CALSS_DATA:
      return clearClassData(state, action);
    case actionTypes.STORE_SEARCH_PARAMS:
      return storeSearchParams(state, action);
    case actionTypes.SKIPPED_SEARCH_ONDEMAND_CLASS_SUCCESS:
      return skippedsearchOnDemandSuccess(state, action);
    case actionTypes.SKIPPED_CATEGORY_SEARCH_ONDEMAND_CLASS_SUCCESS:
      return skippedCategorysearchOnDemandSuccess(state, action);
    case actionTypes.CHANGE_SKIPPED_STATE:
      return changeSkippedState(state, action);
    case actionTypes.CATEGORY_PARAMS_SKIPPED:
      return CategoryParamSearch(state, action);
    case actionTypes.SAVE_PREV_PLAYER:
      return savePrevPlayer(state, action);
    default:
      return state;
  }
};

export default reducer;
