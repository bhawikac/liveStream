import React, { Component, Fragment } from "react";
import Workout from "../Workout/Workout";
import "./Slider.css";
import { Grid, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Translate } from "../../../utils/Translate";
import PageTitle from "../../../components/PageTitle";
import { withRouter } from "react-router-dom";
import { getUserActiveSubscription } from "../../../store/selectors/subscription";
import { connect } from "react-redux";
import config from "../../../assets/config";
import Routes from '../../Router/Routes'

class Slider extends Component {
  constructor(props) {
    super(props);
    this.isAuth = localStorage.getItem("token");
    this.state = {
      isSubscriptionActive: this.props.isSubscriptionActive ? this.props.isSubscriptionActive : false,
      classes: this.props.items || []
    };
  }

  filterItems = () => {
    return this.props.items.filter(c => {
      if (c.collectionName === this.props.collectionName) {
        return c;
      }
      return false;
    });
  }; 

  openCollectionPages = () => {
    this.props.history.push({
      pathname: Routes.collectionViewRoute + this.props.collectionTag,
      state: { selectedCollection: this.props.collectionName },
    });
  };

  getClass = (id) => {
    let reqClass = this.props.items.filter(particularClass => particularClass.tag === id);
    return reqClass[0];
  }

  onClickHandler = (id) => {
    if (!this.props.isAuthenticated) {
      this.props.history.push({ pathname: "/signin" });
      return
    }
    const item = this.getClass(id);
    let video = {
      id: item.tag,
      url: item.streamingLink,
      creationDate: item.creationDate ? item.creationDate : "",
      trailerLinkWeb: item.trailerLinkWeb,
      description: item.classDescription
        ? item.classDescription
        : item.description,
      title: item.className,
      thumbnail: item.imageLink,
      calorieBurn: item.calories,
      duration: item.durationSecond ? item.durationSecond / 60 : item.durationMinutes.split(':')[1],
      durationSecond: item.durationSecond,
      altLink: item.alternateLink,
      fav: item.favourite,
      level: item.level,
      classCategory: item.classCategory,
      newProviderId: item.providerID,
      provider_id: item.provider
    };

    var userActiveSubscription = this.state.isSubscriptionActive;
    if (userActiveSubscription) {
      this.props.history.push({
        pathname: Routes.onDemandClassPlayerRoute + id,
        state: { selectedItem: video, prevPath: Routes.onDemandClassPlayerRoute },
      });
    } else {
      this.props.history.push({ pathname: "/subscribe" });
    }
  };
  checkFavStatus = (id) => {
    console.log(id)
    let classes = this.state.classes
    let classIndex = classes.findIndex(particularclass => particularclass.id === id)
    if (classIndex !== -1) {
      classes[classIndex].favourite = !classes[classIndex].favourite
      this.setState({ classes: classes });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isSubscriptionActive !== this.props.isSubscriptionActive) {
      this.setState({ isSubscriptionActive: this.props.isSubscriptionActive })
    }

  }



  render() {

    var items = this.state.classes
    return (
      <div className="clear">
        <div className="page-container">
          <Grid container direction="row" className="m-t-15 m-b-5">
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <Typography variant="h1" className="align-left clear">
                {this.props.collectionName}
              </Typography>
            </Grid>
            <Grid item lg={6} md={6} sm={6} className="text-right hidden-xs v-center">
              <Button
                className="view-btn"
                color="secondary"
                variant="contained"
                onClick={this.openCollectionPages}
              >
                <Typography variant="h4">
                  {Translate({ id: "ClassListViews.ViewAll" })}
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </div>
        <div className="">
          <div className="page-container">
            <Grid container justify="flex-start" spacing={4} className="cardList">
              {items.map((item, index) => (
                (index < 3) && <Grid item xs={12} sm={12} md={6} lg={4} className="m-b-20" key={Math.random()} >
                  <Workout
                    keywords={item.keywords}
                    isSearchPageCard={false}
                    creationDate={item.creationDate}
                    trailerLinkWeb={item.trailerLinkWeb}
                    trailerLinkMobile={item.trailerLinkMobile}
                    isSliderWorkout={true}
                    history={this.props.history}
                    showFav={this.isAuth ? true : false}
                    thumbnail={`${item.imageLink}?width=1200`}
                    url={item.streamingLink}
                    equipmentTypes={item.equipmentTypes}
                    equipmentNames={item.equipmentNames}
                    isFav={item.favourite}
                    title={item.className}
                    duration={item.durationSecond
                      ? Math.floor(item.durationSecond / 60)
                      : 55}
                    description={item.classDescription}
                    show={true}
                    calories={item.calorieBurn}
                    id={item.tag}
                    classCategory={item.classCategory}
                    key={this.props.collectionName + index}
                    clicked={() => this.onClickHandler(item.tag)}
                    level={item.level}
                    collectionName={this.props.collectionName}
                    favCallback={() => { this.checkFavStatus(item.tag) }}
                  />
                </Grid>
              ))}
            </Grid>
            <div className="hidden-lg clear">
              <Grid container justify="flex-start" spacing={4}>
                <Grid item xs={12} className="m-b-xs-10 clear align-left" >
                  <Button
                    className="view-btn"
                    color="secondary"
                    variant="contained"
                    onClick={this.openCollectionPages}
                  >
                    <Typography variant="h4">
                      {Translate({ id: "ClassListViews.ViewAll" })}
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

const mapStateToProps = state => {
  return {
    userActiveSubscription: getUserActiveSubscription(state),
    userSubscription: state.subscription.userSubscripton,
    isSubscriptionActive: state.subscription.isSubscriptionActive,
    isAuthenticated: state.auth.token != "",
  };
};


export default withRouter(connect(mapStateToProps, null)(Slider));
