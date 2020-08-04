import React from "react";
import Image from "../../components/Image/Image";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import { FontStyle } from "../../utils/font";
import { Translate } from "../../utils/Translate";
import { Typography } from "@material-ui/core";
import Routes from '../Router/Routes'

const imageList = props => (
  <div className="">
    <div className="EContainer">
      <div className="m-bt-lg-60 m-tb-sm-25 page-container">
        <Typography variant="h1" className=" imgTitle p-gt-sm-5"
          style={
            {
              // ...FontStyle.SFProDisplayMedium,
              marginBottom: "0px"
            }}>{props.titleText}</Typography>
        <Typography className="imgSubTitle m-t-5 p-gt-sm-5"
          variant="h3"
          >
          {Translate({ id: "homePage.ClassSubTitleText" })}
        </Typography>
      </div>
      <Grid item>
        {props.showButton && (
          <Button
            variant="contained"
            color="secondary"
            className="alignright noBorderRadiusButton mobileDisplayNone"
            onClick={() => {
              props.history.push(Routes.classListViewRoute);
            }}
          >
            {props.buttonText}
          </Button>
        )}
      </Grid>
      {/* </Grid> */}
      <div className="bgContainer homeStripe p-t-32">
      <div className="page-container">
      <Grid container spacing={4} className="m-t-xs-15">
        {props.imageList.map(img => (
          <Grid item xs={12} sm={12} md={6} lg={6} key={img.id} className="m-t-xs-minus12">
            <div className="">
              <a
                onClick={() => {
                  props.history.push(Routes.classListViewRoute);
                }}
              >
                <Image
                  imageSrc={require("../../assets/images/" + img.image)}
                  height="100%"
                  width="100%"
                />
              </a>
            </div>
            {props.caption ? (
              <p className="imagecaptions">
                {props.caption} {img.id}
              </p>
            ) : (
                ""
              )}
          </Grid>
        ))}
      </Grid>
      </div>
      </div>
    </div>
  </div>
);

export default withRouter(imageList);
