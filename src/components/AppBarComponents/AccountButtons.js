import React from "react";
import Button from "@material-ui/core/Button";
import { Translate } from "../../utils/Translate";
import AppBarButtonStyle from "../../assets/style/AppBarButtonStyle";
import withStyles from "@material-ui/core/styles/withStyles";
var config = require("../assets/config.json");

class AccountButtons extends React.Component {
  render() {
    return (
      <div>
        <div className="loginButtonHolder">
          <Button
        
           variant='text'
            style={{
              backgroundColor:'#fff',
              minHeight: "30px",
              width: "100px",
              fontSize: "10px",
              color: "rgb(43, 194, 238)",
              fontWeight: "bold",
              letterSpacing: "0.3"
            }}
            color="secondary"
            onClick={() => {
              this.props.history.push({ pathname: "/signin" });
            }}
          >
            {Translate({ id: "layout.SignIn" })}
          </Button>

          <Button
            variant="contained"
            color="secondary"
            className={this.props.classes.AccountBarButton}
            onClick={() => {
              this.props.history.push({ pathname: "/signup" });
            }}
          >
            {Translate({ id: "layout.SignUp" })}
          </Button>
        </div>
        <div className="loginButtonHolderMobile">
          <Button
            style={{
              minHeight: "30px",
              width: "70px",
              fontSize: "10px",
              color: "#FFFFFF",
              fontWeight: "bold",
              letterSpacing: "0.3"
            }}
            color="secondary"
            onClick={() => {
              this.props.history.push({ pathname: "/signin" });
            }}
          >
            {Translate({ id: "layout.SignIn" })}
          </Button>

          {config.showSignUpPage === false ? (<div></div>):(<Button
            variant="contained"
            color="secondary"
            className={this.props.classes.AppBarButtonMobile}
            onClick={() => {
              this.props.history.push({ pathname: "/signup" });
            }}
          >
            {Translate({ id: "layout.SignUp" })}
          </Button>)}
        </div>
      </div>
    );
  }
}
export default withStyles(AppBarButtonStyle)(AccountButtons);
