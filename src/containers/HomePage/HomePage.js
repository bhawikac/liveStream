import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import ImageList from "../../components/ImageList/ImageList";
import homeData from "./HomePageData.json";
import ImageBanner from "../../components/ImageBanner/ImageBanner";
import SubscriptionComponent from "../../components/Subscription/Subscription";
import { injectIntl } from "react-intl";
import { Translate } from "../../utils/Translate";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import SubTextAboveFooter from "../../assets/components/SubTextAboveFooter"
import Routes from '../../components/Router/Routes'
 
var config = require("../../assets/config.json");

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    isAuthenticated: state.auth.token != ""
  };
};

class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.isAuthenticated == true) {
      this.props.history.push({ pathname: Routes.classListViewRoute });
    }

    const classes = homeData.classes;

    const clubs = homeData.clubs;
    return (
      <div>
        <div className="imageContainer overlayWeb">
          <ImageBanner
            className="container"
            imageSrc={require("../../assets/images/home.jpg")}
            marketingTagLine={Translate({ id: "homePage.MarketingTagLine" })}
            marketingDescription={Translate({
              id: "homePage.MarketingDescription"
            })}
            isOverlay={true}
            buttonText={Translate({ id: "homePage.ExploreClasses" })}
          />
        </div>
        <div className="imageContainer overlayMobile">
          <ImageBanner
            className="container"
            imageSrc={require("../../assets/images/home.jpg")}
            marketingTagLine={Translate({ id: "homePage.MarketingTagLine" })}
            marketingDescription={Translate({
              id: "homePage.MarketingDescription"
            })}
            buttonText={Translate({ id: "homePage.ExploreClasses" })}
          />
        </div>
        <div className="clear">&nbsp;</div>
        <ImageList
          titleText={Translate({ id: "homePage.ClassTitleText" })}
          // showButton={true}
          showButton={false}
          showText={false}
          buttonText={Translate({ id: "homePage.SeeAllClasses" })}
          imageList={classes}
        />
        <div className="clear" />
        {config.AccessCodeMandatory === true &&
          <div className="FreeAccessHomeContainer padding16">
            <Typography variant="h1" className="">
              {Translate({
                id: "homePage.FreeAccessTitle",
                values: {
                  clubName: localStorage
                    .getItem("ClientDisplayName")
                    .toUpperCase()
                }
              })}
            </Typography>
            <Typography variant="h3" className="imgSubTitle m-t-5 ">
              <SubTextAboveFooter></SubTextAboveFooter>
            </Typography>
            {config.showSignUpPage === false ? (<Button
              type="button"
              variant="contained"
              color="secondary" className="m-t-15 m-t-xs-15"
              onClick={() => {
                this.props.history.push("/signin");
              }}
            >
              <Typography variant="button">
                {Translate({ id: "Subscription.GetAccess" })}{" "}
              </Typography>
            </Button>) : (<Button
              type="button"
              variant="contained"
              color="secondary" className="m-t-15 m-t-xs-15"
              onClick={() => {
                this.props.history.push("/signup");
              }}
            ><Typography variant="button">
                {Translate({ id: "Subscription.GetAccess" })}{" "}</Typography>
            </Button>)}
          </div>}
        {/* <div className="clear">&nbsp;</div> */}
        {/* <div
          className="SubscriptionHolder "
          style={{ borderLeft: "none", borderRight: "none",borderBottom:"none" }}
        >
          <Transformation classes={classes} caption="Hello" />
          
        </div> */}

        {config.AccessCodeMandatory === true ? (
          null
        ) : (
            <div className="SubscriptionHolder page-container" style={{ marginBottom: "20px" }}>
              <SubscriptionComponent />
            </div>
          )}
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(injectIntl(Home)));
