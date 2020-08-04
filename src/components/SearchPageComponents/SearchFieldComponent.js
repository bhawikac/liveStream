import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import InputBase from "@material-ui/core/InputBase";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import {Translate} from "../../utils/Translate"

class SearchFieldComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <div
          style={{
            backgroundColor: "#fff",
            paddingBottom: "0px",
            height: "40px",
            borderBottom: "#ccc 1px solid"
          }}
        >
          <InputBase
            value={
              this.props.searchTerm
                ? this.props.searchTerm
                : this.props.criteria
            }
            endAdornment={
              this.props.criteria !== undefined &&
              this.props.criteria.length !== 0 && (
                <InputAdornment variant="filled" position="end">
                  <img
                    src={require("../../assets/images/" +
                      localStorage.getItem("clientImageFolder") +
                      "/clear_search.svg")}
                    style={{
                      cursor: "default",
                      height: "23px",
                      width: "23px"
                    }}
                    onClick={() => this.props.handleAdornment()}
                  />
                </InputAdornment>
              )
            }
            className="SearchFeildHolderTextFeild"
            classes={{ root: this.props.textField }}
            label={Translate({ id: "ClassListViews.SearchTitle" })}
            value={this.props.criteria}
            //onFocus={this.onFocusOnInputBase}
            onKeyPress={this._handleKeyPress}
            onChange={e => this.props.handleInputOnChange()}
            margin="normal"
            placeholder="Search Classes"
          />

          <div className="mobileSerachButtonSeperator" />
          <Button
            style={{ marginBottom: "0px" }}
            type="button"
            variant="contained"
            color="secondary"
            className="button SearchFeildHolderButton"
            onClick={this.handleSubmit}
          >
            {Translate({ id: "ClassListViews.SearchTitle" })}{" "}
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

export default SearchFieldComponent;
