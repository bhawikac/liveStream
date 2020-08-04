import React from "react";
import { Grid, Typography } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Styles from './ModalStyle'


class CustomDialog extends React.Component {

  render() {
    const { cancelicon, classes, title, open, isContentScrollable, children, heading } = this.props;

    return (
      //CUSTOM DIALOG USED IN THE WHOLE APPLICATION FOR DIFFERENT PURPOSES;
      // STYLE IS BEING CONTROLED BY  "this.props.cancelicon"
      //"this.props.cancelicon" will render cancle button and bigger modals 
      <Dialog
        classes={{
          paper: cancelicon ? isContentScrollable ? classes.paper3 : classes.paper1 : classes.paper2
        }}
        scroll="paper"
        open={open}
        onClose={this.props.cancelButtonClick}
      >

        {cancelicon ?
          <Grid item className="tncClose">
            <img
              className="CloseButton customClose  btn-default" onClick={this.props.handleDialogClose} 
              src={require("../../assets/images/close.png")}
            />  

          </Grid>  
          : null}
        {title && (

          <Grid item xs={12} sm={12} className="padding16">
            <Typography variant="h1">
              {title}
            </Typography>

          </Grid>
        )}

        <Grid Item xs={12} sm={12} lg={8} md={8} className="padding16 m-auto">
          <Typography variant="h3" className="text-gray m-b-20 m-t-5">
            {heading}
          </Typography>
        </Grid>

        {isContentScrollable ?
          //DialogContent renders srollable content|| scrollable content is being rendered in tnc dialog
          <DialogContent>
            <DialogContentText>
              {children}
            </DialogContentText>
          </DialogContent> :

          <React.Fragment>
            {children}
          </React.Fragment>
        }

        <Grid className="p-lr-24 padding16"
          style={this.props.gridstyle}
        >
          {this.props.okButtonText && (
            <Button fullWidth
              size="large"
              variant="contained"
              color="secondary"
              className="button"
              onClick={this.props.okButtonClick}
              style={this.props.buttonstyle}
            >
              <Typography variant="h5">
                {this.props.okButtonText}
              </Typography>
            </Button>
          )}
            &nbsp;
            {this.props.cancelButtonText && (
            <Button
              variant="contained"
              color="secondary"
              className="button"
              onClick={this.props.cancelButtonClick}
            >
              {this.props.cancelButtonText}
            </Button>
          )}
        </Grid>

      </Dialog>
    );
  }
}


export default withStyles(Styles)(CustomDialog);
