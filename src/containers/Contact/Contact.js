import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import PageTitle from '../../components/PageTitle'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import { Grid, Typography } from "@material-ui/core";
import { connect } from 'react-redux';
import { Translate } from '../../utils/Translate';
import '../Contact/Contact.css';
import { sendContactUsMail } from '../../store/actions/common';
import Routes from '../../components/Router/Routes'


const mapDispatchToProps = dispatch => {
    return {
        onSendMail: (name, email, message) => dispatch(sendContactUsMail(name, email, message))
    };
}

const mapStateToProps = state => {
    return {};
}

class Contact extends Component {

    constructor(props) {
        super(props);

        this.state = {
            formData: {
                email: '',
                name: '',
                message: ''
            },
            submitted: false,
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
            this.props.onSendMail(this.state.formData.name, this.state.formData.email, this.state.formData.message);
        });
    }


    render() {
        const { formData, submitted } = this.state;
        let body;
        if (this.state.submitted == true) {
            body = (
                <div className="page-container">
                <div className="m-t-55 p-t-62  m-t-xs-20">
                    <div className="m-b-xs-10 m-t-xs-20">
                    <PageTitle label={Translate({ id: "contact.Thanks" })} />
                    <Typography variant="h6" className="text-gray m-b-xs-10" >
                        {Translate({ id: "contact.ThanksMessage" })}</Typography>
                        </div>
                    <div className="m-t-55 p-t-62 m-t-xs-20">
                    <Button
                            variant="contained"
                            color="secondary"
                            className="button playerButtons m-t-xs-20"
                            onClick={() => {this.props.history.push({ pathname: Routes.classListViewRoute })}}
                          >
                            <Typography variant="button">                              
                              {Translate({ id: "contact.BackToHome" })}
                            </Typography>
                          </Button>
                    </div>
                    </div>
                </div>
            );
        }
        else {
            body = (
                <div className="page-container">
                <Grid container className="m-t-55">
                    {/* <Grid item xs={3} sm={3}></Grid> */}
                    <div className="browse-collection-menu">
                    <Grid item>
                        <ValidatorForm
                            ref="form"
                            onSubmit={this.handleSubmit}
                            className="editForm"
                        >
                            <PageTitle label={Translate({ id: "contact.Title" })} TiltleBackColor="white" />

                            <div className="m-bt-lg-60">
                                <span className="errorMessage">{this.props.errorMessage}</span>
                            </div>

                            <TextValidator
                                fullWidth
                                label={Translate({ id: "contact.Name" })}
                                onChange={this.handleChange}
                                name="name"
                                value={formData.name}
                                validators={['required']}
                                errorMessages={[Translate({ id: 'contact.NameRequired' })]}
                                style={{marginTop:"10px"}}
                            />
                            <br />
                            <TextValidator
                                fullWidth
                                label={Translate({ id: "contact.Email" })}
                                onChange={this.handleChange}
                                name="email"
                                value={formData.email}
                                validators={['required', 'isEmail']}
                                errorMessages={[Translate({ id: 'login.EmailRequired' }), Translate({ id: 'login.EmailValidFormat' })]}
                            />
                            <br></br>
                            <TextValidator
                                fullWidth
                                label={Translate({ id: "contact.Message" })}
                                onChange={this.handleChange}
                                name="message"
                                value={formData.message}
                                validators={['required']}
                                errorMessages={[Translate({ id: 'contact.MessageRequired' })]}
                                className="messageHolder"
                                multiline
                            />                            
                            <div className="m-tb-5 m-t-xs-20">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    className="button m-t-55 playerButtons"
                                >
                                    <Typography variant="button">{Translate({ id: "contact.Send" })}</Typography>
                                </Button>
                                <br /><br />
                                <br /><br />
                            </div>
                        </ValidatorForm>
                    </Grid>
                    {/* <Grid item xs={3} sm={3}></Grid> */}
                    </div>
                </Grid>
                </div>
            );
        }

        return (<div>{body}</div>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Contact));
