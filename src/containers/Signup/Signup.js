import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import PageTitle from "../../components/PageTitle";
import { Translate } from "../../utils/Translate";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {
  GetConsentDetail,
  createUserWrapper,
  clearAuthData,
} from "../../store/actions/auth";
import { connect } from "react-redux";
import { getTNCConsent } from "../../store/selectors/Consents";
import CheckboxValidatorElement from "../../ValidatorComponent/CheckboxValidatorElement";
import { ConsentAction } from "../../utils/constants";
import { Redirect } from "react-router-dom";
import {
  GetSubscriptionProduct,
  GetFreeSubscription,
} from "../../store/actions/subscription";
import { getTrailPlanDetail } from "../../store/selectors/subscription";
import { StartFreeTrail } from "../../store/actions/subscription";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";
import Spinner from "../../components/spinner/spinner";
import CustomDialog from "../../components/Modal/Modal"
import InputText from '../../ValidatorComponent/TextBoxValidatorComponent';
import { Typography } from "@material-ui/core";
import ReactHtmlParser from "react-html-parser";

var config = require("../../assets/config.json");


class SignupPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        tnc: "",
        mktg: "",
        freeAccessCode: "",
        tncConsent: false,
        purchaseCallMade: false,
      },
      submitted: false,
      authRedirect: "",
      tncDialog: false,
      tncHtml: null,
      isError: false,
      isFormFilled: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckChange = this.handleCheckChange.bind(this);
  }

  handleChange(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState(prevState => {
      return {
        formData: {
          ...prevState.formData, [name]: value
        }
      }
    })
  }

  handleCheckChange(event) {
    const { formData } = this.state;
    formData[event.target.name] = event.target.checked;
    this.setState({ formData }
    )
  }
  OpenTncDialog = e => {
    e.preventDefault();
    this.setState({ tncDialog: true });
  };
 
  handleDialogClose = () => {

    this.setState({ tncDialog: false });
  };
  acceptTnc = () => {
    this.setState(prevState => {
      return {
        formData: {
          ...prevState.formData, tncConsent: true
        }
      }
    })
  }
  componentWillUnmount() {
 
    if (this.props.deepLinkPayload != null) {
      if (this.props.isAuthenticated) {
      
          this.props.history.push({ pathname: this.props.deepLinkPayload });
      }
  }
    this.props.onclearAuthData();
  }

  handleSubmit() {
    if (this.state.submitted == false) {
      this.setState({ submitted: true, isError: false }, () => {
        var body = {
          UserDetail: {
            ApplicationProfile: {
              EmailAddress: this.state.formData.email,
              PasswordHash: this.state.formData.password,
              FirstName: this.state.formData.firstName,
              LastName: this.state.formData.lastName,
              countrycode: "GB",
            },
          },
          ConsentRequest: [
            {
              ConsentTag: this.props.tnConsent.tag,
              Action: this.state.formData.tncConsent
                ? ConsentAction.Accepted
                : ConsentAction.Rejected,
            },
          ]
        };
        if (config.AccessCodeMandatory) {
          body.AccessCode = this.state.formData.freeAccessCode;
        }
        this.props.createPlatformUser(body, this.state.formData.freeAccessCode);
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.errorMessage != this.props.errorMessage) {
      if (this.props.errorMessage != undefined) {
        this.setState({ submitted: false });
      }
    }
    if (prevProps.tnConsent.label !== this.props.tnConsent.label) {
    }
    var ControledClass = document.getElementsByClassName("controledClass");
    if (ControledClass.length > 0) {
      ControledClass[0].addEventListener("click", this.OpenTncDialog);
    }
    if (
      this.props.consents != null &&
      prevProps.consents != this.props.consents
    ) {
      for (var i = 0; i < this.props.consents.length; i++) {
        if (this.props.consents[i].policy == "tnc") {
          this.setState({ tncHtml: this.props.consents[i].policyHtml });
        }
      }
    }


    if (this.state.formData.firstName.length != 0 && this.state.formData.lastName.length != 0 && this.state.formData.email.length != 0 && this.state.formData.password.length != 0 && this.state.formData.tncConsent == true) {
      if (this.state.isFormFilled == false) {
        this.setState({ isFormFilled: true })

      }
    } else {
      if (this.state.isFormFilled == true) {

        this.setState({ isFormFilled: false })

      }
    }

  }

  componentDidMount() {
    this.props.loadConsentDetail();
    this.props.loadSubscriptionProducts();

    ValidatorForm.addValidationRule("required", value => value);
    ValidatorForm.addValidationRule("passwordStrength", value => {
      var strongRegex = new RegExp("^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$");
      if (strongRegex.test(value)) {
        return true;
      }
      else if (this.state.formData.password.length == 0) {
        return true;
      }
      return false;
    });
  }

  render() {
    const { formData, submitted } = this.state;
    let authRedirect = null;
    if (this.props.userCreated) {
      if (this.props.isAuthenticated && !this.state.purchaseCallMade) {
        if (
          this.props.verifiedAccessCode != "" &&
          this.props.verifiedAccessCode != null
        ) {
          this.props.onGetFreeSubscription(this.props.verifiedAccessCode);
        } else {
          let productTag = "";
          let planTag = "";
          if (this.props.trialPlan != null && this.props.trialPlan.length > 0) {
            productTag = this.props.trialPlan[0].productId;
            planTag = this.props.trialPlan[0].tag;
            this.props.onStartFreeTrail(planTag, productTag);
          }
        }

        this.setState({ purchaseCallMade: true });
        authRedirect = <Redirect to="/" />;
      }
    }

    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to="/" />;
    }
    return (
      <Grid container>

        <div className="browse-collection-menu padding16">
          {/* {this.state.authRedirect!='' &&(
                  this.state.authRedirect  
                )} */}
          {authRedirect}
          <Grid item>
            <div className="m-t-55">
              <PageTitle label={Translate({ id: "Signup.Title" })} TiltleBackColor="white" />

              <div className="subscriptionTagline subText">
                <Typography variant="h6">
                  {Translate({
                    id: "Signup.SignUpSubTitle",
                    values: { clubName: localStorage.getItem("ClientDisplayName") },
                  })}
                </Typography>
              </div>
            </div>

          </Grid>

          <ValidatorForm
            ref="form"
            onSubmit={this.handleSubmit}
            className="editForm signupInputs"
            onError={() => this.setState({ isError: true })}
          >
            {/* <div className="clipLoaderDiv">
              <Fade
                in={this.props.loading}
                style={{
                  transitionDelay: this.props.loading ? "800ms" : "0ms",
                  backgroundColor: "#fff",
                }}
                unmountOnExit
              >
                <Spinner backColor="white" />
              </Fade>
            </div> */}
            <span className="errorMessage">{this.props.errorMessage}</span>
            <div className="marginFormTop">

              <InputText
                isError={this.state.isError}
                label={Translate({ id: "Signup.FName" })}
                callback={this.handleChange}
                name="firstName"
                value={formData.firstName}
                validators={["required"]}
                errorMessages={[
                  Translate({ id: "UpdateProfile.FirstNameRequired" }),
                ]}
              />
              <br />
              <InputText
                isError={this.state.isError}
                label={
                  Translate({ id: "Signup.LName" })}
                callback={this.handleChange}
                name="lastName"
                value={formData.lastName}
                validators={["required"]}
                errorMessages={[
                  Translate({ id: "UpdateProfile.LastNameRequired" }),
                ]}
              />
              <br />
              <InputText
                isError={this.state.isError}
                label={
                  Translate({ id: "Signup.Email" })
                }
                callback={this.handleChange}
                name="email"
                value={formData.email}
                validators={["required", "isEmail"]}
                errorMessages={[
                  <Typography variant="overline"> {Translate({ id: "login.EmailValidFormat" })}</Typography>
                ]}
              />
              <br />
              <InputText
                isError={this.state.isError}
                type="Password"
                label={Translate({ id: "Signup.Password" })}
                callback={this.handleChange}
                name="password"
                value={formData.password}
                validators={["required", "passwordStrength"]}
                errorMessages={[
                  <Typography variant="overline"> {Translate({ id: "ForgetPassword.Regex" })}</Typography>
                ]}
              />
              <br />

              {localStorage.getItem("isAccessCodeMandatory") == "true" && (
                <InputText
                  type="text"
                  label={Translate({ id: "Signup.FreeAccessCode" })}
                  callback={this.handleChange}
                  name="freeAccessCode"
                  value={formData.freeAccessCode}
                  validators={["required"]}
                  errorMessages={[
                    Translate({ id: "Signup.FreeAccessCodeRequired" }),
                  ]}
                />
              )}

              {/* {localStorage.getItem("isAccessCodeMandatory") != "true" && (
                <TextValidator
                  type="text"
                  fullWidth
                  label={Translate({ id: "Signup.FreeAccessCodeFeild" })}
                  onChange={this.handleChange}
                  className="errorbold"
                  name="freeAccessCode"
                  value={formData.freeAccessCode}
                  validators={[]}
                />     
              )} */}

              <div className="floatLeft termsMargin">
                <CheckboxValidatorElement
                  name="tncConsent"
                  color="secondary"
                  label={this.props.tnConsent.label}
                  onChange={this.handleCheckChange}
                  validators={["required"]}
                  errorMessages={Translate({ id: "TnCPage.tncAccept" })}
                  checked={formData.tncConsent}
                  value={formData.tncConsent}
                />
              </div>

              <div className="clear" />
              <br />
              <div className='padding16'>
                {!this.props.loading ? (
                  <Button
                    disabled={!this.state.isFormFilled}
                    type="submit"
                    variant="contained"
                    color="secondary"
                    className="button"
                    style={{ width: "100%", height: 64, borderRadius: 35, marginBottom: "15px" }}     >
                    <Typography variant="button" style={{ color: "secondary" }}>
                      {Translate({ id: "Signup.Title" })}
                    </Typography>
                  </Button>
                ) : (
                    <Button
                      disabled
                      variant="contained"
                      color="secondary"
                      className="button"
                      style={{ width: "100%", height: 64, borderRadius: 35, marginBottom: "15px" }}
                    >
                      <Grid
                        container
                        direction="row"
                        justify="center"
                      >
                        <Grid item>
                          <Typography variant="button" style={{ color: "secondary" }}>
                          {Translate({ id: "Signup.PleaseWait" })}
                    </Typography>
                        </Grid>
                        <Grid item>
                          <CircularProgress
                            style={{
                              marginLeft: "5px",
                              color: "#fff",
                              height: "2em",
                              width: "2em",
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Button>
                  )}
              </div>
              <div>
                <Typography variant="caption" style={{ color: "#8e8e93" }}>
                  {Translate({ id: "login.Disclaimer" })}
                </Typography>
              </div>
            </div>
            <br />
            <br />
          </ValidatorForm>
          <CustomDialog
            open={this.state.tncDialog}
            title={Translate({ id: "TnCPage.dialogText" })}
            cancelicon={true}
            isContentScrollable={true}
            handleDialogClose={this.handleDialogClose}
            acceptedCallback={this.acceptTnc}
          >
            <div>
              {this.state.tncHtml ? ReactHtmlParser(this.state.tncHtml) : null}
            </div>
          </CustomDialog>
        </div>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    consents: state.auth.consents,
    tnConsent: getTNCConsent(state),
    errorMessage: state.auth.errorMessage,
    userCreated: state.auth.userCreated,
    isAuthenticated: state.auth.token !== "",
    trialPlan: getTrailPlanDetail(state),
    verifiedAccessCode: state.auth.VerifiedAccessCode,
    loading: state.auth.loading || state.subscription.loading,
    gotfreeTrialResponse: state.subscription.gotfreeTrialResponse,
    freeSubscriptionPurchaseStatus:
      state.subscription.freeSubscriptionPurchaseStatus,
    deepLinkPayload: state.auth.deepLinkPayload 
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onclearAuthData: () => dispatch(clearAuthData()),
    onGetFreeSubscription: code => dispatch(GetFreeSubscription(code)),
    loadConsentDetail: () => dispatch(GetConsentDetail()),
    createPlatformUser: (userData, freeAccessCode) =>
      dispatch(createUserWrapper(userData, freeAccessCode)),
    loadSubscriptionProducts: () => dispatch(GetSubscriptionProduct()),
    onStartFreeTrail: (planId, productId) =>
      dispatch(StartFreeTrail(planId, productId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SignupPage));
