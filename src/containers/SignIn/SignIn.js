import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";
import { Grid, Typography, Input } from "@material-ui/core";
import { connect } from "react-redux";
import { AuthenticateUser, clearAuthData } from "../../store/actions/auth";
import { Redirect } from "react-router-dom";
import { Translate } from "../../utils/Translate";
import Fade from "@material-ui/core/Fade";
import Spinner from "../../components/spinner/spinner";
import InputText from '../../ValidatorComponent/TextBoxValidatorComponent';
const config = require('../../assets/config.json');

class SignInPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formData: {
                email: "",
                password: "",

            },
            isFormDone: false,
            submitted: false,
        };

    }

    handleChange = (event) => {
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;
        this.setState({ formData });
    }

    handleSubmit = () => {
        this.setState({ submitted: true }, () => {
            this.props.onAuhtneticate(
                this.state.formData.email,
                this.state.formData.password
            );
        });
    }


    componentDidUpdate(prevProps, prevState) {
        if (prevProps.errorMessage != this.props.errorMessage) {
            if (this.props.errorMessage != undefined) {
                this.setState({ submitted: false });
            }
        }
        if (this.state.formData.email.length != 0 && this.state.formData.password.length != 0) {
            if (this.state.isFormDone == false) {

                this.setState({
                    isFormDone: true,
                })
            }
        }
        else {
            if (this.state.isFormDone == true) {

                this.setState({ isFormDone: false })

            }
        }
    }
    componentWillUnmount() {
        console.log(`SignInPage clubmanager`)

        if (this.props.deepLinkPayload != null) {
            console.log("Deeplink Payload");
            console.log(this.props.deepLinkPayload);
            if (this.props.isAuthenticated) {
                this.props.history.push({ pathname: this.props.deepLinkPayload });
            }
        }

        this.props.onclearAuthData();
    }

    render() {
        const { formData, submitted } = this.state;

        if (this.props.isAuthenticated) {
            this.props.history.push({ pathname: "/" });
        }
        return (
            this.props.loading ? (
                <div className="clipLoaderDiv" >
                    <Fade in={this.props.loading}
                        style={
                            {
                                transitionDelay: this.props.loading ? "800ms" : "0ms",
                                backgroundColor: "white",
                            }
                        }
                        unmountOnExit >
                        <Spinner backColor="white" />
                    </Fade>
                </div>) : (
                    <Grid container >
                        <div class="browse-collection-menu padding16">
                            <Grid item>
                                <div className="m-t-55">
                                    <Typography variant="h1" >{Translate({ id: "login.Title" })}
                                    </Typography>
                                    <div className="subscriptionTagline subText" >
                                        <Typography variant="h6" > {
                                            Translate({
                                                id: "login.LoginSubTitle",
                                                values: { clubName: localStorage.getItem("ClientDisplayName") },
                                            })
                                        }
                                        </Typography>
                                    </div>
                                </div>
                                {
                                    this.props.showAccessDeniedDialog ? < div className="deniedAccess" > {Translate({ id: "login.DeniedAccessText" })} <
                                        br /> {Translate({ id: "login.DeniedAccessText2" })} </div> : <div> <span className="errorMessage" > {this.props.errorMessage} </span> </div>} <ValidatorForm
                                            className="editForm loginInputs"
                                            ref="form"
                                            onSubmit={this.handleSubmit} >
                                    <div className="marginFormTop" >
                                        <InputText
                                            placeholder="Email"
                                            label={Translate({ id: "Signup.Email" })}
                                            callback={this.handleChange}
                                            name="email"
                                            value={formData.email}
                                            className="errorbold"
                                            validators={["required", "isEmail"]}
                                            errorMessages={
                                                [<Typography variant="overline">
                                                    {Translate({ id: "login.EmailRequired" }),
                                                        Translate({ id: "login.EmailValidFormat" })}
                                                </Typography>]
                                            }
                                        />
                                        <br />
                                        <InputText
                                            type="Password"
                                            placeholder="Password"
                                            label={Translate({ id: "Signup.Password" })}
                                            fullWidth
                                            callback={this.handleChange}
                                            name="password"
                                            value={formData.password}
                                            validators={["required"]}
                                            className="errorbold"
                                            errorMessages={[Translate({ id: "login.PasswordRequired" })]}
                                        />
                                        <br />
                                        {
                                            config.showForgetPasswordPage === false ? (null) : (
                                                < div >
                                                    <Link to={"user/forget/0"}
                                                        className="dynamiclinks"
                                                        style={
                                                            { alignItems: "flex-end", float: "right" }} >
                                                        <Typography variant="subtitle2" color="secondary"
                                                            style={
                                                                { fontWeight: "600", marginBottom: "30px", marginTop: "7px" }} >
                                                            {Translate({ id: "login.ForgotPassword" })}
                                                        </Typography>
                                                    </Link>

                                                </div>
                                            )}
                                        <div className="clear" >  </div> <div className="padding16" >
                                            <Button fullWidth
                                                disabled={!this.state.isFormDone}
                                                type="submit"
                                                variant="contained"
                                                color="secondary"
                                            >
                                                <Typography variant="button" > {Translate({ id: "layout.SignIn" })} </Typography> </Button> </div>
                                        <p className="subText ft-12" >
                                            <span >
                                                <Typography variant="caption"
                                                    className="text-gray" > {Translate({ id: "login.Disclaimer" })} </Typography>  </span> </p> </div> </ValidatorForm>
                            </Grid>
                        </div>
                    </Grid>)
        );
    }
}
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        errorMessage: state.auth.errorMessage,
        isAuthenticated: state.auth.token !== "",
        showAccessDeniedDialog: state.auth.showDialog,
        deepLinkPayload: state.auth.deepLinkPayload
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuhtneticate: (uname, password) =>
            dispatch(AuthenticateUser(uname, password)),
        onclearAuthData: () => dispatch(clearAuthData()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(SignInPage));