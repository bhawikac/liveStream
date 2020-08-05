import React, { Component, Fragment } from "react";
import "./ClasslistView.css";
import { MdNewReleases } from "react-icons/lib/md";
import "../../../../../node_modules/react-select/dist/react-select.min.css";

import Slider from "../../../../components/PlayerAndCarousel/Slider/Slider";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchOnDemandClasses,
  clearClassData,
  FetchClubLiveConnect,
  FetchLSConnectHome
} from "../../../../store/actions/ondemand";
import Fade from "@material-ui/core/Fade";
import Spinner from "../../../../components/spinner/spinner";
import { Grid, Typography } from "@material-ui/core";
import { Translate } from "../../../../utils/Translate";
import { GetUserSubscription } from "../../../../store/actions/subscription";
import { getUserActiveSubscription } from "../../../../store/selectors/subscription";
import config from "../../../../assets/config";
// import ClubPage from "../../../LiveConnect/ClubPage";
import ClubPage from "../../../LiveStreaming/LiveStreamHome";
import Button from "@material-ui/core/Button";

import ClassOfTheDay from '../../../../components/PlayerAndCarousel/ClassOfTheDay/ClassOfTheDay'

const mapStateToProps = state => {
  return {
    collection: state.onDemand.onDemandCollection,
    selectedOnDemandClass: state.onDemand.selectedOnDemandClass,
    classes: [],
    clubClasses: state.onDemand.LSHomeClasses,
    loading: state.onDemand.loading,
    isAuthenticated: state.auth.token !== "",
    isNewUser: state.auth.userCreated,
    userActiveSubscription: getUserActiveSubscription(state),
    userSubscription: state.subscription.userSubscripton,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOnDemandClassesLoad: userId => dispatch(fetchOnDemandClasses(userId)),
    clearClassData: () => dispatch(clearClassData()),
    fetchClubLiveConnectClasses: () => dispatch(FetchClubLiveConnect()),
    loadUserSubscription: () => dispatch(GetUserSubscription()),
    FetchLSConnectHome: () => dispatch(FetchLSConnectHome())
  };
};

class ClasslistView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      collection: [],
      clubClasses: [],

    };
    this.collectionNameArray = [];
  }

  componentDidMount() {
    // window.scrollTo(0, 0);
    console.log("query" + JSON.stringify(this.props.match.params))
    config.showLiveEvent || config.ShowLiveConnect ? this.props.FetchLSConnectHome():"";
    // !config.showLiveEvent && config.ShowLiveConnect && this.props.fetchClubLiveConnectClasses();
    this.props.clearClassData();
    this.setState({ loading: true });
    var userId = localStorage.getItem("userId");

    if (userId != null || userId != undefined) {
      console.log(this.props.location)

      if (this.props.isNewUser == false) {
        this.props.loadUserSubscription();
      }

      this.props.onOnDemandClassesLoad(userId);
    } else {
      this.props.onOnDemandClassesLoad("");
    }
    this.setState({ classes: [] });

  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.collection != this.props.collection &&
      this.props.collection != null
    ) {
      this.setState({ collection: this.props.collection })
    }
    if (prevProps.clubClasses !== this.props.clubClasses) {
      this.setState({ clubClasses: this.props.clubClasses.data })

    }

  }
  viewAllClick = () => {
    this.props.history.push({
      pathname: "/connect/clubList",
      state: { clubClasses: this.state.clubClasses },
    });
  };

  browseCollectionClick = () => {
    this.GetCollectionTags(this.props.collection);
    this.props.history.push({
      pathname: "/browse",
      state: { collectionArray: this.collectionNameArray },
    });
  };
  GetCollectionTags(itemCollection) {
    if (itemCollection != null || itemCollection.length != 0) {
      let lookup = {};
      for (var item, i = 0; (item = itemCollection[i++]);) {
        var name = item.collectionName;
        if (!(name in lookup)) {
          lookup[name] = 1;
          this.collectionNameArray.push(name);
        }
      }
    }
  }

  render() {
    /* Server error */
    let classes;
    if (this.state.collection.length === 0 && !this.state.loading) {
      classes = (
        <div className="flex" style={{ marginTop: "20px" }}>
          <MdNewReleases
            style={{
              width: "60px",
              height: "60px",
              margin: "0 10px",
              display: "none",
            }}
          />
          <h4>
            {Translate({ id: "ClassListViews.NoClassesFound" })}
          </h4>
        </div>
      );
    }
    var collectionArray = this.state.collection;
    return (
      <Fragment>

        {
          config.ShowLiveConnect ?
            this.state.clubClasses.length > 0 ?
              <Fragment>
                <ClubPage clubClasses={this.state.clubClasses}></ClubPage>
              </Fragment>
              : null
            : null}
        <Grid
          direction="column"
          container className="m-t-15"
        >
          <Grid item>
            {/* 
            Browse Collection button on home page
            */}
            {/* <div className="page-container m-t-15 m-b-5">
                <Typography variant="h3" color="secondary" className="text-right">
                  <label className="hide-xs browse-label">{Translate({ id: "ClassListViews.BrowseCollections" })}</label>

                  <img
                    className="customClose down-arrow btn-default"
                    src={require("../../../../assets/images/arrow-down.svg")}
                    onClick={this.browseCollectionClick}
                  />
                </Typography>
                <img
                  className="mobileArrow" style={{
                    position: "absolute",
                    right: "0",
                    transform: "rotate(-90deg)"
                  }}
                  src={require("../../../../assets/images/arrow-down-green.svg")}
                  onClick={this.browseCollectionClick}
                />
              </div> */}
          </Grid>
          <ClassOfTheDay collectionArray={collectionArray} history={this.props.history} />
          <Grid item style={{ width: "inherit" }}>
            <div>
              <div className="indent">{collectionArray && collectionArray.length > 0 && collectionArray.map(
                collection => (
                  (collection.collectionName.toLowerCase() != "favourites") &&
                  (collection.collectionType.toLowerCase() != "classoftheday") &&
                  <Slider
                    key={Math.random()}
                    collectionTag={collection.collectionTag}
                    collectionName={collection.collectionName}
                    items={collection.collectionItems}
                    clicked={this.onClickHandler}
                    description={collection.description}
                  />
                ))}</div>
              <Fade
                in={this.props.loading}
                style={{
                  transitionDelay: this.props.loading ? "800ms" : "0ms",
                  backgroundColor: "transparent",
                }}
                unmountOnExit
              >
                <Spinner backColor="#fff" />
              </Fade>
            </div>
          </Grid>
          <Grid item />
        </Grid>
      </Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ClasslistView));
