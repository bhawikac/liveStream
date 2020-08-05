import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { Translate } from "../../utils/Translate";

class DoubleImage extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div
          className="SubscriptionHolder "
          style={{
            borderLeft: "none",
            borderRight: "none",
            borderBottom: "none"
          }}
        >
          <div>
            <p className="subTitle" style={{ margin: "54px 0px 6px 0px" }}>
              {Translate({ id: "freeTrial.Title" })}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <p className="subText" style={{ marginTop: "0px", width: "70%" }}>
                {Translate({ id: "freeTrial.Description" })}
              </p>
            </div>
          </div>
          <div style={{ margin: "60px 0px 48px 0px" }}>
            <Grid container style={{ justifyContent: "center" }} spacing={8}>
              <Grid item xs={12} sm={4}>
                <img src={this.props.image} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <img src={this.props.image} />
              </Grid>
            </Grid>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DoubleImage;
