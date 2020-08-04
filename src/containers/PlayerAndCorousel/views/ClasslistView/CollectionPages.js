import React, { Component, Fragment } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "./ClasslistView.css";
import Workout from "../../../../components/PlayerAndCarousel/Workout/Workout";
import "../../../../../node_modules/react-select/dist/react-select.min.css";
import { ClipLoader } from "react-spinners";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  searchOnDemandClass,
  clearSearchData
} from "../../../../store/actions/ondemand";
import { Translate } from "../../../../utils/Translate";
import Spinner from "../../../../components/spinner/spinner";
import Fade from "@material-ui/core/Fade";
var classObjList = [];

const mapStateToProps = state => {
  return {
    collection: state.onDemand.searchedOnDemandClasses,
    selectedOnDemandClass: state.onDemand.selectedOnDemandClass,
    classes: [],
    loading: state.onDemand.searchLoading,
    userId: state.auth.userId,
    isAuthenticated: state.auth.token !== ""
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSearchOndemand: criteria =>
      dispatch(searchOnDemandClass(criteria, false)),
    onClearSearchData: () => dispatch(clearSearchData())
  };
};

class ClasslistViewSearch extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  state = {
    criteria: "",
    classes: [],
    errorMessage: "",
    isSubmitted: false
  };

  componentWillUnmount() {
    this.props.onClearSearchData();
  }

  onClickHandler = id => {
    const item = this.state.classes.find(cl => cl.id === id);
    this.props.history.push({
      pathname:"/classes",
      state: { selectedItem: item }
    });
  };

  handleSubmit = () => {
    if (this.state.criteria != "") {
      this.setState({ isSubmitted: true, classes: [] });
      this.props.onSearchOndemand(this.state.criteria);
    } else {
      this.setState({
        errorMessage: Translate({ id: "ClassListViews.CriteriaRequired" })
      });
    }
  };

  render() {
    if (
      this.props.collection != null &&
      this.props.collection.items.length != 0
    ) {
      if (this.state.classes.length === 0) {
        classObjList = [];
        for (var item, i = 0; (item = this.props.collection.items[i++]); ) {
          var c = item.virtualClass;
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
            skill: c.skill
          };
          classObjList.push(obj);
        }
        this.state.classes = classObjList;
        this.state.loading = false;
      }
    }

    let classes;

    if (this.state.isSubmitted && !this.props.loading) {
      if (this.state.classes.length == 0) {
        classes = (
          <div>
            <p> {Translate({ id: "ClassListViews.NoSearchMessage" })}</p>
          </div>
        );
      } else {
        classes = (
          <div className="SearchHolder">
            {this.state.classes.map((c, index) =>
              c.show ? (
                <Workout
                  key={index}
                  thumbnail={c.thumbnail}
                  url={c.url}
                  title={c.title}
                  duration={c.duration}
                  description={c.description}
                  clicked={() => this.onClickHandler(c.id)}
                  show={true}
                />
              ) : null
            )}
          </div>
        );
      }
    }
    return (
      <Fragment>
        <div className="containerGrey TitleTopMargin">
          <div className="SearchFeildHolder">
            <div className="searchErrorMsg">
              {" "}
              <span className="errorMessage">{this.state.errorMessage}</span>
            </div>
            <TextField
              className="SearchFeildHolderTextFeild"
              label={Translate({ id: "ClassListViews.SearchTitle" })}
              value={this.state.criteria}
              onChange={e =>
                this.setState({ criteria: e.target.value, errorMessage: "" })
              }
              margin="normal"
              variant="outlined"
              style={{ "margin-top": "-6px" }}
            />
            <div className="mobileSerachButtonSeperator" />
            <Button
              type="button"
              variant="contained"
              color="secondary"
              className="button SearchFeildHolderButton"
              onClick={this.handleSubmit}
            >
              {" "}
              {Translate({ id: "ClassListViews.SearchTitle" })}{" "}
            </Button>
          </div>

          <div>
            <Fade
              in={this.props.loading}
              style={{
                transitionDelay: this.props.loading ? "800ms" : "0ms",
                backgroundColor: "#fff"
              }}
              unmountOnExit
            >
              <Spinner backColor="#fff" />
            </Fade>
          </div>

          <div className="clear">&nbsp;</div>
          <div className="indent">{classes}</div>
          <div className="clear" />
        </div>
      </Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ClasslistViewSearch));
