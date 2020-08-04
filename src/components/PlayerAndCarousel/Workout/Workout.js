import React, { PureComponent, Component } from "react";
import "./Workout.css";
import Grid from "@material-ui/core/Grid";
import Timeicon from "../../../assets/images/timer.svg";
import skillLevel from "../../../assets/images/skill.svg";
import favouriteIcon from "../../../assets/images/favorite.png";
import PlayArrow from "@material-ui/icons/PlayArrow";
import Pause from "@material-ui/icons/Pause";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import {
  setClassFavourite, setClassFavouriteOnLocalColletion,
  fetchIntensity,
  savePrevPlayer,
} from "../../../store/actions/ondemand";
import { Button, Typography } from "@material-ui/core";
import { isMobile } from "react-device-detect";
import NewButton from "./NewButton";
import { differenceInCalendarDays, parse } from 'date-fns'
var config = require("../../../assets/config.json");

const style = {
  pausedButton: {
    width: ".8em",
    height: ".8em",
    marginTop: "-1px",
  },

  newButton: {
    maxWidth: "30px !important",
    minWidth: "29px",
    paddingLeft: "0px",
    paddingRight: "0px",
    fontSize: "8px",
    fontWeight: "500",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "2",
    "& span": {
      paddingLeft: "4px",
      justifyContent: "flex-start",
    },
  },
};
const mapStateToProps = state => {
  return {
    prevPlayer: state.onDemand.prevPlayer

  };
};
const mapDispatchToProps = dispatch => {
  return {
    savingPrevPlayer: player => dispatch(savePrevPlayer(player)),
    onsetClassFavourite: (selectedClassTag, userId, isSettingFavourite) =>
      dispatch(setClassFavourite(selectedClassTag, userId, isSettingFavourite)),
    onLoadIntensity: () => dispatch(fetchIntensity()),
    onsetClassFavouriteLocal: (selectedCollection, classId, isSettingFavourite) =>
      dispatch(setClassFavouriteOnLocalColletion(selectedCollection, classId, isSettingFavourite))
  };
};


class Workout extends Component {
  constructor(props) {
    super(props);
    this.token = localStorage.getItem("token");
    // this.pauseVideo = this.pauseVideo;
    // this.startVideo = this.startVideo;
    // this.player;
    this.myRef = React.createRef();

    this.state = {
      isClassFav: this.props.isFav || false,
      selectedItem: "",
      isPlaying: false,
      isClassNew: false,
      isPlayerAvailable: false,
      prevPlayer: null,
    };
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.pause();
    }
  }
  // startTrail = video => {
  //   this.player = new Plyr(video);
  //   this.player.on("pause", e => {
  //     this.setState({ isPlaying: false });
  //   });
  // };

  componentDidMount() {
    this.isNewCardFn(this.props.creationDate);
  }

  // getClass=()=>{
  //   dispatch
  //   let reqCollection= this.state.collection.filter((particularCollection)=> particularCollection.collectionName === this.props.collectionName);
  //   let reqClass=reqCollection[0].collectionItems.filter(particularClass=>particularClass.tag=== this.props.id);
  //   return reqClass;
  // }

  // startVideo = () => {
  //   if (this.token != null) {
  //     if (!this.state.isPlaying) {
  //       if (this.props.prevPlayer != null) {
  //         this.props.prevPlayer.pause();
  //       } else {
  //         if (!this.props.isSearchPageCard) {

  //         }
  //       }
  //       if (this.state.isPlayerAvailable == false) {
  //         const node = this.myRef.current;
  //         this.startTrail(node);
  //         this.setState({ isPlayerAvailable: true });
  //       }

  //       this.player.play();
  //       this.setState({ isPlaying: true }, () => {
  //         this.props.savingPrevPlayer(this.player);
  //       });
  //     } else if (this.state.isPlaying) {
  //       if (this.player != undefined) {
  //         this.player.pause();

  //       }
  //     }
  //   } else {
  //     this.props.history.push({
  //       pathname: "/signin",
  //     });
  //   }
  // };
  startVideo = (video) => {
    var playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise.then(_ => {
        // Automatic playback started!
        // Show playing UI.
        console.log("video started")
      })
        .catch(error => {
          // Auto-play was prevented
          // Show paused UI.
          console.log("video Downloading")
        });
    }
  }
  favVideo = () => {
    if (this.props.favCallback) {
      this.props.favCallback();
    }
    console.log(this.props.collectionName)
    var userId = localStorage.getItem("userId");
    console.log("id", this.props.id)
    this.props.onsetClassFavouriteLocal(this.props.collectionName, this.props.id, true)
    this.props.onsetClassFavourite(this.props.id, userId, true);
    this.setState({ isClassFav: true });
  };
  unfavVideo = () => {
    if (this.props.favCallback) {
      this.props.favCallback();
    }
    this.setState({ isClassFav: false });
    var userId = localStorage.getItem("userId");
    this.props.onsetClassFavouriteLocal(this.props.collectionName, this.props.id, false)
    this.props.onsetClassFavourite(this.props.id, userId, false);
  };

  isNewCardFn = (creationDate) => {
    let date = parse(creationDate);
    let difference = differenceInCalendarDays(new Date(), date);
    if (difference < config.numberOfDaysToShowNewOnWorkoutCard) {
      this.setState({
        isClassNew: true
      })
    }
  }
  render() {
    var timer;
    return (

      <Grid container item className=""
      >
        <div className="workoutPlayer">
          <video
            style={{
              backgroundColor: this.state.isPlaying ? "#000" : "transparent", objectFit: "cover",
              width: "100%"
            }}
            preload="none"
            loop
            playsInline
            ref={this.myRef}
            className="Trailer thumbnail"
            poster={this.props.thumbnail}
            onClick={this.props.clicked}
            // onMouseOver={e=>e.target.play()}
            // onMouseOut={e => e.target.pause()}
            onMouseOver={(e) => this.startVideo(e.target)}
            onMouseOut={e => e.target.pause()}
          >
            <source
              src={
                this.props.trailerLinkMobile
                  ? this.props.trailerLinkMobile
                  : this.props.trailerLinkWeb
                    ? this.props.trailerLinkWeb
                    : this.props.url
              }
              type={
                this.props.trailerLinkMobile || this.props.trailerLinkWeb
                  ? "video/mp4"
                  : "application/x-mpegURL"
              }
            />
          </video>
        </div>
        {/* {this.props.trailerLinkWeb && (
          <Button
            className={
              this.props.isSearchPageCard
                ? "trailerButton"
                : "slidertrailerButton"
            }
            style={{
              borderRadius: "2px",
              textTransform: "uppercase",
              // position: "absolute",
              padding: "0px",
              marginLeft: "20px",
              maxWidth: "90px",
              maxHeight: "25px",
              zIndex: "50000000000 !important",
              backgroundColor: "rgb(0, 0, 0, 0.3)",
              border: "none !important"
            }}
            onClick={() => this.startVideo()}
            color="secondary"
            variant="outlined"
          >
            {this.state.isPlaying ? (
              <Pause className={this.props.classes.pausedButton} />
            ) : (
                <PlayArrow className={this.props.classes.pausedButton} />
              )}
            <Typography variant="h4">Trailer</Typography>
          </Button>
        )} */}
        <div className="workout-footer" >
          <Grid container justify="flex-start" direction="row">
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Grid container direction="row" className="m-t-15 m-t-xs-15">
                <Grid item lg={11} md={11} sm={11} xs={11}>
                  <Typography variant="subtitle1" className="workout-footer-p">
                    {this.props.title}
                  </Typography>
                  {this.state.isClassNew && <NewButton />}
                </Grid>
                {!this.props.isClubConnect && <Grid item lg={1} md={1} sm={1} xs={1} className="text-right">
                  {this.state.isClassFav && (
                    <CSSTransition
                      classNames="slide"
                      timeout={10}
                      mountOnEnter
                      unmountOnExit
                      in={true}
                      onClick={this.unfavVideo}
                    >
                      <Button className="fvrt-star">

                        <img
                          className="favButton"
                          src={require("../../../assets/images/unfav-copy.svg")}
                        />

                      </Button>
                    </CSSTransition>
                  )}
                  {!this.state.isClassFav && (
                    <CSSTransition
                      classNames="slide"
                      timeout={10}
                      mountOnEnter
                      unmountOnExit
                      in={true}
                      onClick={this.favVideo}
                    >
                      <Button className="fvrt-star"
                        variant="text"
                      >

                        <img
                          className="favButton"
                          src={require("../../../assets/images/unfav.svg")}
                        />

                      </Button>
                    </CSSTransition>
                  )}
                </Grid>}
              </Grid>
            </Grid>
          </Grid>
          <div
            className="cardDescription-slider"
          >
            {this.props.description != null && (
              <Typography variant="body2" className="cardDescription-p text-gray m-tb-5 m-b-10">
                {window.screen.width < 450
                  ? this.props.description.substring(0, 125)
                  : window.screen.width > 2200
                    ? this.props.description.substring(0, 125)
                    : this.props.description.substring(0, 125)}
                {window.screen.width < 450
                  ? this.props.description[125] != null && <em> ...</em>
                  : (window.screen.width > 2200
                    ? this.props.description[125]
                    : this.props.description[125]) != null && <em> ...</em>}
              </Typography>
            )}
          </div>
          <Grid container justify="flex-start" direction="row">
            <Grid item>
              <Grid container direction="row" className="m-tb-5">
                <Grid item>
                  <Typography variant="body2">
                    {this.props.duration === 0 || this.props.duration ? this.props.duration : "00:49:00"}{" "}
                        mins
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              {this.props.level && <Grid container direction="row" className="m-tb-5">
                <Grid item className="discIcon">
                  <Typography variant="body2"
                  >
                    {this.props.level}
                  </Typography>
                </Grid>
              </Grid>}
            </Grid>
          </Grid>
        </div>
      </Grid>

    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(Workout));
