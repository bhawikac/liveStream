import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

class SearchPageTabs extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <Tabs value={this.props.value} onChange={this.props.handleChange}>
          <Tab
            disableRipple
            label="CATEGORY FILTER"
            onClick={this.props.handleChange}
          />
          <Tab disableRipple label="SEARCH" onClick={this.props.handleChange} />
        </Tabs>
      </React.Fragment>
    );
  }
}

export default SearchPageTabs;
