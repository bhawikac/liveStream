import React, { Component } from "react";
import { Translate } from "../../utils/Translate";
import ImageList from "../../components/ImageList/ImageList";
import Button from "@material-ui/core/Button";

class Transformation extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="transformationcontainer">
          <p className="subTitle">{Translate({ id: "freeTrial.Title" })}</p>
          <p className="subText" style={{ marginBottom: "39px" }}>
            {Translate({ id: "freeTrial.Description" })}
          </p>

          <ImageList
            titleText={Translate({ id: "homePage.ClassTitleText" })}
            // showButton={true}
            showButton={false}
            showText={false}
            buttonText={Translate({ id: "homePage.SeeAllClasses" })}
            imageList={this.props.classes}
            caption={this.props.caption}
          />
        </div>
        <div style={{ marginBottom: "40px" }} />
        <Button
          type="button"
          variant="contained"
          color="secondary"
          style={{
            width: "200px",
            height: "40px"
          }}
          onClick={() => {
            this.props.history.push("/signup");
          }}
        >
          {Translate({ id: "Subscription.GetAccess" })}{" "}
        </Button>
        <div style={{ marginTop: "39px" }}>
          <div style={{ marginBottom: "50px" }}>
            <img
              src="http://www.vpai360.com/wp-content/uploads/2017/08/app_store_badge.png"
              style={{
                width: "117.9px",
                height: "38.3px",
                marginRight: "15px"
              }}
            />
            <img
              src="https://blockly.t2t.io/tk/image/TK5.png"
              style={{ width: "117.9px", height: "38.3px" }}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Transformation;
