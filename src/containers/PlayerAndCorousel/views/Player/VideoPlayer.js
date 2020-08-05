import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import videojs from "video.js";
import { connect } from "react-redux";
import {
  postWorkoutResult,
  sendPlayDurationToLocalytics
} from "../../../../store/actions/workout";
import Fade from "@material-ui/core/Fade";
import Spinner from "../../../../components/spinner/spinner";
import {
  StripComponent,
  ModalOverVideo
} from "../../../../components/Notification/StripOverVideo";
import Portal from "../../../../components/Portal/Portal";
import { VideoError } from "./Video";
import WorkOutCompleted from "./WorkOutCompleted";
import Routes from '../../../../components/Router/Routes';

window.videojs = videojs;
require("videojs-contrib-hls/dist/videojs-contrib-hls.js");

const mapStateToProps = state => {
  return {
    collection: state.onDemand.onDemandCollection,
    ClassDetails: state.workout.ClassDetails,
    classes: [],
    loading: state.onDemand.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmitWorkoutResult: sClass => dispatch(postWorkoutResult(sClass)),
    sendPlayDurationToLocalytics: time =>
      dispatch(sendPlayDurationToLocalytics(time))
  };
};

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elapsedTime: 0,
      videoPlaying: false,
      loading: false,
      video: this.props.video,
      player: null,
      finished: false,
      showBottomBar: false,
      paused: true,
  
      workOutCompleted: false,
      VideoError: false,
      showLeaveBar: false,
      isLeavingSelected: false,
      isIOS: false,
      isFullScreen: false,
      playerMounted: true,
      isClassStarted: false
    };
  }


  componentWillUnmount() {
    // //if (this.state.elapsedTime < 60) {
    // if (this.state.isClassStarted == true) {
    //   this.props.sendPlayDurationToLocalytics(this.state.elapsedTime);
    // }

    //}

    if (this.player) {
      this.player.dispose();
    }
  }
  componentDidMount() {

    var s = document.getElementsByClassName(
      "vjs-remaining-time vjs-time-control vjs-control"
    );

    var elem = s[0].children[1];

    elem.parentNode.removeChild(elem);
    // SendclassDetailtoLocalytics(this.props.videoProps);
    var iOS =
      !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
    this.setState({ isIOS: iOS });
    this.setState({ showLeaveBar: true });
  }

  startVideo = video => {
    this.setState({ loading: false });
    if (video != null) {

      this.player = videojs(video, { autoplay: false, controls: true });
      this.player.on("ready", e => {
        let videoDiv = document.getElementById("video-wrapper").firstChild;
        videoDiv.classList.add("vjs-has-started");
        this.setState({ playerMounted: true })
      })


      this.setState({
        finished: false,
        loading: false,
        paused: this.props.paused
      });

      //sthis.player.play();

      this.player.on("play", e => {
        console.log("Player started")
        this.setState({ paused: false });
        if (this.state.isClassStarted == false) {
          this.props.classStarted();
          this.setState({ classStarted: true }) 
        }
      });
      let elapsedTimer;


      this.player.on("playing", e => {
        this.setState({
          paused: false,
          isLeavingSelected: false,
          VideoError: false
        });
        var starter = this.state.elapsedTime;
        elapsedTimer = setInterval(() => {
          starter++;
          this.setState({ elapsedTime: starter });
        }, 1000);
      }); 
      this.player.on("dispose", e => {
   
        this.props.sendPlayDurationToLocalytics(this.state.elapsedTime);
        this.props.classClosed();
   
        console.log(this.state.elapsedTime);
        this.props.elapsedTimeLiftstateUp(this.state.elapsedTime),
          () => this.setState({ elapsedTime: 0 });
      });
      this.player.on("pause", e => {
        clearInterval(elapsedTimer);
        elapsedTimer = null;
        this.props.elapsedTimeLiftstateUp(this.state.elapsedTime);
        if (!this.state.VideoError) {
          this.setState({
            paused: true
            //isLeavingSelected: false
          });
        }
      });

      this.player.on("ended", e => {
        if (document.fullscreenElement !== undefined && document.fullscreenElement !== null) {
          this.player.exitFullscreen();
        }

        this.setState({
          paused: false,
          isLeavingSelected: false,
          workOutCompleted: true,
          VideoError: false
        });
        clearInterval(elapsedTimer);
        elapsedTimer = null;
        this.props.trackAndLogClass(true, true);
        this.props.elapsedTimeLiftstateUp(this.state.elapsedTime);
      });

      this.player.on("error", e => {
       

        this.state.VideoError = true;
        //}
      });
    }
  };

  resumeHandler = () => {
    this.player.play();
    this.setState({
      paused: false
    });
  };

  leavingClassSelected = () => {
    if (document.fullscreenElement !== undefined && document.fullscreenElement !== null) {
      this.setState({ isFullScreen: true })
      document.exitFullscreen();
    }
    this.player.pause();
    this.setState({
      isLeavingSelected: true
    });
  };

  closeHandler = () => {
    this.props.history.push({ pathname: Routes.classListViewRoute });
  };

  discardHandler = () => {
    console.log("discardHandler")
    this.props.trackAndLogClass(false, true);

    // RRneed to check if user came from deep links
    // use ==> this.props.history.push({ pathname: "/ondemand" });
    //otherwise
  
    if (this.props.location.state != null && this.props.location.state != undefined) {
      window.history.back();
    } else {
      this.props.history.push({ pathname: Routes.classListViewRoute });
    }
  };

  logClassHandler = () => {
    console.log("logClassHandler")
    this.props.trackAndLogClass(true, true);
    this.setState({
      paused: false,
      isLeavingSelected: false, 
      workOutCompleted: true
    });
    //this.props.history.push({ pathname:"/classes" });
  };

  workOutCompleteHandler = () => {
    if (this.props.location.state != null && this.props.location.state != undefined) {
      this.props.history.goBack();
    } else {
      this.props.history.push({ pathname: Routes.classListViewRoute });
    }
  };

  showleaveBarMethod = () => {
    this.setState({ showLeaveBar: true });
    // if (!this.state.paused) {
    //   setTimeout(
    //     function() {
    //       //Start the timer
    //      // this.setState({ showLeaveBar: false }); //After 1 second, set render to true
    //     }.bind(this),
    //     5000
    //   );
    // }
  };

  hideleaveBarMethod = () => {
    if (this.state.paused) {
      this.setState({ showLeaveBar: false });
    }
  };
  ClassDurationTimeBand = min => {
    if (min <= 60) {
      //let min = sec / 60;
      let nearestInt = Math.ceil(min / 10);

      let maxValue = nearestInt * 10;

      return `${maxValue === 10 ? 0 : maxValue - 9}-${maxValue}`;
    } else if (min > 60) {
      return "61+";
    }
  };
  aroundTimeBand = sec => {
    if (sec <= 60) {
      return "0-1";
    } else if (sec > 60 && sec <= 300) {
      return "1-5";
    } else if (sec > 300 && sec <= 600) {
      return "6-10";
    } else if (sec > 600 && sec <= 3660) {
      let min = sec / 60;
      let nearestInt = Math.ceil(min / 10);

      let maxValue = nearestInt * 10;

      return `${maxValue - 9}-${maxValue}`;
    } else if (sec > 3660) {
      return "61+";
    }
  };
  render() {
    return (
      <div>
        <div id='video-wrapper' className="video-wrapper">
          <div data-vjs-player>
            <video
              controls
              preload='none'
              poster={this.props.videoProps.thumbnail}
              playsInline
              ref={this.startVideo}
              className="ClassPlayer video-js vjs-default-skin vjs-matrix"
              onMouseMove={this.showleaveBarMethod}
              onLoadStart={this.showleaveBarMethod}
            >
              <source
                src={this.props.videoProps.url}
                type={this.props.videoProps.type?this.props.videoProps.type:"application/x-mpegURL"}
              />
            </video>
          </div>
          {this.state.playerMounted && <Portal>
            <StripComponent
              isFullScreen={this.props.isFullScreen}
              showleaveBarMethod={this.showleaveBarMethod}
              leavingClassSelected={this.leavingClassSelected}
              videotitle={this.props.videoProps.title}
            />
          </Portal>}
          {
            this.state.isLeavingSelected == false &&
            this.state.paused == false && (
              <Portal>
                <StripComponent
                  isFullScreen={this.props.isFullScreen}
                  showleaveBarMethod={this.showleaveBarMethod}
                  leavingClassSelected={this.leavingClassSelected}
                  videotitle={this.props.videoProps.title}
                />
              </Portal>
            )}
          {this.state.paused == true && this.state.isLeavingSelected == false && (
            <Portal>
              <StripComponent
                isFullScreen={this.props.isFullScreen}
                showleaveBarMethod={this.showleaveBarMethod}
                leavingClassSelected={this.leavingClassSelected}
                videotitle={this.props.videoProps.title}
              />
            </Portal>
          )}

          {this.state.paused && this.state.isLeavingSelected && (
            <Portal>
              <ModalOverVideo

                resumeHandler={this.resumeHandler}
                elapsedTime={this.state.elapsedTime}
                discardHandler={this.discardHandler}
                logClassHandler={this.logClassHandler}
              />
            </Portal>
          )}
          <div className="player-spinner">
            <Fade
              in={this.state.loading}
              style={{
                transitionDelay: this.props.loading ? "800ms" : "0ms",
                backgroundColor: "#fff"
              }}
              unmountOnExit
            >
              <Spinner />
            </Fade>
          </div>
          {this.state.VideoError && <VideoError history={this.props.history} />}
          {this.state.workOutCompleted && (
            <Portal>
              <WorkOutCompleted
                videotitle={this.props.videoProps.title}
                elapsedTime={this.state.elapsedTime}
                workOutCompleteHandler={this.workOutCompleteHandler}
              />
            </Portal>
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(VideoPlayer));
