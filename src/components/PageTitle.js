import React from "react";

import Divider from "@material-ui/core/Divider";
import withStyles from "@material-ui/core/styles/withStyles";
import { Typography } from "@material-ui/core";

const style = {
  root: {
    height: "14px",
  },
};

function PageTitle(props) {
  return (
    <div className="clear">
      <Typography variant="h1" className="">{props.label}</Typography>

      {/* {props.hideDivider != true && (
        <div className="TitleBreaker">
          <Divider className={props.classes.root} />
        </div>
      )} */}
    </div>
  );
}

export default withStyles(style)(PageTitle);
