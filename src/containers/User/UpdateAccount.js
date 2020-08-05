import React, { Component } from "react";
import PageTitle from "../../components/PageTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Grid, Typography, Input } from "@material-ui/core";
import { Translate } from "../../utils/Translate";
import Button from "@material-ui/core/Button";
import { GetUserDetail, UpdateUserProfileData } from "../../store/actions/auth";
import Spinner from "../../components/spinner/spinner";
import Fade from "@material-ui/core/Fade";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token != "",
    errorMessage: state.auth.errorMessage,
    userDetail: state.auth.userDetail,
    userUpdatedSucessfully: state.auth.userUpdatedSucessfully,
    loading: state.auth.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUserDetail: () => dispatch(GetUserDetail()),
    onUpdateClick: data => dispatch(UpdateUserProfileData(data))
  };
};

class UpdateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ChangeEmail: false,
      ChangeName: false,
      formData: {
        email: "",
        firstName: this.props.userDetail? this.props.userDetail.firstName : "",
        lastName: this.props.userDetail? this.props.userDetail.lastName : "",
        userUpdated: "false"
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
  }

  handleSubmit() {
    this.setState({ submitted: true }, () => {
      this.props.onUpdateClick(this.state.formData);
    });
  }

  componentDidMount() {
    if (!this.props.isAuthenticated) {
      this.props.history.push({ pathname: "/signin" });
    }

    var item = null;

    if (
      this.props.location.state != undefined ||
      this.props.location.state != null
    ) {
      item = this.props.location.state.updateItem;
    }
    if (item != null || item != undefined) {
      if (item.toLowerCase() === "email") {
        this.setState({ ChangeEmail: true, ChangeName: false });
      }
      if (item.toLowerCase() === "name") {
        this.setState({ ChangeEmail: false, ChangeName: true });
      }
    }
  }
componentDidUpdate(prevProps){
  if(prevProps.userUpdatedSucessfully !== this.props.userUpdatedSucessfully){
      this.setState({userUpdated: this.props.userUpdatedSucessfully})
  }
}
  render() {
    const { formData, submitted } = this.state;

    return (
      <div  >
        {this.state.ChangeEmail && (
          <div className="page-container">
            <div className="browse-collection-menu">
              <Typography variant="h1" className="m-b-20 m-t-55">
                {Translate({
                    id: "UserAccount.Title"
                  })}
              </Typography>
            </div>
            <ValidatorForm
              ref="form"
              onSubmit={this.handleSubmit}
              className="editForm"
            >
              <div className="clipLoaderDiv">
                {this.props.userUpdatedSucessfully &&
                  this.props.history.push({ pathname: "/user/account" })}
                <Fade
                  in={this.props.loading}
                  style={{
                    transitionDelay: this.props.loading ? "800ms" : "0ms",
                    backgroundColor: "#fff"
                  }}
                  unmountOnExit
                >
                  <Spinner backColor="#fff" />
                </Fade>
              </div>
              <div>
                <span className="errorMessage">{this.props.errorMessage}</span>
              </div>
              <Input
                fullWidth
                label={Translate({ id: "UserAccount.Title" })}
                onChange={this.handleChange}
                name="email"
                style={{ maxWidth: 500, height: 64 }}
                value={formData.email}
                className="errorbold"
                validators={["required", "isEmail"]}
                errorMessages={[
                  Translate({ id: "login.EmailRequired" }),
                  Translate({ id: "login.EmailValidFormat" })
                ]}
              />
              <br />

              <Button
                type="submit"
                variant="contained"
                color="secondary"
                className="button"

              >

                {Translate({ id: "UpdateProfile.Update" })}
              </Button>
            </ValidatorForm>
          </div>
        )}

        {this.state.ChangeName && (
          <div className="page-container">            
              <div className="browse-collection-menu"> 
                <ValidatorForm
                  ref="form"
                  onSubmit={this.handleSubmit}
                  className="editForm"
                >
                  <Grid container>
                  <Grid item xs={12} sm={12}>
                  {/* <PageTitle label={Translate({ id: "UserAccount.Title" })} /> */}
                  <Typography variant="h1" className="m-b-20 m-t-55">
                      {Translate({ id: "UserAccount.Title" })}
                    </Typography>
                    </Grid>
                    </Grid>
                  <div className="clipLoaderDiv">
                    {this.state.userUpdated &&
                      this.props.history.push({ pathname: "/user/account" })}

                    <Fade
                      in={this.props.loading}
                      style={{
                        transitionDelay: this.props.loading ? "800ms" : "0ms",
                        backgroundColor: "#fff"
                      }}
                      unmountOnExit
                    >
                      <Spinner backColor="#fff" />
                    </Fade>
                  </div>
                  <div>
                    <span className="errorMessage">
                      {this.props.errorMessage}
                    </span>
                  </div>
                                     
                      <Grid container
                        justify="space-between"
                        direction="row"
                        alignItems='flex-end'
                      >
                        <div className="m-t-55 m-t-xs-20">
                          <Typography variant="h2" className="align-left ">
                            {Translate({ id: "UpdateProfile.EditProfile" })}
                          </Typography>
                        </div>

                        <div className="m-t-55 m-t-xs-20">
                          <Typography className="text-right makeTextClickable"
                            variant="subtitle2"
                            color="secondary"
                            onClick={() => {
                              this.props.history.push({ pathname: "/user/account" });
                            }}
                          >

                            {Translate({ id: "Actions.Cancel" })}

                          </Typography>
                        </div>
                      </Grid>

                  
                    <hr className="hrow mbottom-why57" />
                  
                  <div className="">
                    <Input
                      fullWidth
                      placeholder="First Name"
                      onChange={this.handleChange}
                      name="firstName"
                      value={formData.firstName}
                      validators={["required"]}
                      className="errorbold subscribe-input"
                      errorMessages={[
                        Translate({ id: "UpdateProfile.FirstNameRequired" })
                      ]}
                    />
                    <br />
                    <Input
                      fullWidth
                      placeholder="Last Name"
                      onChange={this.handleChange}
                      name="lastName"                      
                      value={formData.lastName}
                      validators={["required"]}
                      className="errorbold subscribe-input"
                      errorMessages={[
                        Translate({ id: "UpdateProfile.LastNameRequired" })
                      ]}
                    />
                    <br />
                  </div>
                  <div className="">


                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      className="button"
                      style={{ width: "100%", borderRadius: 35, marginTop: "56px" }}
                    >
                      <Typography variant="button">
                        {Translate({ id: "UpdateProfile.Update" })}{" "}
                      </Typography>
                    </Button>
                  </div>
                </ValidatorForm>
              </div>
            
          </div>
        )},
      </div>


    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UpdateAccount));
