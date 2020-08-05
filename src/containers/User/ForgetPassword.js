import React, { Component } from "react";
import PageTitle from "../../components/PageTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Grid from "@material-ui/core/Grid";  
import {Typography} from "@material-ui/core";
import { Translate } from "../../utils/Translate";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  ForgetPasswordRequest,
  ResetPasswordRequest
} from "../../store/actions/auth";

let resetEmail = "";
let resetToken = "";

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token != "",
    sendMailerrorMessage: state.auth.sendMailerrorMessage,
    resetPassworderrorMessage: state.auth.resetPassworderrorMessage,
    resetPasswordSuccessMessage: state.auth.resetPasswordSuccessMessage,
    ForgotEmailSent: state.auth.ForgotEmailSent
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onforgetPasswordRequest: email => dispatch(ForgetPasswordRequest(email)),
    onResetPasswordRequest: data => dispatch(ResetPasswordRequest(data))
  };
};

class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        email: "",
        password: "",
        ConfirmPassword: ""
      },
      mailSent: false,
      mailError: "",
      receivedToken: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleResetSubmit = this.handleResetSubmit.bind(this);
  }

  handleChange(event) {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
  }

  handleSubmit() {
    this.props.onforgetPasswordRequest(this.state.formData.email);
  }

  handleResetSubmit() {
    var body = {
      ResetToken: resetToken,
      EmailAddress: resetEmail,
      ApplicationProfile: {
        emailAddress: resetEmail,
        PasswordHash: this.state.formData.password
      }
    };
    this.props.onResetPasswordRequest(body);  
  } 

  componentDidMount() {
    var token = this.props.match.params.token;
    if (token !== "0" && token != null && token.length > 10) {
      var decodedString = atob(token);
      resetEmail = decodedString.split(":")[0];  
      resetToken = decodedString.split(":")[1];
      if (
        resetEmail != null &&
        resetEmail.length > 0 &&
        resetToken != null &&
        resetToken.length > 0
      ) {
        this.setState({ receivedToken: token });
      }
    }

    ValidatorForm.addValidationRule("isPasswordMatch", value => {
      if (value !== this.state.formData.password) {
        return false;
      }
      return true;
    });
    ValidatorForm.addValidationRule("passwordStrength", value => {
      var strongRegex = new RegExp("^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$");
      if (strongRegex.test(value)) {
        return true;
      }
      return false;
    });
  }

  render() {
    const { formData, submitted } = this.state;

    return (
      <div style={{ marginTop: "74px" }}>
        {!this.props.ForgotEmailSent && this.state.receivedToken == null && (
          <Grid container spacing={16}>
            {/* <Grid item xs={3} sm={3}></Grid> */}
            <Grid item xs={11} sm={6} className="centerContent">
              <div>
                <PageTitle  
                  label={<Typography variant="h1" style={{letterSpacing:"0.41px"}}>{Translate({ id: "ForgetPassword.ForgotPassword" })}</Typography>}
                />
                <div
                style={{marginTop:"-11px"}}
                className="subscriptionTagline subText">
                  <p>
        {<Typography variant={"h6"}>{Translate({ id: "ForgetPassword.ForgotPasswordMessage" })}</Typography>}
                  </p>
                </div>

                <ValidatorForm
                  ref="form"
                  onSubmit={this.handleSubmit}
                  className="editForm"
                >
                  <div>
                    <span className="errorMessage">
                      {this.props.sendMailerrorMessage}
                    </span>
                  </div>  
                  <br /> 
                  <div className="">
                  <TextValidator
                    label={<Typography variant="body1">{Translate({ id: "Signup.Email" })}</Typography>}
                    onChange={this.handleChange}
                    name="email"
                    value={formData.email}
                    validators={["required", "isEmail"]}
                    className="errorbold  textfieldreset"
                    errorMessages={[
                      Translate({ id: "login.EmailRequired" }),
                      Translate({ id: "login.EmailValidFormat" })
                    ]}
                  />
                  </div> 
                  <br />
                  <br />
                  <br />
                  <Button
                  size="large"
                    type="submit"
                    variant="contained"
                    color="secondary"
                    className="button"
                  >
                    {" "}
                    {<Typography variant="h5">{Translate({ id: "Player.Done" })}</Typography>}{" "}
                  </Button>
                </ValidatorForm>
              </div>
            </Grid>
          </Grid>
        )}

        {this.props.ForgotEmailSent && this.state.receivedToken == null && (
          <div style={{ paddingTop: "40px"}}>  
            <div className="marginbottom1">
              <img src={require("../../assets/images/sentimage.svg")}/>
              
            </div>
            <PageTitle label={<Typography variant="h1">{Translate({ id: "ForgetPassword.Sent" })}</Typography>}>
            </PageTitle>

            <div 
             style={{marginTop:"-15px"} }>
               <p className="centeralign" >
        <Typography variant="h6" className="text-gray worddown">
          {Translate({ id: "ForgetPassword.SentMessage" })}
        </Typography>
        </p>
            </div>
          </div>
        )}

        {this.state.receivedToken != null && (
          <div>
            <PageTitle
              label={Translate({ id: "ForgetPassword.EnterNewPassword" })}
            />
            <Grid container spacing={16}>
              {/* <Grid item xs={3} sm={3}></Grid> */}
              <Grid item xs={11} sm={6} className="centerContent">
                <div>
                  <ValidatorForm
                    ref="form"
                    onSubmit={this.handleResetSubmit}
                    className="editForm"
                  >
                    <br />
                    <div>
                      {this.props.resetPasswordSuccessMessage ? (
                        <span
                          style={{
                            color: "green"
                          }}
                        >
                          {this.props.resetPasswordSuccessMessage}
                        </span>
                      ) : (
                        <span className="errorMessage">
                          {this.props.resetPassworderrorMessage}
                        </span>
                      )}
                    </div>
                    <br />
                    <TextValidator
                      type="Password"
                      fullWidth
                      label={Translate({ id: "Signup.Password" })}
                      onChange={this.handleChange}
                      name="password"
                      value={formData.password}
                      className="errorbold"
                      validators={["required", "passwordStrength"]}
                      errorMessages={[
                        Translate({ id: "login.PasswordRequired" }),
                        Translate({ id: "ForgetPassword.Regex" })
                      ]}
                    />
                    <TextValidator
                      type="Password"
                      fullWidth
                      label={Translate({
                        id: "ForgetPassword.ConfirmPassword"
                      })}
                      onChange={this.handleChange}
                      name="ConfirmPassword"
                      value={formData.ConfirmPassword}
                      validators={["isPasswordMatch"]}
                      className="errorbold"
                      errorMessages={[
                        Translate({ id: "ForgetPassword.PasswordMismatch" })
                      ]}
                    />
                    <br />
                    <br />
                    <Button
                     size="large"
                      type="submit"
                      variant="contained"
                      color="secondary"
                      className="button"
                    >
                      {<Typography variant="h5">{Translate({ id: "Player.Done" })}</Typography>}
                    </Button>
                  </ValidatorForm>
                </div>
              </Grid>
            </Grid>
          </div>
        )}
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ForgetPassword));
