import React from "react";
import Button from "@material-ui/core/Button";
import PageTitle from "../PageTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import withStyles from "@material-ui/core/styles/withStyles";

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
const CustomModal = props => (
  <Dialog
    classes={{
      paper: props.classes.paper
    }}
    open={props.open}
    // onClose={props.cancelButtonClick}
    aria-labelledby="modal-label"
    aria-describedby="modal-description"
  >
    <DialogTitle classes={{ root: props.classes.dialogTitle }}>
      {props.cancelButtonText && (
        <span className="close" onClick={props.cancelButtonClick}>
          &times;
        </span>
      )}
      {props.modelTitle && <PageTitle label={props.modelTitle} />}
    </DialogTitle>
    <DialogContent>
      <DialogContentText style={{ textAlign: "justify" }}>
        {props.modelDescription && (
          <div>{labelText(props.modelDescription)}</div>
        )}
        {/* <p id="modal-description">The Tnc has been updated since you have accepted any </p>
                    {props.consentText} */}
        Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
        consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel
        scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue
        laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla sed
        consectetur. Praesent commodo cursus magna, vel scelerisque nisl
        consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
        auctor fringilla. Cras mattis consectetur purus sit amet fermentum. Cras
        justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus,
        porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus
        magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel
        augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum
        nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque
        nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non
        metus auctor fringilla. Cras mattis consectetur purus sit amet
        fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam.
        Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent
        commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus
        sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean
        lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna,
        vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
        ullamcorper nulla non metus auctor fringilla. Cras mattis consectetur
        purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
        egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum
        at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur
        et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
        auctor. Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
        cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui.
        Donec ullamcorper nulla non metus auctor fringilla. Cras mattis
        consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
        facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur
        ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque
        nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum
        faucibus dolor auctor. Aenean lacinia bibendum nulla sed consectetur.
        Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
        Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.
        Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
        consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel
        scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue
        laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla sed
        consectetur. Praesent commodo cursus magna, vel scelerisque nisl
        consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
        auctor fringilla.
      </DialogContentText>
    </DialogContent>

    <div
      style={{
        textAlign: "center",
        margin: "20px auto 40px auto"
      }}
    >
      {props.okButtonText && (
        <Button
          variant="contained"
          color="secondary"
          className="button"
          onClick={props.okButtonClick}
        >
          {props.okButtonText}
        </Button>
      )}
      &nbsp;
      {props.cancelButtonText && (
        <Button
          variant="contained"
          color="secondary"
          className="button"
          onClick={props.cancelButtonClick}
        >
          {props.cancelButtonText}
        </Button>
      )}
    </div>
  </Dialog>
);
function labelText(text) {
  return <div dangerouslySetInnerHTML={createMarkup(text)} />;
}

function createMarkup(html) {
  return { __html: html };
}

export default withMobileDialog((withStyles(customDialogStyle)(CustomModal)));
