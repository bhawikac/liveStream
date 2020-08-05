import React, { Component, Fragment } from "react";
import "./ClasslistView.css";
import Workout from "../../../../components/PlayerAndCarousel/Workout/Workout";
import "../../../../../node_modules/react-select/dist/react-select.min.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PageTitle from "../../../../components/PageTitle";
import {
  fetchOnDemandClasses,
  clearFavClassData,
} from "../../../../store/actions/ondemand";
import Spinner from "../../../../components/spinner/spinner";
import Fade from "@material-ui/core/Fade";
import { Translate } from "../../../../utils/Translate";
import { Grid, Typography } from "@material-ui/core";
import Routes from '../../../../components/Router/Routes'

var classObjList = [];

const mapStateToProps = state => {
  return {
    collection: state.onDemand.onDemandCollection,
    isAuthenticated: state.auth.token !== "",
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOnDemandClassesLoad: userId => dispatch(fetchOnDemandClasses(userId)),
    // clearFavClassData: () => dispatch(clearFavClassData()),
  };
};


class ClasslistViewFav extends Component {
  constructor() {
    super();
    this.state = {
      classes: [],
      prevPlayer: null,
      loading: true,
      isPrevPlaying: false,
      isFavStatusChanged: false
    };

  }

  checkFavStatus = (id) => {
    console.log(id)
    let classes = this.state.classes
    let classIndex = classes.findIndex(particularclass => particularclass.id === id)
    classes.splice(classIndex, 1)
    this.setState({ isFavStatusChanged: !this.state.isFavStatusChanged, classes: classes });
  }
  takePreviousPlayer = data => {
    this.setState({ prevPlayer: data });
    console.log(data);
  };

  componentDidMount() {
    var userId = localStorage.getItem("userId");
    if (userId != null || userId != undefined) {
      this.props.onOnDemandClassesLoad(userId);
    } else {
      this.props.onOnDemandClassesLoad("");
    }
    if (this.props.collection != null) {
      if (this.state.classes.length === 0) {
        classObjList = [];
        var itemList = this.GetVideoList(this.props.collection);
        itemList.forEach(c => {
          const obj = {
            id: c.tag,
            thumbnail: c.imageLink,
            title: c.className,
            show: c.isActive,
            category: c.classCategory,
            fav: c.favourite,
            match: true,
            duration: c.durationSecond ? Math.floor(c.durationSecond / 60) : 55,
            provider_id: c.provider,
            url: c.streamingLink,
            key: c.tag,
            description: c.classDescription,
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
          classObjList.push(obj);
        });
      }
      this.setState({ loading: false, classes: classObjList });
    } else {
      this.setState({ loading: true });

    }
  }

  // componentWillUnmount() {
  //   this.props.clearFavClassData();
  //   window.removeEventListener("scroll", this.handleScroll);
  // }
  componentDidUpdate(prevProps) {
    console.log(this.props.collection)
    if (prevProps.collection != this.props.collection !== null && this.props.collection) {
      if (prevProps.collection !== null) {
        if (this.props.collection && this.props.collection.filter((favItems) => favItems.collectionType.toLowerCase() === "favourites")[0].itemCount !==
          prevProps.collection.filter((favItems) => favItems.collectionType.toLowerCase() === "favourites")[0].itemCount) {
          var classObjList = [];
          var itemList = this.GetVideoList(this.props.collection);
          itemList.forEach(c => {
            const obj = {
              id: c.tag,
              thumbnail: c.imageLink,
              title: c.className,
              show: c.isActive,
              category: c.classCategory,
              fav: c.favourite,
              match: true,
              duration: c.durationSecond ? Math.floor(c.durationSecond / 60) : 55,
              provider_id: c.provider,
              url: c.streamingLink,
              key: c.tag,
              description: c.classDescription,
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
            classObjList.push(obj);
          });
          this.setState({ loading: false, classes: classObjList });
        }
      } else {
        var classObjList = [];
        var itemList = this.GetVideoList(this.props.collection);
        itemList.forEach(c => {
          const obj = {
            id: c.tag,
            thumbnail: c.imageLink,
            title: c.className,
            show: c.isActive,
            category: c.classCategory,
            fav: c.favourite,
            match: true,
            duration: c.durationSecond ? Math.floor(c.durationSecond / 60) : 55,
            provider_id: c.provider,
            url: c.streamingLink,
            key: c.tag,
            description: c.classDescription,
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
          classObjList.push(obj);
        });
        this.setState({ loading: false, classes: classObjList });
      }
    }
    else {
      return false;
    }
  }

  // componentWillMount() {
  //   var userId = localStorage.getItem("userId");
  //   if (userId != null || userId != undefined) {
  //     this.props.onOnDemandClassesLoad(userId);
  //   } else {
  //     this.props.onOnDemandClassesLoad("");
  //   }
  // }

  GetVideoList = itemsCollection => {
    if (itemsCollection.length != 0 || itemsCollection != null) {
      var collectionClassData = itemsCollection.filter(d => {
        return d.collectionName.toLowerCase() == "favourites";
      });
      return collectionClassData[0].collectionItems;
    }
  }; 

  onClickHandler = id => {
    const item = this.state.classes.find(cl => cl.id === id);
    if (item.duration)
      item.durationSecond = item.duration * 60
    this.props.history.push({
      pathname: Routes.onDemandClassPlayerRoute + id,
      state: { selectedItem: item,prevPath: Routes.favClassRoute  },
    }); 
  };

  render() {

    let classes;
    if (this.state.classes.length === 0) {
      classes = (
        <div className="flex">
          <Typography variant="body2" className="text-gray">{Translate({ id: "ClassListViews.NoFavMessage" })}</Typography>
        </div>
      );
    } else {
      classes = (
        <Grid container
          justify="flex-start" spacing={4} direction="row" className="clear m-t-xs-5"
        // className="SearchHolder paddingLeft125 paddingLeftFav"
        // style={{ paddingLeft: "3vw !important" }}
        >
          {this.state.classes.map((c, index) =>
            c.show ? (
              <Grid item xs={12} sm={12} md={6} lg={4}
                className="cardAlign" key={Math.random()} >
                <Workout
                  id={c.id}
                  keywords={c.keywords}
                  isPrevPlaying={this.state.isPrevPlaying}
                  takePreviousPlayer={this.takePreviousPlayer}
                  prevPlayer={this.state.prevPlayer}
                  isSearchPageCard={true}
                  creationDate={c.creationDate}
                  trailerLinkMobile={c.trailerLinkMobile}
                  trailerLinkWeb={c.trailerLinkWeb}
                  classCategory={c.category}
                  calories={c.calorieBurn}
                  equipmentTypes={c.equipmentTypes}
                  equipmentNames={c.equipmentNames}
                  key={index}
                  thumbnail={`${c.thumbnail}?width=1200`}
                  url={c.url}
                  title={c.title}
                  duration={c.duration}
                  description={c.description}
                  clicked={() => this.onClickHandler(c.id)}
                  show={true}
                  level={c.level}
                  isFav={c.fav}
                  collectionName={"Favourites"}
                  favCallback={() => { this.checkFavStatus(c.id) }}
                />
              </Grid>
            ) : null
          )}
        </Grid>
      );
    }

    return (
      <div className="page-container">
        {/* <PageTitle label={Translate({ id: "ClassListViews.FavTitle" })} TiltleBackColor="white" />{" "} */}
        <Typography variant="h1" className="m-b-20 m-b-xs-5 p-t-62 clear">
          {Translate({ id: "ClassListViews.FavTitle" })}
        </Typography>
        {this.state.loading ? <Spinner backColor="white" /> :
          classes
        }
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ClasslistViewFav));
