import React from "react";
import Workout from "../PlayerAndCarousel/Workout/Workout";
import { Grid, Typography } from "@material-ui/core";
/* import InfiniteScroll from "react-infinite-scroller"; */
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../spinner/spinner";
import { Translate } from "../../utils/Translate";
import { withRouter } from "react-router";
import Routes from '../Router/Routes'

class SearchPageCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPrevPlaying: false,
      prevPlayer: null,
      isScrolling: false,
    };
    this.loadMore = this.loadMore.bind(this);
  }
  loadMore = () => {
    this.props.skippedSearch();
  };

  takePreviousPlayer = data => {
    this.setState({ prevPlayer: data });
    console.log(data);
  };

  onClickHandler = (id, isFav) => {
    const item = this.props.classes.find(cl => cl.id === id);
    item.isFav = isFav
    if (item.duration)
      item.durationSecond = item.duration * 60;
    console.log(item);
    this.props.history.push({
      pathname: Routes.onDemandClassPlayerRoute + id,
      state: { selectedItem: item, prevPath: Routes.searchRoute },
    });
  };
  checkFavStatus = (id) => {

    let classes = this.props.classes
    let classIndex = classes.findIndex(particularclass => particularclass.id === id)
    if (classIndex !== -1) {
      classes[classIndex].isFav = !classes[classIndex].isFav
      // this.setState({classes: classes });
    }
  }
  render() {
    return (
      <React.Fragment>
        <div className="displayInlineB m-t-55">
          <span>
            <Typography variant="subtitle2">
              {this.props.totalSearchResults}&nbsp;
              {this.props.classes.length == 1 ? Translate({ id: "ClassListViews.class" }) : Translate({ id: "ClassListViews.classes" })}
            </Typography>
          </span>
        </div>
        <div className="displayInlineB">
          <span
            onClick={() => this.props.clearFilter()}
            className="Clear-filters"
          >
            <Typography variant="subtitle2" color="secondary">
              {Translate({ id: "ClassListViews.ResetFilters" })}
            </Typography>
          </span>
        </div>
        <div>
          <InfiniteScroll
            style={{ color: "white", overflow: "hidden" }}
            scrollThreshold="50%"
            dataLength={this.props.classes.length}
            next={this.loadMore}
            hasMore={this.props.itemsRemaining}
            loader={
              <Spinner
                areCards={this.props.classes.length > 0 ? true : false}
                backColor="white"
              />
            }
            endMessage={
              <p style={{ display: "none" }}>
                <b />
              </p>
            }
          >

            <Grid container justify="flex-start" spacing={4} direction="row">
              {this.props.classes.map((c, index) => (
                <Grid item xs={12} sm={12} md={6} lg={4}
                  className="cardAlign" key={Math.random()}>
                  <Workout
                    id={c.id}
                    isCatFilter={this.props.isCatFilter}
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
                    //thumbnail={c.thumbnail}
                    thumbnail={`${c.thumbnail}?width=1200`}
                    url={c.url}
                    title={c.title}
                    duration={c.duration}
                    description={c.description}
                    clicked={() => this.onClickHandler(c.id, c.isFav)}
                    show={true}
                    isFav={c.isFav}
                    level={c.level}
                    favCallback={() => { this.checkFavStatus(c.id) }}

                  />
                </Grid>
              ))}
            </Grid>
          </InfiniteScroll>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(SearchPageCards);
