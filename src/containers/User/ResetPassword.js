import React, { Component } from "react";
import PageTitle from "../../components/PageTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Grid from "@material-ui/core/Grid";
import { Translate } from "../../utils/Translate";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  ForgetPasswordRequest,
  ResetPasswordRequest,
} from "../../store/actions/auth";

let resetEmail = "";
let resetToken = "";

const mapStateToProps = state => {
  return {
    resetPassworderrorMessage: state.auth.resetPassworderrorMessage,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onResetPasswordRequest: data => dispatch(ResetPasswordRequest(data)),
  };
};

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        password: "",
        ConfirmPassword: "",
      },
      receivedToken: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
  }

  handleResetSubmit() {
    var body = {
      ResetToken: resetToken,
      EmailAddress: resetEmail,
      ApplicationProfile: {
        emailAddress: resetEmail,
        PasswordHash: this.state.formData.password,
      },
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
      <div style={{ marginTop: "50px" }}>
        <div>
          <PageTitle
            label={Translate({ id: "ForgetPassword.EnterNewPassword" })}
          >
          </PageTitle>
          <Grid container spacing={16}>
            {/* <Grid item xs={3} sm={3}></Grid> */}
            <Grid item xs={6} sm={6} className="centerContent">
              <div>
                <ValidatorForm
                  ref="form"
                  onSubmit={this.handleResetSubmit}
                  className="editForm"
                >
                  <br />
                  <div>
                    <span className="errorMessage">
                      {this.props.resetPassworderrorMessage}
                    </span>
                  </div>
                  <br />
                  <TextValidator
                    type="Password"
                    fullWidth
                    label={Translate({ id: "Signup.Password" })}
                    onChange={this.handleChange}
                    name="password"
                    className="errorbold"
                    value={formData.password}
                    validators={["required", "passwordStrength"]}
                    errorMessages={[
                      Translate({ id: "login.PasswordRequired" }),
                      Translate({ id: "ForgetPassword.Regex" }),
                    ]}
                  />
                  <TextValidator
                    type="Password"
                    fullWidth
                    label={Translate({ id: "ForgetPassword.ConfirmPassword" })}
                    onChange={this.handleChange}
                    name="ConfirmPassword"
                    className="errorbold"
                    value={formData.ConfirmPassword}
                    validators={["isPasswordMatch"]}
                    errorMessages={[
                      Translate({ id: "ForgetPassword.PasswordMismatch" }),
                    ]}
                  />
                  <br />
                  <br />
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    className="button"
                  >
                    {Translate({ id: "Player.Done" })}
                  </Button>
                </ValidatorForm>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ResetPassword));
