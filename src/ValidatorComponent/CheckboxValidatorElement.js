   import React from 'react';
import { ValidatorComponent } from 'react-material-ui-form-validator';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import RadioButtonUncheckedRoundedIcon from '@material-ui/icons/RadioButtonUncheckedRounded';
import RadioButtonCheckedRoundedIcon from '@material-ui/icons/RadioButtonCheckedRounded';


class CheckboxValidatorElement extends ValidatorComponent {

    render() {

        const { errorMessages, validators, requiredError, value, label, ...rest } = this.props;

        return (
            <div className="terms"   >
                <FormControlLabel control={
                <Checkbox
                     icon={
                     <RadioButtonUncheckedRoundedIcon  className="termsIcon" />
                    }
                     checkedIcon={
                     <RadioButtonCheckedRoundedIcon  className="termsIcon" />
                    }
                    {...rest}
                    ref={(r) => { this.input = r; }}
                    style={{float:""}}
             
                />

         
                }
                    label={this.labelText(label)}
                  
                />

                <p className='Error'>{this.errorText()}</p>
            </div>
        );
    }

    errorText() {
        const { isValid } = this.state;

        if (isValid) {
            return null;
        }

        return (
            <div className="MuiFormHelperText-root-250 MuiFormHelperText-error-251" >
                {this.getErrorMessage()}
            </div>
        );
    }


    labelText(text) {
        return <div dangerouslySetInnerHTML={this.createMarkup(text)} />;
    }

    createMarkup(html) {
        return { __html: html };
    }
}

export default CheckboxValidatorElement;
