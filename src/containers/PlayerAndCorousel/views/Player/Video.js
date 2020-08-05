import React from "react";
import Button from "@material-ui/core/Button";
import { Translate } from "../../../../utils/Translate";
import Routes from '../../../../components/Router/Routes'
export class Video extends React.Component {
  //constructor(props) {
  //super(props);
  //this.startVideo = React.createRef();
  //}
  componentDidMount() {
    //this.startVideo.current.play();
  }
  render() {
    return (
      <div>
        <video
         
          className="video-js vjs-default-skin"
          controls
          
          onMouseMove={() => this.props.showleaveBarMethod}
        >
          <source src={this.props.videourl} type="application/x-mpegURL" />
        </video>
      </div>
    );
  }
}

export function VideoError(props) {
  return (
    <div className="workOutCompleted">
      <div className="workOutCompletedHolder">
        <p className="workOutCompletedTime">
          {Translate({ id: "Player.VideoError" })}
        </p>
        <Button
          variant="contained"
          color="secondary"
          className="button playerButtons"
          style={{ backgroundColor: localStorage.getItem("clientcolor") }}
          onClick={() => {
            props.history.push({ pathname:Routes.classListViewRoute});
          }}
        >
          <p className="playerButtonText">{Translate({ id: "Player.Exit" })}</p>
        </Button>
      </div>
    </div>
  );
}
