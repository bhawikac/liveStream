import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import ErrorRoundedIcon from '@material-ui/icons/ErrorRounded';
import { TextValidator } from "react-material-ui-form-validator";
import { ValidatorComponent } from 'react-material-ui-form-validator';

class ValidationTextFields extends ValidatorComponent {
    constructor(props) {
        super(props)
        this.state = {
            isFilled: false
        }
    }
     callBack = (event) => {
        this.props.callback(event);
        if (event.target.value.length > 0) {
            if (this.state.isFilled == false) {
                this.setState({ isFilled: true })

            }
        } else {
            this.setState({ isFilled: false })
        }
    }
    render() {
        const { isValid } = this.state;
        const { errorMessages, name, validators, requiredError, value, label, isError, type, ...rest } = this.props;

     
        return (
            <React.Fragment>
                { 
                    <TextValidator 
    
                       type={type}
                        InputProps={{
                            endAdornment: (   
                                <InputAdornment position="end" color="secondary">
                                    {this.state.isFilled ?  
                                        isValid ?
                                            <CheckCircleRoundedIcon style={{fontSize:"1.25em", marginBottom:"8px"}} color="secondary" />
                                            :
                                            <ErrorRoundedIcon style={{fontSize:"1.25em", marginBottom:"8px"}} color="error" /> :
                                        null
                                    }
                                </InputAdornment>
                            ),
                        }}
                        fullWidth
                        label={this.state.isFilled ?
                            isValid ?
                            label : errorMessages:
                            isError ? errorMessages :label
                        }  
                        onChange={(e) => this.callBack(e)}
                        name={name}
                        value={value}
                        className="errorbold"
                        validators={validators}
                        errorMessages=" "
                    />

                }

            </React.Fragment>
        )
    }
}
export default ValidationTextFields;