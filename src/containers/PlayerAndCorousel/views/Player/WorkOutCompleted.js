import React from "react";
import { Translate } from "../../../../utils/Translate";
import { Button, Typography } from "@material-ui/core";

export default function WorkOutCompleted(props) {
  return (
    <div className="workOutCompleted p-lr-xs-15">
      <div className="workOutCompletedHolder">
        {/* <p className="workOutCompletedVideoTitle m-b-20">
          <Typography variant="h2">
            {props.videotitle}
          </Typography>
        </p> */}



        <img
          className="DoneTimer"
          src={require("../../../../assets/images/timer.svg")}
        />
 
 

        <p className="playerButtonText doneScreenText">
        {Translate({ id: "Player.WorkOutCompleted" })}
          {Math.round(props.elapsedTime / 60)} {" "}
          {Translate({ id: "Player.min" })} </p>


        <Button
          variant="contained"
          color="secondary"
          className="playerButtons"
          onClick={props.workOutCompleteHandler}
        >
          <p className="playerButtonText">
            {Translate({ id: "Player.Done" })}
          </p>
        </Button>
      </div>
    </div>
  );
}
