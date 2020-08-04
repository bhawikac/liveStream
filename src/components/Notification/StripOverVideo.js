import React from "react";
import { Translate } from "../../utils/Translate";
import Button from "@material-ui/core/Button";
import { Grid, Typography } from "@material-ui/core";
import { CCSTrnasiotionGroup } from "react-transition-group";


export function StripComponent(props) {
  return (
    <div
      onLoad={props.showleaveBarMethod}
      onMouseEnter={props.showleaveBarMethod}
      className="video-paused-infobox-leave vjs-has-started vjs-control-bar"
      style={{
        height: "4rem !important",
        position: "absolute",
        top: "0px",
        marginTop: "0px",
        alignItems: "baseline", backgroundColor: "transparent !important"
      }}
    >
      {props.isFullScreen &&
        <Typography variant="h2" className="videoOverlayText p-r-s-72" style={{ marginTop: "-20px" }}>{props.videotitle}</Typography>

      }

      <img
        onClick={props.leavingClassSelected}
        className="closeButtonbig customClosePlayer  modalClose  btn-default"
        // style={{ boxSizing: "content-box", right: "16px" }}
        src={require("../../assets/images/close.svg")}
      />
      <img
        onClick={props.leavingClassSelected}
        className="closeButtonMobile  customClosePlayer modalClose"
        // style={{ boxSizing: "content-box", right: "16px" }}
        src={require("../../assets/images/closeMobile.svg")}
      />
    </div>
  );
}
export function ModalOverVideo(props) {
  return (
    <div className="video-paused-infobox">
      <img
        className="closeButtonbig customClosePlayer modalClose btn-default"
        src={require("../../assets/images/close.svg")}
        onClick={props.resumeHandler}
      />
      <img
        className="closeButtonMobile customClosePlayer modalClose"
        src={require("../../assets/images/closeMobile.svg")}
        onClick={props.resumeHandler}
      />
      <Grid container className="newStrip" direction="column">
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            className="LeaveConfirmationTextButton"
            style={{
              backgroundColor: "transparent",
              width: "100%"
            }}
            onClick={props.resumeHandler}
          >
            <p className='leaveConfirmation'>
              {Translate({ id: "Player.LeaveConfirmation" })}
            </p>

          </Button>
        </Grid>

        <Grid item className="padding16">
          {props.elapsedTime <= 60 && (
            <Button
              variant="contained"
              color="secondary"
              className="playerButtons"
              onClick={props.discardHandler}
            ><p className="playerButtonText">
                {Translate({ id: "Player.Finish" })}
              </p> 
            </Button>
          )}
          {props.elapsedTime > 60 && (
            <Button
              variant="contained"
              color="secondary"
              className="playerButtons"
              onClick={props.logClassHandler}
            >
              <p className="playerButtonText">
                {Translate({ id: "Player.Finish" })}
              </p>
            </Button>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
