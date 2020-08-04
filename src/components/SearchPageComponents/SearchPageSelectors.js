import React from "react";
import Grid from "@material-ui/core/Grid";
import Select from "../selector/Select";
import { connect } from "react-redux";
import { storeSearchParams } from "../../store/actions/ondemand";
import {Translate} from "../../utils/Translate"


const mapStateToProps = state => {
  return {
    collection: state.onDemand.searchedOnDemandClasses,
    searchParams: state.onDemand.searchParams,
    searchTerm: state.onDemand.searchTerm,
    searchType: state.onDemand.searchType
  };
};

const mapDispatchToProps = dispatch => {
  return {
    storeSearchParams: params => dispatch(storeSearchParams(params))
  };
};

var oldclassTypes = localStorage.getItem("classTypes");

var classTypesArrayUnsorted = oldclassTypes.split(",");

var classTypes = classTypesArrayUnsorted.map(
  (String.prototype.capitalize = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  })
);

var classTypesArray = classTypes.sort();

var oldProviderType = localStorage.getItem("ProviderType");


var ProviderTypeArrayUnsorted = oldProviderType.split(",");

var ProviderType = ProviderTypeArrayUnsorted.map(
  (String.prototype.capitalize = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  })
);

var ProviderTypeArray = ProviderType.sort();

class SearchPageSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ParamDuration: [],
      ParamCategory: [],
      ParamProviderType: [],
      Duration: "",
      Category: [],
      ProviderType: [],
      Metadata: null
    };

    this.setSearchTimeDuration = this.setSearchTimeDuration.bind(this);
    this.setSearchClassCategory = this.setSearchClassCategory.bind(this);
    this.setSearchProviderType = this.setSearchProviderType.bind(this);
    this.deletCategoryOptions = this.deletCategoryOptions.bind(this);
    this.deletProviderOptions = this.deletProviderOptions.bind(this);
  }

  /* componentDidUpdate(prevProps) {
    if (prevProps.Metadata != this.props.Metadata) {
      console.log(this.props.Metadata);
      this.setState({ Metadata: this.props.Metadata });
    }
  } */
  componentDidUpdate(preveProps) {
    if (
      preveProps.resetSelector != this.props.resetSelector &&
      this.props.resetSelector == true
    ) {
      this.setState({ Duration: "", Category: [], ProviderType: [] });
    }
  }
  componentWillUnmount() {
    this.props.storeSearchParams([
      this.state.Duration,
      this.state.Category,
      this.state.ProviderType
    ]);
  }
  componentDidMount() {
    if (this.props.searchParams != null) {
      this.setState(
        {
          ParamDuration: [this.props.searchParams[0]],
          ParamCategory: [this.props.searchParams[1]],
          ParamProviderType: [this.props.searchParams[2]]
        } 
      );
    } 

    this.setState({ Metadata: localStorage.getItem("classTypes") });
  }
  setSearchTimeDuration(value) {
    this.setState({ Duration: value }, () => {
      if (
        this.state.Duration[0] == "Select Duration" &&
        (this.state.Category.length > 0 || this.state.ProviderType.length > 0)
      ) {
        this.props.onSearchOndemand(
          [
            this.state.Duration[0] != "Select Duration"
              ? this.state.Duration[0]
              : "all",
            this.state.Category[0],
            this.state.ProviderType[0]
          ],
          false,
          0
        );
      } else if (this.state.Duration[0] != "Select Duration") {
        this.props.onSearchOndemand(
          [
            this.state.Duration[0],
            this.state.Category[0],
            this.state.ProviderType[0]
          ],
          false,
          0
        );
      } else if (
        this.state.Duration[0] == "Select Duration" &&
        this.state.ProviderType.length == 0 &&
        this.state.Category.length == 0
      ) {
        this.props.onClearSearchData();
      }
    });

    this.props.handleCategorySearchSubmit();
  }
  setSearchClassCategory(value) {
    this.setState({ Category: value }, () => {
      let Category;
      let ProviderType;
      if (this.state.Category != "") {
        Category = this.state.Category.join();
      } else {
        Category = "";
      }
      if (this.state.ProviderType != "") {
        ProviderType = this.state.ProviderType.join();
      } else {
        ProviderType = "";
      }

      /* if (
        this.state.Duration[0] == undefined &&
        this.state.Category[0] == undefined &&
        this.state.ProviderType.length == undefined
      ) {
        console.log("DAta cleared");
        this.props.onClearSearchData();
      } else  */ if (
        this.state.Duration[0] == undefined &&
        this.state.ProviderType.length == 0 &&
        this.state.Category.length == 0
      ) {
        this.props.onClearSearchData();
      } else {
         
        this.props.onSearchOndemand(
          [this.state.Duration[0], Category, ProviderType],
          false,
          0
        );
      }
    });
    this.props.handleCategorySearchSubmit();
  }
  setSearchProviderType(value) {
    this.setState({ ProviderType: value }, () => {
      let Category;
      let ProviderType;
      if (this.state.Category != "") {
        Category = this.state.Category.join();
      } else {
        Category = "";
      }
      if (this.state.ProviderType != "") {
        ProviderType = this.state.ProviderType.join();
      } else {
        ProviderType = "";
      }
      if (
        this.state.Duration[0] == undefined &&
        this.state.ProviderType.length == 0 &&
        this.state.Category.length == 0
      ) {
        this.props.onClearSearchData();
      } else {
        this.props.onSearchOndemand(
          [this.state.Duration[0], Category, ProviderType],
          false,
          0
        );
      }
    });
    this.props.handleCategorySearchSubmit();
  }

  /*  componentDidUpdate(prevState) {
     if(prevState.Duration != this.state.Duration){
       this.props.onSearchOndemand()
      }  
    if (
      prevState.Category != this.state.Category &&
      this.state.Category.length > 0
    ) {
   
      this.props.onSearchOndemand(this.state.Category[0]);
    }
    if (
      prevState.ProviderType != this.state.ProviderType &&
      this.state.ProviderType.length > 0
    ) {
      this.props.onSearchOndemand(this.state.ProviderType);
    }
  } */
  deletDurationOptions = delet => {
    this.setState({ Duration: [] }, () => {
      if (
        this.state.Category.length == 0 &&
        this.state.ProviderType.length == 0
      ) {
        this.props.clearFilter();
      } else if (
        this.state.Category.length == 0 &&
        this.state.ProviderType.length != 0
      ) {
        this.props.onSearchOndemand(
          ["all", "", this.state.ProviderType[0]],
          false,
          0
        );
      } else if (
        this.state.Category.length != 0 &&
        this.state.ProviderType.length == 0
      ) {
        this.props.onSearchOndemand(
          ["all", this.state.Category[0], ""],
          false,
          0
        );
      } else if (
        this.state.Category.length != 0 &&
        this.state.ProviderType.length != 0
      ) {
        this.props.onSearchOndemand(
          ["all", this.state.Category[0], this.state.ProviderType[0]],
          false,
          0
        );
      }
    });
  };
  deletCategoryOptions = delet => {
    let index = this.state.Category.indexOf(delet);
    let data = this.state.Category;
    let CopyData = [...data];
    CopyData.splice(index, 1);
    this.setState({ Category: CopyData }, () => {
      if (this.state.Category.length > 0) {
        let Category;
        let ProviderType;
        if (this.state.Category.length != 0) {
          Category = this.state.Category.join();
        } else {
          Category = "";
        }
        if (this.state.ProviderType.length != 0) {
          ProviderType = this.state.ProviderType.join();
        } else {
          ProviderType = "";
        }
        this.props.onSearchOndemand(
          [this.state.Duration[0], Category, ProviderType],
          false,
          0
        );
      } else if (
        this.state.Category.length == 0 &&
        this.state.ProviderType.length == 0
      ) {
        if (
          this.state.Duration[0] != undefined &&
          this.state.Duration[0] != "Select Duration"
        ) {
          this.props.onSearchOndemand(
            [this.state.Duration[0], "", ""],
            false,
            0
          );
        } else if (
          this.state.Duration[0] == "Select Duration" ||
          this.state.Duration[0] == undefined
        ) {
          this.props.clearFilter();
        }
      } else if (
        this.state.Category.length == 0 &&
        this.state.ProviderType.length != 0
      ) {
        if (
          this.state.Duration != undefined &&
          this.state.Duration != "Select Duration"
        ) {
          this.props.onSearchOndemand(
            ["all", "", this.state.ProviderType[0]],
            false,
            0
          );
        } else {
          this.props.onSearchOndemand(
            [this.state.Duration[0], "", this.state.ProviderType[0]],
            false,
            0
          );
        }
      }
    });
  };
  deletProviderOptions = delet => {
    let index = this.state.ProviderType.indexOf(delet);
    let data = this.state.ProviderType;
    let CopyData = [...data];
    CopyData.splice(index, 1);
    this.setState({ ProviderType: CopyData }, () => {
      if (this.state.ProviderType.length > 0) {
        let Category;
        let ProviderType;
        if (this.state.Category.length != 0) {
          Category = this.state.Category.join();
        } else {
          Category = "";
        }
        if (this.state.ProviderType.length != 0) {
          ProviderType = this.state.ProviderType.join();
        } else {
          ProviderType = "";
        }
        this.props.onSearchOndemand(
          [this.state.Duration[0], Category, ProviderType],
          false,
          0
        );
      } else if (
        this.state.Category.length == 0 &&
        this.state.ProviderType.length == 0
      ) {
        if (
          this.state.Duration[0] != undefined &&
          this.state.Duration[0] != "Select Duration"
        ) {
          this.props.onSearchOndemand(
            [this.state.Duration[0], "", ""],
            false,
            0
          );
        } else if (
          this.state.Duration[0] == "Select Duration" ||
          this.state.Duration[0] == undefined
        ) {
          this.props.clearFilter();
        }
      } else if (
        this.state.Category.length != 0 &&
        this.state.ProviderType.length == 0
      ) {
        if (
          this.state.Duration != undefined &&
          this.state.Duration != "Select Duration"
        ) {
          this.props.onSearchOndemand(
            [this.state.Duration[0], this.state.Category[0], ""],
            false,
            0
          );
        } else {
          this.props.onSearchOndemand(
            [this.state.Duration[0], this.state.Category[0], ""],
            false,
            0
          );
        }
      }
    });
  };
  render() {
    return (
      <React.Fragment>
        <Grid justify="center" container>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <div className="selectContainer">
              <Select className="custom-drop"
                handleSelector={this.props.handleSelector}
                deletOption={this.deletDurationOptions}
                resetSelector={this.props.resetSelector}
                searchParams={this.state.ParamDuration}
                setSearchQuery={this.setSearchTimeDuration}
                label={Translate({ id: "ClassListViews.Duration" })}
                placeholder="Select Duration"
                options={[
                  { value: "10 mins" },
                  { value: "20 mins" },
                  { value: "30 mins" },
                  { value: "40+ mins" }
                ]}
              />
            </div>
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <div className="selectContainer">
              <Select className="custom-drop"
                handleSelector={this.props.handleSelector}
                resetSelector={this.props.resetSelector}
                searchParams={this.state.ParamCategory}
                deletOption={this.deletCategoryOptions}
                setSearchQuery={this.setSearchClassCategory}
                label={Translate({ id: "ClassListViews.Type" })}
                placeholder="Select Type"
                options={
                  classTypesArray != null || undefined ? (
                    classTypesArray.map((item, index) => ({
                      value: item
                    }))
                  ) : (
                    <div />
                  )
                }
                multiple
              />
            </div>
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <div className="selectContainer">
              <Select className="custom-drop"
                handleSelector={this.props.handleSelector}
                resetSelector={this.props.resetSelector}
                searchParams={this.state.ParamProviderType}
                deletOption={this.deletProviderOptions}
                setSearchQuery={this.setSearchProviderType}
                label={Translate({ id: "ClassListViews.ContentProvider" })}
                placeholder="Select Provider"
                options={
                  ProviderTypeArray != null || undefined ? (
                    ProviderTypeArray.map((item, index) => ({
                      value: item
                    }))
                  ) : (
                    <div />
                  )
                }
                multiple
              />
            </div>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPageSelector);
