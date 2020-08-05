import React, { Component, Fragment } from "react";
import "./ClasslistView.css";
import Workout from "../../../../components/PlayerAndCarousel/Workout/Workout";
import "../../../../../node_modules/react-select/dist/react-select.min.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PageTitle from "../../../../components/PageTitle";
import { getUserRecentActivity } from "../../../../store/actions/workout";
import { searchOnDemandClass, FetchClubLiveConnect } from "../../../../store/actions/ondemand";
import { workoutResultType } from "../../../../utils/constants";
import { Translate } from "../../../../utils/Translate";
import { Grid, Typography } from "@material-ui/core";
import Fade from "@material-ui/core/Fade";
import Spinner from "../../../../components/spinner/spinner";
import config from "../../../../assets/config";
import Routes from '../../../../components/Router/Routes'

const mapStateToProps = state => {
  return {
    recentActivities: state.workout.recentActivities,
    collectionObject: state.onDemand.onDemandCollection,
    collection: state.onDemand.recentOnDemandClasses,
    userId: state.auth.userId,
    isAuthenticated: state.auth.token != "",
    loading: state.workout.loading,
    clubClasses: state.onDemand.clubClasses,

  };
};

const mapDispatchToProps = dispatch => {
  return {
    OngetUserRecentActivity: () => dispatch(getUserRecentActivity()),
    onSearchOndemand: criteria => dispatch(searchOnDemandClass(criteria, true)),
    fetchClubLiveConnectClasses: () => dispatch(FetchClubLiveConnect()),

  };
};

class ClasslistViewRecent extends Component {
  state = {
    criteria: "",
    isPrevPlaying: false,
    prevPlayer: null,
    classes: [],
    RecentObjList: null,
    loading: true,
  };

  componentDidMount() {
    config.ShowLiveConnect && this.props.fetchClubLiveConnectClasses();
    this.props.OngetUserRecentActivity();
  }

  takePreviousPlayer = data => {
    this.setState({ prevPlayer: data });
  };


  GetCollectionTags(itemCollection) {
    if (itemCollection != null && itemCollection != undefined) {
      if (itemCollection != null || itemCollection.length != 0) {
        var recentObjList = [];
        for (var item, i = 0; (item = itemCollection[i++]);) {
          if (item.trackingResult === workoutResultType.VirtualClass ||
            item.trackingResult === workoutResultType.ClubConnectVideo) {

            var obj = {
              thumbnail: item.imageUrl,
              title: item.workoutName,
              durationSecond: item.durationSeconds,
              id: item.userWorkoutTag,
              show: true,
              creationDate: item.creationDate,
              trailerLinkMobile: item.trailerLinkMobile,
              trailerLinkWeb: item.trailerLinkWeb,
              equipmentTypes: item.equipmentTypes,
              equipmentNames: item.equipmentNames,
              newProviderId: item.providerID,
              category: item.classCategory,
              description: item.workoutDescription,
              level: item.level,
              isClubConnect: item.trackingResult === workoutResultType.ClubConnectVideo ? true : false

            };
            if (this.props.collectionObject) {
              var favColloectionIndex = this.props.collectionObject.findIndex((favColloection) => favColloection.collectionName === "Favourites")
              if (this.props.collectionObject[favColloectionIndex].collectionItems.findIndex(reqclass => reqclass.tag === item.userWorkoutTag) > -1) {
                obj.isFav = true
              }
            }
            recentObjList.push(obj);
          }
          this.setState({ RecentObjList: recentObjList });
        }
      }
    }
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.recentActivities != this.props.recentActivities
    ) {
      this.GetCollectionTags(this.props.recentActivities);

    }

    if (
      prevProps.collection != this.props.collection
    ) {
      let obj;

      if (
        this.props.collection != null &&
        this.props.collection.items.length != 0
      ) {
        var c = this.props.collection.items[0].virtualClass;

        if (c != null || c != undefined) {
          obj = {
            id: c.tag,
            thumbnail: c.imageLink,
            title: c.className,
            show: c.isActive,
            category: c.classCategory,
            fav: c.favourite,
            match: true,
            durationSecond: c.durationSecond,
            provider_id: c.provider,
            url: c.streamingLink,
            key: c.tag,
            description: c.classDescription
              ? c.classDescription
              : c.description,
            instructor: c.instructor,
            calories: c.calorieBurn,
            alternateLink: c.alternateLink,
            intensity: c.intensity,
            skill: c.skill,
            creationDate: c.creationDate,
            trailerLinkMobile: c.trailerLinkMobile,
            trailerLinkWeb: c.trailerLinkWeb,
            equipmentTypes: c.equipmentTypes,
            equipmentNames: c.equipmentNames,
            newProviderId: c.providerID,
            keywords: c.keywords,
            level: c.level
          };
        }
        if (obj != null || obj != undefined) {
          console.log(obj)
          this.props.history.push({
            pathname: Routes.onDemandClassPlayerRoute + obj.id,

            state: { selectedItem: obj, prevPath: Routes.recentActivityRoute },
          });
        }
      }
    }
  }
  onClickHandler = (id, classObj) => {
    if (classObj.isClubConnect) {
      console.log(classObj)
      let clubConnectClass = this.props.clubClasses && this.props.clubClasses.data.filter((reqClass) => reqClass.id === classObj.id)
      classObj.durationSecond = clubConnectClass.length > 0 ? clubConnectClass[0].duration : null
      classObj.url= clubConnectClass.length > 0 ? clubConnectClass[0].streamingLink : null
      let video = {
        id: classObj.id,
        url: classObj.url,
        creationDate: classObj.creationDate,
        trailerLinkWeb: classObj.trailerLinkWeb,
        description: classObj.description,
        title: classObj.title,
        thumbnail: classObj.thumbnail,
        durationSecond: classObj.durationSecond,
      };
      this.props.history.push({
        pathname: Routes.connectClassPlayerRoute + classObj.id,
        state: { selectedItem: video, isClubConnect: true, prevPath: Routes.recentActivityRoute },
      });
    }
    else if (id != "" || id != null) {
      this.props.onSearchOndemand(id, true)
    }
  };

  render() {


    let classes;
    if (
      this.state.RecentObjList === null ||
      this.state.RecentObjList.length == 0
    ) {
      classes = (
        <div className="flex">
          <Typography variant="body2" className="text-gray">{Translate({ id: "ClassListViews.NoRecentMessage" })}</Typography>
        </div>
      );
    }
    else {
      classes = (
        <Grid container justify="flex-start" spacing={4} direction="row">
          {this.state.RecentObjList.map((c, index) =>
            c.show ? (
              <Grid item xs={12} sm={12} md={6} lg={4}
                className="cardAlign m-t-xs-20" key={Math.random()}>
                <Workout
                  id={c.id}
                  keywords={c.keywords}
                  isSearchPageCard={true}
                  isPrevPlaying={this.state.isPrevPlaying}
                  prevPlayer={this.state.prevPlayer}
                  creationDate={c.creationDate}
                  takePreviousPlayer={this.takePreviousPlayer}
                  trailerLinkWeb={c.trailerLinkWeb}
                  classCategory={c.category}
                  calories={c.calorieBurn}
                  equipmentTypes={c.equipmentTypes}
                  equipmentNames={c.equipmentNames}
                  thumbnail={`${c.thumbnail}?width=1200`}
                  url={c.url}
                  title={c.title}
                  key={index}
                  duration={c.durationSecond
                    ? Math.floor(c.durationSecond / 60)
                    : 55}
                  description={c.description}
                  clicked={() => this.onClickHandler(c.id, c)}
                  show={true}
                  level={c.level}
                  collectionName={"MyRecentActivity"}
                  isFav={c.isFav}
                  isClubConnect={c.isClubConnect}
                />
              </Grid>
            ) : null
          )}
        </Grid>
      );
    }


    return (
      <div className="page-container">
        {/* <PageTitle label={Translate({ id: "ClassListViews.RecentTitle" })} TiltleBackColor="white" /> */}
        <Typography variant="h1" className="m-b-20 p-t-62">
          {Translate({ id: "ClassListViews.MyActivity" })}
        </Typography>
        {this.props.loading ? <Spinner backColor="#fff" /> : classes}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ClasslistViewRecent));
