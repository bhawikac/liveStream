import React, { Component, Fragment } from "react";
import Button from "@material-ui/core/Button";
import "./ClasslistView.css";

import "../../../../../node_modules/react-select/dist/react-select.min.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  searchOnDemandClass,
  clearSearchData,
  clearCategorySearchData,
  changeSkippedState,
  storeSearchParams,
} from "../../../../store/actions/ondemand";
import { Translate } from "../../../../utils/Translate";
import withStyles from "@material-ui/core/styles/withStyles";
import InputBase from "@material-ui/core/InputBase";
import InputAdornment from "@material-ui/core/InputAdornment";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Grid, Typography } from "@material-ui/core";
import SearchPageCards from "../../../../components/SearchPageComponents/SearchPageCards";
import SearchPageSelector from "../../../../components/SearchPageComponents/SearchPageSelectors";
import * as actionTypes from "../../../../store/actions/actionTypes";
import Fade from "@material-ui/core/Fade";
import Spinner from "../../../../components/spinner/spinner";
import Routes from '../../../../components/Router/Routes';

const config = require('../../../../assets/config.json')
const translatedFile = require(`../../../../assets/translations/${config.language}.json`);

const TextFieldStyle = {
  progress: {
    "& svg": {
      width: "2em",
      height: "2em",
    },
  },
  textField: {
    /* borderBottom: "green" */
  },
  tabsRoot: {
    borderBottom: "none",
  },
  tabsIndicator: {
    color: "transparent",
    backgroundColor: "transparent",
  },
  tabRoot: {
    textTransform: "capitalize",
    fontSize: "28px",
    fontWeight: "normal",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: " 1.14",
    letterSpacing: "-0.2px",
    minWidth: "80px",
    color: localStorage.getItem("clientcolor"),    
    ['@media (max-width:720px)']:{
      fontSize: "20px"
    },
    "&$tabSelected": {
      color: "#8e8e93",
      cursor: "default",
    },    
  },
  tabSelected: {},
};

const mapStateToProps = state => {
  return {
    collection: state.onDemand.searchedOnDemandClasses,
    categorySearch: state.onDemand.categorySearchedOnDemandClasses,
    categorySearchLoading: state.onDemand.categorySearchLoading,
    selectedOnDemandClass: state.onDemand.selectedOnDemandClass,
    classes: [],
    loading: state.onDemand.searchLoading,
    userId: state.auth.userId,
    isAuthenticated: state.auth.token !== "",
    searchTerm: state.onDemand.searchTerm,
    searchType: state.onDemand.searchType,
    skipped: state.onDemand.skipped,
    searchParams: state.onDemand.categoryParamSkipped,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSearchOndemand: (criteria, boolean, searchType, skip) =>
      dispatch(searchOnDemandClass(criteria, boolean, searchType, skip)),
    onClearSearchData: () => dispatch(clearSearchData()),
    clearCategorySearchData: () => dispatch(clearCategorySearchData()),
    handleCatTab: () => dispatch(actionTypes.HANDLE_CAT_TAB),
    handleSearchTab: () => dispatch(actionTypes.HANDLE_SEARCH_TAB),
    changeSkippedState: () => dispatch(changeSkippedState()),
    storeSearchParams: params => dispatch(storeSearchParams(params)),
  };
};

class ClasslistViewSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      skipped: false,
      totalSearchResults: 0,
      itemsRemaining: 0,
      criteria: "",
      isInputActive: false,
      classes: [],
      Categoryclasses: [],
      errorMessage: "",
      isSubmitted: false,
      value: this.props.searchType,
      loading: true,
      resetSelector: false,
    };
    this.skippedSearch = this.skippedSearch.bind(this);
    this.skippedCategorySearch = this.skippedCategorySearch.bind(this);
    this.changeSkippedState = this.changeSkippedState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
    this.clearPrevSearchData = this.clearPrevSearchData.bind(this);
    this.handleCategorySearchSubmit = this.handleCategorySearchSubmit.bind(
      this
    );
    this.handleSelector = this.handleSelector.bind(this);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.skipped != this.props.skipped) {
      this.setState({ skipped: this.props.skipped });
    }
    if (
      prevProps.collection != this.props.collection &&
      this.props.collection != null
    ) {
      if (!this.props.skipped) {
        this.setState({ classes: [] });
      }
      this.setState({
        totalSearchResults: this.props.collection.total,
        itemsRemaining: this.props.collection.itemsRemaining,
      });
    }

    if (prevState.value != this.state.value) {
      if (this.state.value == 1 && this.props.searchTerm != "") {
        this.setState({ criteria: this.props.searchTerm }, () =>
          this.handleSubmit()
        );
      }
    }
  }
  clearPrevSearchData() {
    this.setState({ classes: [], isSubmitted: false });
  }
  componentDidMount() {
    if (this.props.isAuthenticated === false) {
      this.props.history.push({ pathname: Routes.classListViewRoute });
    }
    if (this.props.collection != null && this.state.value == 1) {
      this.setState({ isSubmitted: true });
      this.setState({ criteria: this.props.searchTerm }, () => {
        if (this.state.criteria) {
          this.handleSubmit();
        }
      });
    } /* else if (this.props.collection == null) {
      this.props.onSearchOndemand(["all", "", ""]);
    } */
  }
  skippedCategorySearch() {
    this.props.onSearchOndemand(
      [
        this.props.searchParams[0] != undefined
          ? this.props.searchParams[0]
          : "all",
        this.props.searchParams[1] != undefined
          ? this.props.searchParams[1]
          : "",
        this.props.searchParams[2] != undefined
          ? this.props.searchParams[2]
          : "",
      ],
      false,
      0,
      this.state.classes.length
    );
  }
  skippedSearch() {
    this.props.onSearchOndemand(
      this.state.criteria,
      "",
      1,
      this.state.classes.length
    );
  }
  onClickHandler = (id, isFav) => {
    const item = this.state.classes.find(cl => cl.id === id);
    item.isFav = isFav
    this.props.history.push({
      pathname:"/classes",
      state: { selectedItem: item },
    });
  };
  onFocusOnInputBase = e => {
    e.preventDefault();
    this.setState({ isInputActive: true });
  };
  _handleKeyPress = e => {
    if (e.key === "Enter") {
      this.handleSubmit();
    } else {
      this.setState({ isInputActive: true });
    }
  };
  handleCategorySearchSubmit = e => {
    this.setState({ isSubmitted: true, classes: [] }, () => { });
  };
  handleSubmit = () => {
    if (this.state.criteria != "") {
      this.setState({ isSubmitted: true, classes: [] });
      this.props.onSearchOndemand(this.state.criteria, "", 1);
    } else {
      this.setState({
        errorMessage: Translate({ id: "ClassListViews.CriteriaRequired" }),
      });
    }
  };
  changeSkippedState() {
    this.props.changeSkippedState();
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };
  clearFilter() {
    if (this.state.value == 1) {
      this.props.onClearSearchData();
      this.setState({ classes: [], isSubmitted: false });
      this.setState({ criteria: "" });
    } else if (this.state.value == 0) {
      this.props.clearCategorySearchData();
      this.setState({ classes: [], isSubmitted: false, resetSelector: true });
    }
  }
  handleSelector = () => {
    this.setState({ resetSelector: false });
  };
  render() {
    if (
      this.props.collection != null &&
      this.props.collection.items.length != 0
    ) {
      if (this.state.classes.length == 0) {
        if (!this.state.skipped) {
          var classObjList = [];
          for (var item, i = 0; (item = this.props.collection.items[i++]);) {
            var c = item.virtualClass;
            const obj = {
              id: c.tag,
              thumbnail: c.imageLink,
              title: c.className,
              show: c.isActive,
              category: c.classCategory,
              isFav: c.favourite,
              match: true,
              duration: c.durationSecond
                ? Math.floor(c.durationSecond / 60)
                : 55,
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
          }
          this.setState({ classes: classObjList, loading: false });
        }
      } else {
        if (this.state.skipped) {
          let prevClasses = this.state.classes;
          let newClasses = [...prevClasses];
          for (var item, i = 0; (item = this.props.collection.items[i++]);) {
            var c = item.virtualClass;
            const obj = {
              id: c.tag,
              thumbnail: c.imageLink,
              title: c.className,
              show: c.isActive,
              category: c.classCategory,
              isFav: c.favourite,
              match: true,
              duration: c.durationSecond
                ? Math.floor(c.durationSecond / 60)
                : 55,
              provider_id: c.provider,
              url: c.streamingLink,
              key: c.tag,
              description: c.classDescription,
              instructor: c.instructor,
              calories: c.calorieBurn,
              alternateLink: c.alternateLink,
              intensity: c.intensity,
              skill: c.skill,
              level: c.level
            };
            newClasses.push(obj);
          }

          this.setState(
            { classes: newClasses, loading: false, skipped: false },
            () => {
              this.changeSkippedState();
            }
          );
        }
      }
    }

    const { value } = this.state;

    return (
      <div className="page-container pageTitle">
        <Grid
          container
          justify="center"
          alignItems="center"
          alignContent="center"
          direction="column"
        >
          <Grid item>
            {/* <PageTitle label="Class Finder" /> */}
            <Typography variant="h1" className="m-b-20 p-t-62">
              {Translate({ id: "ClassListViews.Search" })}
            </Typography>
          </Grid>
          <Grid item >
            <Tabs
              value={value}
              onChange={this.handleChange}
              classes={{
                root: this.props.classes.tabsRoot,
                indicator: this.props.classes.tabsIndicator,
              }}
            >
              <Tab
                disableRipple
                classes={{
                  root: this.props.classes.tabRoot,
                  selected: this.props.classes.tabSelected,
                }}
                label={Translate({ id: "ClassListViews.Filter" })}
              />
              <Tab
                disableRipple
                classes={{
                  root: this.props.classes.tabRoot,
                  selected: this.props.classes.tabSelected,
                }}
                label={Translate({ id: "ClassListViews.SearchTitle" })}
              />
            </Tabs>
          </Grid>

          <Grid
            item lg={12} md={12} sm={12} xs={12} style={{ width: "100%" }} className="align-left search-filter"
          >
            {value === 0 && (
              <div
                className={`${
                  this.props.searchType == 0
                    ? this.props.loading
                      ? ""
                      : this.state.classes.length == 0
                        ? ""
                        : ""
                    : ""
                  }  'TitleTopMargin'`}
              >
                <div

                  className="PageTitleGrid"
                >

                  {this.state.value == 1 &&
                    <div className="searchErrorMsg">
                      <span className="errorMessage">
                        <Typography variant="body2">
                          {this.state.errorMessage}
                        </Typography>
                      </span>
                    </div>
                  }

                  <SearchPageSelector
                    className="selectorsStyle"
                    clearFilter={this.clearFilter}
                    handleSelector={this.handleSelector}
                    resetSelector={this.state.resetSelector}
                    onClearSearchData={this.props.onClearSearchData}
                    handleCategorySearchSubmit={this.handleCategorySearchSubmit}
                    onSearchOndemand={this.props.onSearchOndemand}
                  />
                </div>
                <div>
                  {!this.state.skipped && (
                    <Fade
                      in={this.props.loading}

                      unmountOnExit
                    >
                      <Spinner backColor="white" />
                    </Fade>
                  )}
                </div>
                <div >
                  <div className="indent">
                    <Grid
                      direction="column"
                      justify="center"
                      alignContent="center"
                      alignItems="center"
                      container
                    >
                      <Grid item>
                        {this.state.isSubmitted &&
                          !this.props.loading &&
                          this.props.searchType == 0 ? (
                            this.state.classes.length == 0 ? (
                              <div>
                                <Typography variant="body2">
                                  {Translate({
                                    id: "ClassListViews.NoSearchMessage",
                                  })}
                                </Typography>
                              </div>
                            ) : (
                                <SearchPageCards
                                  isCatFilter={true}
                                  skippedSearch={this.skippedCategorySearch}
                                  itemsRemaining={this.state.itemsRemaining}
                                  totalSearchResults={this.state.totalSearchResults}
                                  value={this.state.value}
                                  clearFilter={this.clearFilter}
                                  onClickHandler={this.onClickHandler}
                                  classes={this.state.classes}
                                />
                              ) 
                          ) : null}
                      </Grid>
                      <Grid item />
                    </Grid>
                  </div>
                </div>
              </div>
            )}
            {value === 1 && (
              <div
                className={`${
                  this.state.classes.length > 0 && this.props.searchType == 1
                    ? "containerGrey2"
                    : ""
                  }  'TitleTopMargin'`}
              >
                <div>
                  <div
                    className="SearchFeildHolder PageTitleGrid"

                  >
                    <div className="searchErrorMsg">
                      <Typography variant="body1" className="errorMessage">
                        {this.state.errorMessage}
                      </Typography>
                    </div>
                    <div
                      className=""
                    >
                      <InputBase
                        value={
                          this.props.searchTerm
                            ? this.props.searchTerm
                            : this.state.criteria
                        }

                        endAdornment={
                          this.state.criteria !== undefined &&
                          this.state.criteria.length !== 0 && (
                            <InputAdornment variant="filled" position="end">
                              <img
                                src={require("../../../../assets/images/clear_search.svg")}
                                style={{
                                  cursor: "pointer",
                                  height: "23px",
                                  width: "23px",
                                }}
                                onClick={() =>
                                  this.setState({
                                    criteria: "",
                                    isInputActive: false,
                                  })
                                }
                              />
                            </InputAdornment>
                          )
                        }
                        className="SearchFeildHolderTextFeild"
                        classes={{ root: this.props.textField }}
                        label={Translate({ id: "ClassListViews.SearchTitle" })}
                        value={this.state.criteria}
                        //onFocus={this.onFocusOnInputBase}
                        onKeyPress={this._handleKeyPress}
                        onChange={e =>
                          this.setState({
                            criteria: e.target.value,
                            errorMessage: "",
                          })
                        }
                        margin="normal"
                        placeholder={translatedFile.ClassListViews.SearchClasses? translatedFile.ClassListViews.SearchClasses : "Search Classes"}
                      />
                      <Button                        
                        type="button"
                        variant="contained"
                        color="secondary"
                        className="button SearchFeildHolderButton find-search"
                        onClick={this.handleSubmit}
                      >
                        <Typography variant="button">
                          {Translate({ id: "ClassListViews.SearchTitle" })}
                        </Typography>
                      </Button>
                    </div>
                  </div>

                  {!this.state.skipped && (
                    <Fade
                      in={this.props.loading}
                      style={{
                        backgroundColor: "white",
                      }}
                      unmountOnExit
                    >
                      <Spinner backColor="white" />
                    </Fade>
                  )}
                </div>
                {/* <div className="clearWhite">&nbsp;</div> */}

                <div
                  style={{
                    backgroundColor:
                      this.state.classes.length == 0 ? "white" : "white",
                  }}
                >
                  <div
                    className="indent"
                  // style={{
                  //   paddingTop: window.screen.width < 450 ? "100px" : "0px",
                  // }}
                  >
                    <Grid
                      direction="row"
                      justify="center"
                      alignContent="center"
                      alignItems="center"
                      container
                      style={{ backgroundColor: "white" }}
                    >
                      <Grid item>
                        {this.state.isSubmitted &&
                          !this.props.loading &&
                          this.props.searchType == 1 ? (
                            this.state.classes.length == 0 ? (
                              <div className="No-results-found">
                                {Translate({
                                  id: "ClassListViews.NoSearchMessage",
                                })}
                              </div>
                            ) : (
                                <SearchPageCards
                                  isCatFilter={false}
                                  skippedSearch={this.skippedSearch}
                                  itemsRemaining={this.state.itemsRemaining}
                                  totalSearchResults={this.state.totalSearchResults}
                                  value={this.state.value}
                                  clearFilter={this.clearFilter}
                                  onClickHandler={this.onClickHandler}
                                  classes={this.state.classes}
                                />
                              )
                          ) : null}
                      </Grid>
                      <Grid item />
                    </Grid>
                  </div>
                </div>
                <div className="clearWhite" />
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(TextFieldStyle)(ClasslistViewSearch)));
