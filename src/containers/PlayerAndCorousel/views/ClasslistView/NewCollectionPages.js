import React, { Component, Fragment } from "react";
import { CSSTransition } from "react-transition-group";
import { withRouter } from "react-router-dom";
import "video.js/dist/video-js.css";
import Workout from "../../../../components/PlayerAndCarousel/Workout/Workout";
import { connect } from "react-redux";
import { Grid, Typography } from "@material-ui/core";
import PageTitle from "../../../../components/PageTitle";
import Spinner from "../../../../components/spinner/spinner";
import * as actionTypes from "../../../../store/actions/actionTypes";
import { Translate } from "../../../../utils/Translate";
import Routes from '../../../../components/Router/Routes'
import Fade from "@material-ui/core/Fade";
import { getCollectionById, setDeeplinkCollectionFavUnfavOnLocal } from '../../../../store/actions/ondemand'


var isAuth = localStorage.getItem("token");


const mapStateToProps = state => {
  return {
    collection: state.onDemand.onDemandCollection,
    isSubscriptionActive: state.subscription.isSubscriptionActive,
    isAuthenticated: state.auth.token != "",
    loading: state.onDemand.loading,
    deeplinkCollection: state.onDemand.deeplinkCollection
  };
};

const mapDispatchToProps = dispatch => {
  return {
    classClosed: () => dispatch({ type: actionTypes.CLASS_CLOSED }),
    classStarted: () => dispatch({ type: actionTypes.CLASS_STARTED }),
    storeDeepLinkDataToStore: (id) => dispatch({ type: actionTypes.SAVE_DEEPLINK_PAYLOAD, deeplinkData: id }),
    getCollectionById: () => dispatch(getCollectionById()),
    setDeeplinkCollectionFavUnfavOnLocal: (index) => dispatch(setDeeplinkCollectionFavUnfavOnLocal(index)),
    resetUserCreatedFlag: () => dispatch({ type: actionTypes.RESET_USER_CREATED_FLAG })

  };
};

class CollectionPages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prevPlayer: null,
      collectionName: "",
      classes: null,
      collectionDescription: "",
      isPrevPlaying: false,
      isDeepLink: false,
      loading: false,
      isSubscriptionActive: this.props.isSubscriptionActive ? this.props.isSubscriptionActive : false
    };
    this.collectionNameArray = [];
  }
  takePreviousPlayer = data => {
    this.setState({ prevPlayer: data });
    console.log(data);
  };

  componentWillUnmount() {
    this.props.resetUserCreatedFlag()
  }

  componentDidMount() {

    window.scrollTo(0, 0);
    var item = null;

    if (
      this.props.location.state != undefined ||
      this.props.location.state != null
    ) {
      item = this.props.location.state.selectedCollection;
      if (this.props.collection != null) {

        for (var i = 0; i < this.props.collection.length; i++) {
          if (this.props.collection[i].collectionName == item) {
            this.setState({
              collectionName: item,
              collectionDescription: this.props.collection[i].description,
              classes: this.props.collection[i],
            });
          }
        }
      } else {
        var path = this.props.location.pathname;
        var pathItems = path.split("/");
        this.setState({ isDeepLink: true });

        this.props.getCollectionById();
        //this.props.history.push({ pathname: Routes.classListViewRoute });
      }
    } else if (this.props.deeplinkCollection != null) {
      this.setState({
        isDeepLink: true,
        loading: true,
        collectionName: this.props.deeplinkCollection.collectionName,
        collectionDescription: this.props.deeplinkCollection.description,
        classes: this.props.deeplinkCollection

      });

      //need to handle Fav unfav cases here
      //In next iteration 
    }
    else {
      var path = this.props.location.pathname;

      // if(path){} 
      this.setState({ isDeepLink: true,loading:true });
     // var pathItems = path.split("/");
      this.props.getCollectionById();
       let isDeepLink = this.props.location.state;
      if (isDeepLink == null) {
        this.props.storeDeepLinkDataToStore(path);
      }
      //this.props.history.push({ pathname: Routes.classListViewRoute });
    }
  }
  componentDidUpdate(prevProps) {

    // if (prevProps.collection != this.props.collection) {
    //   if (this.props.collection != null) {

    //     var pathItems = this.props.location.pathname.split("/");
    //     item = this.props.location.state.selectedCollection;
    //     for (var i = 0; i < this.props.collection.length; i++) {
    //       if (this.props.collection[i].collectionName == pathItems[2]) {
    //         this.setState({
    //           collectionName: item,
    //           collectionDescription: this.props.collection[i].description,
    //           classes: this.props.collection[i],
    //         });
    //       }
    //     }
    //   }
    // }
    if (prevProps.collection != this.props.collection) {
      if (this.props.collection != null) {
        var path = this.props.location.pathname;
        var pathItems = path.split("/");
        for (var i = 0; i < this.props.collection.length; i++) {
          if (this.props.collection[i].collectionTag == pathItems[2]) {
            this.setState({
              collectionName: this.props.collection[i].collectionName,
              collectionDescription: this.props.collection[i].description,
              classes: this.props.collection[i],
              loading: false
            });
          }
        }
      }

      // if (this.props.deeplinkCollection != null && this.props.deeplinkCollection != false) {


      //   this.setState({
      //     collectionName: this.props.deeplinkCollection.collectionName,
      //     collectionDescription: this.props.deeplinkCollection.description,
      //     classes: this.props.deeplinkCollection,
      //   });
      // } else {

      //   this.props.history.push({ pathname: "/classes" });
      // }
    }

    if (prevProps.isSubscriptionActive !== this.props.isSubscriptionActive) {
      this.setState({ isSubscriptionActive: this.props.isSubscriptionActive })
    }
  }


  browseCollectionClick = () => {
    this.GetColectionTags(this.props.collection);
    this.props.history.push({
      pathname: "/browse",
      state: { collectionArray: this.collectionNameArray, },
    });
  };

  GetColectionTags(itemCollection) {
    if (itemCollection != null || itemCollection.length != 0) {
      let lookup = {};
      for (var item, i = 0; (item = itemCollection[i++]);) {
        console.log(item);
        var name = item.collectionName;
        if (!(name in lookup)) {
          lookup[name] = 1;
          this.collectionNameArray.push({ collectionName: name, collectionTag: item.collectionTag });
        }
      }
    }
  }

  closeHandler = () => {
    this.props.history.goBack();
  };
  onClickHandler = (index, id, collectionName) => {

    if (!this.props.isAuthenticated) {
      var path = this.props.location.pathname;
      let isDeepLink = this.props.location.state;
      if (isDeepLink == null) {
        this.props.storeDeepLinkDataToStore(path);
      }
      this.props.history.push({ pathname: "/signin" });
      return
    }

    if (this.state.isSubscriptionActive) {
      const item = this.state.classes.collectionItems[index];
      console.log(item);
      this.props.history.push({
        pathname: Routes.onDemandClassPlayerRoute + id,
        state: { selectedItem: item, collectionName },
      });
    } else {
      this.props.history.push({ pathname: "/subscribe" });
    }
  };
  deepLinkFavUnfav = (index, id) => {
    console.log(index);
    console.log(this.state.classes.collectionItems[index]);
    this.props.setDeeplinkCollectionFavUnfavOnLocal(index);
  }
  render() {
    return (
      <React.Fragment>
        {this.props.loading || this.state.loading ? <div className="clipLoaderDiv">

          <Spinner backColor="#fff" />

        </div> :


          <Grid container
            direction="column"
            className="ie-container-flex"
          >
            <Grid item>
              <div className="page-container m-t-15 m-b-5">
                {this.state.isDeepLink == false &&
                  <Typography variant="h3" color="secondary" className="text-right" style={{ minHeight: "30px" }}>
                    <label className="hide-xs browse-label">{Translate({ id: "ClassListViews.BrowseCollections" })}</label>
                    <img
                      className="customClose down-arrow btn-default"
                      src={require("../../../../assets/images/arrow-down.svg")}
                      onClick={this.browseCollectionClick}
                    />
                  </Typography>
                }
                {/* <PageTitle label={this.state.collectionName} className="m-b-20" /> */}
                <Typography variant="h1" className="m-b-xs-10">
                  {this.state.collectionName}
                </Typography>
                {this.state.collectionName.toLowerCase() !== "featured" &&
                  <Typography variant="h6" className="text-gray m-b-20 m-b-xs-10">
                    {this.state.collectionDescription}
                  </Typography>}
              </div>
              <div className="bgContainer2 m-t-xs-20 m-t-15 p-t-32 p-t-xs-16 top0">
                <div className="page-container">
                  <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    className=""
                  >

                    <Grid item>
                      <div className="indent">
                        <Grid container
                          direction="column"
                          justify="center"
                          alignContent="center"
                          alignItems="center"
                        >
                          <Grid item />
                          <Grid item>
                            <Grid container justify="flex-start" spacing={4} direction="row">
                              {this.state.classes != null &&
                                this.state.classes.collectionItems.map((c, index) => (
                                  <Grid item xs={12} sm={12} md={6} lg={4}
                                    className="cardAlign" key={Math.random()} >
                                    <Workout
                                      creationDate={c.creationDate}
                                      isSearchPageCard={false}
                                      isPrevPlaying={this.state.isPrevPlaying}
                                      takePreviousPlayer={this.takePreviousPlayer}
                                      prevPlayer={this.state.prevPlayer}
                                      trailerLinkMobile={c.trailerLinkMobile}
                                      trailerLinkWeb={c.trailerLinkWeb}
                                      classCategory={c.classCategory}
                                      styledClass="CollectionPageCardButton "
                                      calories={c.calorieBurn}
                                      equipmentTypes={c.equipmentTypes}
                                      equipmentNames={c.equipmentNames}
                                      isFav={c.favourite}
                                      showFav={isAuth ? true : false}
                                      key={index}
                                      thumbnail={`${c.imageLink}?width=1200`}
                                      url={c.streamingLink}
                                      title={c.className}
                                      duration={
                                        c.durationSecond
                                          ? Math.floor(c.durationSecond / 60)
                                          : 55
                                      }
                                      // favCallback={() => this.deepLinkFavUnfav(index, c.tag,)}
                                      description={c.classDescription}
                                      id={c.tag}
                                      clicked={() => this.onClickHandler(index, c.tag, this.props.history.location.state ? this.props.history.location.state.selectedCollection : "")}
                                      show={true}
                                      level={c.level}
                                      collectionName={this.props.history.location.state ? this.props.history.location.state.selectedCollection : ""}
                                    />
                                    {/* </div> */}
                                  </Grid>)
                                )}
                              {/* </div> */}
                            </Grid>
                          </Grid>
                          <Grid item />
                        </Grid>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </Grid>
          </Grid>
        }
      </React.Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CollectionPages));
