import React, { Component } from "react";
import { Translate } from "../../utils/Translate";
import PageTitle from "../../components/PageTitle";
import ImageList from "../../components/ImageList/ImageList";
import Grid from "@material-ui/core/Grid";
import SingleImage from "../../components/Transformation/staticsingleimg";
import DoubleImage from "../../components/Transformation/staticdoubleimage";

let text =
  "Some plans include fitness tests, which enable you to benhmarkwhere you are at the start of the plan, and then track how youprogress. You’ll follow a series of exercises against the clock,and your final time is recorded. A few weeks on, and you can seehow much fitter you’ve become";

let text2 =
  "Once you’ve planned a workout, it will automatically be integrated with your phone calendar, so you’ll get calendare reminders, along with helpful nudges in the form of app notifications if you’ve not planned anything for a while.";
class TransformationPage extends Component {
  state = {
    classes: [
      {
        id: "class1",
        image: "class1.jpg",
        name: "class 1",
        subTitle: "14 mins",
        text: "Cardio"
      },
      {
        id: "class1",
        image: "class1.jpg",
        name: "class 1",
        subTitle: "14 mins",
        text: "Cardio"
      },
      {
        id: "class1",
        image: "class1.jpg",
        name: "class 1",
        subTitle: "14 mins",
        text: "Cardio"
      }
    ]
  };
  render() {
   
    return (
      <React.Fragment>
        <div style={{ marginBottom: "30px" }}>
          <PageTitle label="HJ" />
          <p className="subText" style={{ marginBottom: "39px" }}>
            {Translate({ id: "freeTrial.Description" })}
          </p>
          <div style={{ marginTop: "39px" }}>
            <div style={{ marginBottom: "30px" }}>
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
          <ImageList
            titleText={Translate({ id: "homePage.ClassTitleText" })}
            // showButton={true}
            showButton={false}
            showText={false}
            buttonText={Translate({ id: "homePage.SeeAllClasses" })}
            imageList={this.state.classes}
            caption={this.state.caption}
          />
        </div>
        <div>
          <SingleImage
            image={require("../../assets/images/mobilePlan.PNG")}
            supimage={require("../../assets/images/time.svg")}
            text={text}
          />
        </div>
        <div>
          <SingleImage
            image={require("../../assets/images/mscreenplan.PNG")}
            text={text2}
            supimage={require("../../assets/images/calender.png")}
          />
        </div>
        <div>
          <DoubleImage image={require("../../assets/images/mscreenplan.PNG")} />
        </div>
        <div>
          <DoubleImage image={require("../../assets/images/mscreenplan.PNG")} />
        </div>
      </React.Fragment>
    );
  }
}

export default TransformationPage;
