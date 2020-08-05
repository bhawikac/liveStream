import React, { Component, Fragment } from "react";
import "./Player.css";
import "./trailer.css";
import { CSSTransition } from "react-transition-group";
import { withRouter } from "react-router-dom";
import "video.js/dist/video-js.css";
import Button from "@material-ui/core/Button";
import {
  fetchOnDemandClasses,
  fetchOnDemandDeepLinkClass,
} from "../../../../store/actions/ondemand";
import { connect } from "react-redux";
import {
  postWorkoutResult,
  sendClassDetailsToLocalytics,
  sendPlayDurationToLocalytics,
  checkConnectClassClicked
} from "../../../../store/actions/workout";
import {
  fetchIntensity,
  logOnDemandTracking,
  setClassFavourite, setClassFavouriteOnLocalColletion, setDeeplinkClassFavUnfavOnLocalColletion,
  savePrevPlayer,
  fetchConnectDeepLinkClass
} from "../../../../store/actions/ondemand";
//import { storeDeepLinkDataToStore } from '../../../../store/actions/auth'
import Fade from "@material-ui/core/Fade";
import Spinner from "../../../../components/spinner/spinner";
import moment from "moment";
import { getUserActiveSubscription } from "../../../../store/selectors/subscription";
import { GetUserSubscription } from "../../../../store/actions/subscription";
import { Translate } from "../../../../utils/Translate";
import { Grid, Typography } from "@material-ui/core";
import Routes from '../../../../components/Router/Router'
import VideoPlayer from "./VideoPlayer";
import * as actionTypes from "../../../../store/actions/actionTypes";

import Timeicon from "../../../../assets/images/timer.svg";
import skillLevel from "../../../../assets/images/skill.svg";
import CustomDialog from "../../../../components/Modal/Modal";

var playerAccessFlag = false;
var item = null;


const mapStateToProps = state => {
  return {
    collection: state.onDemand.deeplinkClass,
    prevPlayer: state.onDemand.prevPlayer,
    intensities: state.onDemand.intensity,
    classes: [],
    loading: state.onDemand.loading,
    userDetails: state.auth.userDetail,
    userActiveSubscription: getUserActiveSubscription(state),
    userSubscription: state.subscription.userSubscripton,
    isAuthenticated: state.auth.token !== "",
    hasPlayerAccess: state.subscription.hasPlayerAccess,
    isSubscriptionLoading: state.subscription.isSubscriptionLoading,
    clubClasses: state.onDemand.clubClasses,
    isNewUser: state.auth.userCreated,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    savingPrevPlayer: player => dispatch(savePrevPlayer(player)),
    onOnDemandClassesLoad: userId => dispatch(fetchOnDemandClasses(userId)),
    fetchDeepLinkClass: (userId) =>
      dispatch(fetchOnDemandDeepLinkClass(userId)),
    classClosed: () => dispatch({ type: actionTypes.CLASS_CLOSED }),
    classStarted: () => dispatch({ type: actionTypes.CLASS_STARTED }),
    onLoadIntensity: () => dispatch(fetchIntensity()),
    sendPlayDurationToLocalytics: time =>
      dispatch(sendPlayDurationToLocalytics(time)),
    onsetClassFavourite: (selectedClassTag, userId, isSettingFavourite) =>
      dispatch(setClassFavourite(selectedClassTag, userId, isSettingFavourite)),
    setDeeplinkClassFavUnfavOnLocalColletion: (payload) => dispatch(setDeeplinkClassFavUnfavOnLocalColletion(payload)),
    onsetClassFavouriteLocal: (selectedCollection, classId, isSettingFavourite) =>
      dispatch(setClassFavouriteOnLocalColletion(selectedCollection, classId, isSettingFavourite)),
    onLogOnDemandTracking: (selectedClass, userId, elapsedTime) =>
      dispatch(logOnDemandTracking(selectedClass, userId, elapsedTime)),
    sendClassDetailsToLocalytics: items =>
      dispatch(sendClassDetailsToLocalytics(items)),
    onSubmitWorkoutResult: sClass => dispatch(postWorkoutResult(sClass)),
    loadUserSubscription: () => dispatch(GetUserSubscription()),
    checkConnectClassClicked: isClubConnectClicked => dispatch(checkConnectClassClicked(isClubConnectClicked)),
    FetchClubLiveConnect: (id) => dispatch(fetchConnectDeepLinkClass(id)),
    storeDeepLinkDataToStore: (id) => dispatch({ type: actionTypes.SAVE_DEEPLINK_PAYLOAD, deeplinkData: id }),
    resetUserCreatedFlag: () => dispatch({ type: actionTypes.RESET_USER_CREATED_FLAG })
  };
};

class Player extends Component {
  constructor(props) {
    super(props);
    this.player;
    this.state = {
      elapsedTime: 0,
      videoPlaying: false,
      loading: true,
      video: {},
      finished: false,
      showCountdown: false,
      VideoError: false,
      classId: "",
      showDialog: false,
      isClubConnect: false,
      isDeepLinkLoading: false,
      isThisClassDeepLink: false

    };
  }
  elapsedTimeLiftstateUp = time => {
    this.setState({ elapsedTime: time });
  };

  componentWillUnmount() {
    this.props.resetUserCreatedFlag()
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.isAuthenticated != true) {
      var path = this.props.location.pathname;
      let isDeepLink = this.props.location.state;
      if (!isDeepLink) {

        this.props.storeDeepLinkDataToStore(path);
      }
      this.props.history.push({ pathname: "/signin", state: path });
    } else {
      /**
       * Nikhil Gupta 03 July2020
       * commented this code
       * after signUp, play the video,the loader persists as 
       * the value of this.props.isSubscriptionLoading doesnot change
       */
      // if (this.props.isNewUser == false) {
        this.props.loadUserSubscription();
      // }
      if (
        this.props.location.state != undefined ||
        this.props.location.state != null
      ) {

        item = this.props.location.state.selectedItem;

        if (item && !item.duration && item.durationSecond) {
          item.duration = Math.floor(item.durationSecond / 60)
        }
        //this.props.sendClassDetailsToLocalytics(item);
        //Commenting above line, item contains modified keys of Json response of api
        //LocalticsPayload payload

        let videoState = {};
        let LocalticsPayload = {}
        if (item != null) {
          if (item.id != undefined) {

            videoState = {
              url: item.url,
              creationDate: item.creationDate ? item.creationDate : "",
              trailerLinkWeb: item.trailerLinkWeb,
              description: item.classDescription
                ? item.classDescription
                : item.description,
              title: item.title,
              thumbnail: item.thumbnail,
              calorieBurn: item.calories,
              duration: item.durationSecond
                ? Math.floor(item.durationSecond / 60)
                : 55,
              altLink: item.alternateLink,
              fav: item.fav ? item.fav : item.isFav,
              level: item.level,
            };

            //RR// Do not delet it , It sends payload to localytics //
            LocalticsPayload = {
              duration: item.duration,
              id: item.id ? item.id : item.tag,
              title: item.title,
              newProviderId: item.newProviderId,
              provider_id: item.provider_id,
              category: item.classCategory ? item.classCategory : item.category
            }
          } else {
            videoState = {
              url: item.streamingLink,
              creationDate: item.creationDate
                ? item.creationDate
                : item.creationDate,
              trailerLinkWeb: item.trailerLinkWeb,
              description: item.classDescription
                ? item.classDescription
                : item.description,
              title: item.className,
              thumbnail: item.imageLink,
              calorieBurn: item.calorieBurn,
              duration: item.durationSecond
                ? Math.floor(item.durationSecond / 60)
                : 55,
              altLink: item.alternateLink,
              fav: item.favourite,
              level: item.level,
              // duration:item.duration
            };
            LocalticsPayload = {
              duration: Math.floor(item.durationSecond / 60),
              id: item.tag ? item.tag : item.id,
              title: item.className ? item.className : item.title,
              newProviderId: item.providerID,
              provider_id: item.provider,
              category: item.classCategory
            }

            // RR//Localytics Payload in case of Dynamic Links, or row keys used from api response
            // Do not delete this payload
          }
        }
        this.props.sendClassDetailsToLocalytics(LocalticsPayload);

        // this.setState({ video });
        if (this.props.location.state.isClubConnect) {
          videoState = { ...videoState }
          this.props.checkConnectClassClicked(true)
          this.setState({ selectedItem: item, video: videoState, isClubConnect: true })
        }
        else {
          this.props.checkConnectClassClicked(false)
          this.setState({ selectedItem: item, video: videoState })

        }
      }

      else {
        this.setState({ isDeepLinkLoading: true, isThisClassDeepLink: true });
        var path = this.props.location.pathname;
        var pathItems = path.split("/");

        this.setState({ classId: pathItems[2] });
        if (pathItems[1] == "connect") {
          this.setState({ isClubConnect: true })
          this.props.FetchClubLiveConnect(pathItems[2]);
        } else {
          var userId = localStorage.getItem("userId");
          if (userId != null || userId != undefined) {
            this.props.fetchDeepLinkClass(pathItems[2]);
          } else {
            this.props.fetchDeepLinkClass(pathItems[2]);
          }

        }


      }
    }

  }

  componentDidUpdate(prevProps, prevState) {

    if (prevProps.collection !== this.props.collection) {

      if (this.props.collection != null) {
        console.log(this.props.collection)
        item = this.props.collection[0];


        let { video } = this.state;
        if (item != null && item != false) {
          video = {
            url: item.streamingLink,
            id: item.tag,
            title: item.className,
            thumbnail: item.imageLink,
            description: item.classDescription,
            calorieBurn: item.calorieBurn,
            duration: item.durationSecond
              ? Math.floor(item.durationSecond / 60)
              : 55,
            altLink: item.alternateLink,
            fav: item.favourite,
            level: item.intensity,
            creationDate: item.creationDate,
            newProviderId: item.providerID,
            provider_id: item.provider,
            category: item.classCategory
          };
          // this.setState({ video });
          if (this.state.isClubConnect) {
            this.props.checkConnectClassClicked(true)
            let videoState = { ...video }
            this.setState({ ...this.state, video: videoState, selectedItem: item });
          } else {
            this.setState({ ...this.state, video: video, selectedItem: item });
          }
          this.props.sendClassDetailsToLocalytics(video);

        } else {
          this.props.history.push({ pathname: "/classes" })
        }
        if (prevState.videoPlaying !== this.state.videoPlaying) {
          window.scrollTo(0, 0);
        }
        if (this.props.isNewUser) {
          this.setState({ isDeepLinkLoading: false, loading: false, videoPlaying: true });
        } else {
          this.setState({ isDeepLinkLoading: false });
        }

      } else {
        this.props.history.push({ pathname: "/classes" });
      }
    }

    if (prevProps.isSubscriptionLoading != this.props.isSubscriptionLoading && this.props.isSubscriptionLoading == false) {

      if (this.props.hasPlayerAccess == true) {
        this.setState({ videoPlaying: true, loading: false });
      } else if (this.props.hasPlayerAccess == false) {
        this.props.history.push({ pathname: "/subscribe" });
      }
    }
  }


  trackAndLogClass = (islogging, istracking) => {
    var selectedClass = this.state.selectedItem;

    var userId = localStorage.getItem("userId");
    var time = this.state.elapsedTime;

    if (istracking) {
      this.props.onLogOnDemandTracking(selectedClass, userId, time);
    }
    if (islogging) {
      var intensityData = this.props.intensities;
      var kCoefficient = 0;
      if (intensityData != null) {
        intensityData.maxWorkPercentage.forEach(hr => {
          if (hr.intensityLevel == selectedClass.intensity) {
            kCoefficient = hr.hRmax;
          }
        });
      }

      let calorieBurn = 0;
      var user = this.props.userDetails;
      var age = this.getAge(user.birthDate);
      const hRmax = 208 - 0.7 * age;
      const heartRate = (kCoefficient / 100) * hRmax;

      if (user.gender === "male") {
        calorieBurn =
          ((-55.0969 +
            0.6309 * heartRate +
            0.1988 * user.latestMeasurement.TotalWeightKg +
            0.2017 * age) /
            4.184) *
          60 *
          (time / 60 / 60);
      } else if (user.gender === "female") {
        calorieBurn =
          ((-20.4022 +
            0.4472 * heartRate -
            0.1263 * user.latestMeasurement.TotalWeightKg +
            0.074 * age) /
            4.184) *
          60 *
          (time / 60 / 60);
      }

      const payload = {
        classCommitmentTag: null,
        primaryGoal: 0,
        secondaryGoal: 0,
        skillLevel: selectedClass.skill,
        durationSeconds: time,
        mood: null,
        completedDate: moment().format(),
        tag: selectedClass.id ? selectedClass.id : selectedClass.tag,
        intensityLevel: selectedClass.intensity,
        workoutName: selectedClass.title
          ? selectedClass.title
          : selectedClass.className,
        userWorkoutTag: selectedClass.id ? selectedClass.id : selectedClass.tag,
        isTimed: false,
        calorieBurn: Math.round(calorieBurn), // int req
        exercises: null,
        durationMinutes: Math.round(time / 60), // int req
        trackingResult: this.state.isClubConnect ? 8 : 7,
        imageUrl: selectedClass.thumbnail
          ? selectedClass.thumbnail
          : selectedClass.imageLink,
        userId: userId,
        trailerLinkWeb: selectedClass.trailerLinkWeb,
        workoutDescription: selectedClass.description
          ? selectedClass.description
          : selectedClass.classDescription,
        creationDate: selectedClass.creationDate,
        keywords: selectedClass.keywords,
        classCategories: selectedClass.category
          ? selectedClass.category[0]
          : "",
        level: selectedClass.level,
      };

      this.props.onSubmitWorkoutResult(payload);
    }
  };
  getAge = dateString => {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  unfavVideo = () => {
    let collectionName = this.props.history.location.state ? this.props.history.location.state.collectionName : "";
    this.state.video.fav = !this.state.video.fav;
    var selectedClassTag = this.state.selectedItem.id
      ? this.state.selectedItem.id
      : this.state.selectedItem.tag;
    var userId = localStorage.getItem("userId");
    this.props.onsetClassFavourite(selectedClassTag, userId, false);
    if (this.state.isThisClassDeepLink == true) {
      this.favUnfavDeepLinks(false);
    }
    else {
      this.props.onsetClassFavouriteLocal(collectionName, selectedClassTag, true)
    }
  };
  favVideo = () => {
    let collectionName = this.props.history.location.state ? this.props.history.location.state.collectionName : "";
    this.state.video.fav = !this.state.video.fav;
    var selectedClassTag = this.state.selectedItem.id
      ? this.state.selectedItem.id
      : this.state.selectedItem.tag;

    var userId = localStorage.getItem("userId");
    this.props.onsetClassFavourite(selectedClassTag, userId, true);
    if (this.state.isThisClassDeepLink == true) {
      this.favUnfavDeepLinks(true);
    }
    else {
      this.props.onsetClassFavouriteLocal(collectionName, selectedClassTag, true)
    }


  };
  favUnfavDeepLinks = (favStatus) => {
    let item = this.props.collection[0]
    console.log(item);
    let newCollection = {
      streamingLink: item.streamingLink,
      tag: item.tag,
      className: item.className,
      imageLink: item.imageLink,
      classDescription: item.classDescription,
      calorieBurn: item.calorieBurn,
      durationSecond: item.durationSecond,
      alternateLink: item.alternateLink,
      favourite: favStatus,
      intensity: item.intensity,
      creationDate: item.creationDate,
      providerID: item.providerID,
      provider: item.provider,
      classCategory: item.classCategory
    }
    this.props.setDeeplinkClassFavUnfavOnLocalColletion(newCollection);
  }

  okButtonClick = () => {
    this.setState({ showDialog: false })
    this.props.history.push({ pathname: "/subscribe" });
  }


  render() {
    const { video } = this.state;

    return (
      <Fragment>
        <div>

          {this.state.showDialog ?
            <CustomDialog
              open={true}
              title={Translate({ id: "Subscription.UpgradeMembership" })}
              heading={Translate({ id: "Subscription.UpgradeMessage" })}
            >
              <div className="text-center padding16">
                <Button size="small" type="submit" color="secondary"
                  className="button" variant="contained"
                  onClick={this.okButtonClick}
                  style={{ marginTop: "60px" }}
                >
                  <Typography variant="h5">
                    {Translate({ id: "Subscription.Ok" })}
                  </Typography>
                </Button>
              </div>
            </CustomDialog>
            : null}



          {this.state.loading == true || this.props.loading == true || this.state.isDeepLinkLoading == true ? (
            <div style={{ marginTop: "15%" }}>
              <Fade
                in={this.state.loading}
                style={{
                  transitionDelay: "0ms",
                  backgroundColor: "#fff",
                }}
                unmountOnExit
              >
                <Spinner />
              </Fade>
            </div>
          ) : (
              <Fragment>

                {this.state.videoPlaying == false ? (
                  <Fragment>

                    <div className="bgContainer p-t-32 p-t-xs-16">
                      <div className="page-container">
                        <div
                          className=""
                          style={{
                            padding: "0px !important",
                            outline: "none !important",
                            borderBlock: "none !important",
                            borderInline: "none !important",
                            maxHeight: "354px !important",
                          }}
                          item
                        >
                          <div
                            style={{
                              maxWidth: "100%",
                              marginTop: "0px",
                              padding: "0px !important",
                              outline: "none !important",
                              borderBlock: "none !important",
                              borderInline: "none !important",
                            }}
                          >
                            {this.props.location.state != undefined ? (


                              <img
                                className="no-video-image"
                                src={`${video.thumbnail}?width=656&height=354`}
                                alt=""
                                onError={
                                  //() =>
                                  e => {
                                    e.target.onerror = null;
                                    this.props.history.push({
                                      pathname: Routes.classListViewRoute,
                                    });
                                    // e.target.src = require("../../../../assets/images/" +
                                    //   localStorage.getItem("clientImageFolder") +
                                    //   "/generic_vid_thumb.jpg");
                                  }
                                  /*   (this.img.src = require("../../../../assets/images/" +
                              localStorage.getItem("clientImageFolder") +
                              "/generic_vid_thumb.jpg")) */
                                }
                              />

                            ) : (
                                <img
                                  className="no-video-image"
                                  src={`${video.thumbnail}?width=656&height=354`}
                                  alt=""
                                  onError={
                                    //() =>
                                    e => {
                                      e.target.onerror = null;
                                      this.props.history.push({
                                        pathname: Routes.classListViewRoute,
                                      });
                                      // e.target.src = require("../../../../assets/images/" +
                                      //   localStorage.getItem("clientImageFolder") +
                                      //   "/generic_vid_thumb.jpg");
                                    }
                                    /*   (this.img.src = require("../../../../assets/images/" +
                            localStorage.getItem("clientImageFolder") +
                            "/generic_vid_thumb.jpg")) */
                                  }
                                />
                              )}
                          </div>
                        </div>

                      </div>
                    </div>
                  </Fragment>
                ) : (
                    <div className="bgContainer p-t-32 p-t-xs-16">

                      {this.state.videoPlaying && (
                        <VideoPlayer
                          classStarted={this.props.classStarted}
                          classClosed={this.props.classClosed}
                          paused={true}
                          elapsedTimeLiftstateUp={this.elapsedTimeLiftstateUp}
                          trackAndLogClass={this.trackAndLogClass}
                          props={this.state}
                          videoProps={this.state.video}
                        />
                      )}
                    </div>
                  )}
              </Fragment>
            )}

        </div>
        {(this.state.isDeepLinkLoading == false) && (this.state.loading == false && this.props.loading == false) &&
          <div>
            <div className='new-video-metadata'>
              <div className='vido-metadata-row'>
                <p className="customh1">
                  {Translate({ id: `${video.title}` })}
                </p>
                {!this.state.isClubConnect && <div className="text-center m-b-xs-5 videoFavUnfav">
                  {this.state.video.fav && (
                    <CSSTransition
                      classNames="slide"
                      timeout={10}
                      mountOnEnter
                      unmountOnExit

                      in={this.state.videoPlaying}
                      onClick={this.unfavVideo}
                    >

                      <img
                        className="favButton  filledStar"
                        src={require("../../../../assets/images/unfav-copy.svg")}
                      />

                    </CSSTransition>
                  )}
                  {!this.state.video.fav && (
                    <CSSTransition
                      classNames="slide"
                      timeout={10}
                      mountOnEnter
                      unmountOnExit

                      in={this.state.videoPlaying}
                      onClick={this.favVideo}
                    >

                      <img
                        className="favButton  filledStar"
                        src={require("../../../../assets/images/unfav.svg")}
                      />

                    </CSSTransition>
                  )}
                </div>}

              </div>

              {video.description && <div>
                <Typography className="text-gray m-b-10" variant="h6" >
                  {Translate({ id: `${video.description}` })}
                </Typography>
              </div>}
              <div className='bottomTimer'>
                <Grid container justify='flex-start' direction="row">
                  <Grid item>
                    <Grid container direction="row">
                      <Grid item>
                        <img className="PlayerIcon"
                          src={Timeicon}
                        />
                      </Grid>
                      <Grid style={{ paddingTop: "2px" }} item>
                        <p className="featured-iconText-Player">
                          {this.state.video ? this.state.video.duration : "00:49:00"}{" "}

                          {Translate({ id: "Player.Mins" })}
                        </p>
                      </Grid>
                    </Grid>
                  </Grid>
                  {this.state.video.level && <Grid item>
                    <Grid container direction="row">
                      <Grid item>
                        <img className="PlayerIcon"
                          src={skillLevel}
                        />
                      </Grid>
                      <Grid style={{ paddingTop: "2px" }} item>
                        <p className="featured-iconText-Player">
                          {this.state.video.level}
                        </p>


                      </Grid>
                    </Grid>
                  </Grid>}
                </Grid>
              </div>
            </div>
          </div>
        }
      </Fragment>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Player));