import React, { PureComponent } from "react";
import IconError from "react-icons/lib/md/error-outline";
import "./404.css";
import { Button } from "@material-ui/core";
import { Translate } from '../../utils/Translate';
import Routes from '../Router/Routes'

export default class NotFound extends PureComponent {
  render() {
    return (
      <div className="page-container not-found m-t-40">
        <IconError className="not-found-icon m-t-40" />
        <h1 class="MuiTypography-root MuiTypography-h1 m-t-15">
        {Translate({id: "Error.404"})}
        </h1>
        <h6 class="MuiTypography-root MuiTypography-h6 text-gray">
        {Translate({id: "Error.NotFound"})}
           </h6>
        <Button className="m-t-40 m-t-xs-15 MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedSecondary"
        onClick={() => {this.props.history.push({ pathname: Routes.classListViewRoute })}}
        >
          <span class="MuiTypography-root MuiTypography-button">
          {Translate({ id: "homePage.ExploreClasses" })}&nbsp;
          {Translate({id: "footer.classes"})}
          </span></Button>
      </div>
    );
  }
}

