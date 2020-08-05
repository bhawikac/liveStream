import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { Translate } from "../../utils/Translate";

class SingleImage extends Component {
  state = {};
  render() {
    return (
      <div
        className="SubscriptionHolder "
        style={{
          borderLeft: "none",
          borderRight: "none",
          borderBottom: "none"
        }}
      >
        <Grid
          container
          spacing={16}
          style={{
            alignItems: "center",
            justifyContent: "space-evenly",
            margin: "38px 0px 38px 0px "
          }}
        >
          <Grid item xs={12} sm={4}>
            <div>
              <img src={this.props.image} />
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div style={{ textAlign: "left" }}>
              <img src={this.props.supimage} />
            </div>
            <div>
              <p
                className="subTitle"
                style={{
                  marginBottom: "6px",
                  textAlign: "left",
                  marginTop: "12px"
                }}
              >
                {Translate({ id: "freeTrial.Title" })}
              </p>
              <p
                className="subText"
                style={{ marginTop: "0px", textAlign: "left", width: "70%" }}
              >
                {this.props.text}
              </p>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default SingleImage;
