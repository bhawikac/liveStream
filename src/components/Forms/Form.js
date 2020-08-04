// It is reusable form for sign up or signit and other places

import React from 'react';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";


class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isFormFilled: false
        }
    }

    render() {
        return (
            <React.Fragment>
                <ValidatorForm>
                    {this.props.children}

                </ValidatorForm>

            </React.Fragment>
        )
    }

}

export default Form;
