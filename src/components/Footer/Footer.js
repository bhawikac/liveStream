import React from "react";
import { Translate } from "../../utils/Translate";
import { FontStyle } from "../../utils/font"
import Divider from "@material-ui/core/Divider";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import { Typography, Grid } from "@material-ui/core";
import axios from 'axios';
import ReactHtmlParser from "react-html-parser";
// 3rd Dec,2019 by Nikhil
// Expected latest Design
// Commented the code for adding these items to the footer
function Footer(props) {
  const version = localStorage.getItem("version");
  
  return (
    <footer className="Footer">
      <div className="alignleft">
        <Typography variant="h3">
          <a href="/">{Translate({ id: "footer.home" })}</a>
        </Typography>
        <Typography variant="h3">
          <a href="/contact">{Translate({ id: "footer.contactUs" })}</a>
        </Typography>
        <Typography variant="h3">
          <a href="/tc">{Translate({ id: "footer.TermsAndConditions" })}</a>
        </Typography>
        <div className="clear">&nbsp;</div>
        
      </div>
      <Grid container>
        <Grid item lg={6} md={6} sm={6} xs={12}>
        <p className="text-white">
          &copy; {props.clientName} 
          {Translate({ id: "footer.Copyright" })}{" "}
        </p>
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12}>
        <p className="textLeft-xs text-white text-right">
        {Translate({ id: "footer.Build" })}{": "}
            {version} 
        </p>
        
        </Grid>
      </Grid>
      {/* <div className="policyLinkHolder">
         <p><a href="/tc">{Translate({ id: "footer.MarketingConsent" })}</a></p> 
      </div> */}
    </footer>
  );
}

export default Footer;
