import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import withStyles from "@material-ui/core/styles/withStyles";
import DialogContentText from "@material-ui/core/DialogContentText";
import ReactHtmlParser from "react-html-parser";

import withMobileDialog from "@material-ui/core/withMobileDialog";

import { Grid } from "@material-ui/core";

const customDialogStyle = {
  paper: {
    borderRadius: 0,
    width: "80%",
    maxWidth: "800px",
    textAlign: "center"
  },
  dialogTitle: {
    padding: "0px",
    margin: "-28px auto 0px auto"
  }
};
class CustomDialog extends React.Component {
  render() {
    const { classes, ...props } = this.props;
    return (
      <Dialog
        classes={{
          paper: classes.paper
        }}
        scroll="paper"
        onClose={() => this.props.handleDialogClose}
        {...props}
      >
        <DialogTitle id="scroll-dialog-title">
          <Grid container direction="row" justify="center">
            <Grid item>
              <img
                onClick={this.props.handleDialogClose}
                className="CloseDialogButton"
                src={require("../../assets/images/close.svg")}
              />
            </Grid>
            <Grid item>
              <p class="c14">
                <span class="c8 c10 c35">Terms and conditions</span>
              </p>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{ textAlign: "justify" }}>
            {this.props.tncHtml ? ReactHtmlParser(this.props.tncHtml) : null}
          </DialogContentText>
        </DialogContent>
        <DialogActions />
      </Dialog>
    );
  }
}

export default withMobileDialog()(withStyles(customDialogStyle)(CustomDialog));
