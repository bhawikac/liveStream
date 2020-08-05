import React, { PureComponent } from "react";
 

class ClassDetailTailer extends PureComponent {
  constructor(props) {
    super(props);
  

    this.state = {
      isClassFav: false,
      selectedItem: "",
      isPlaying: false,
      isClassNew: false,
    };
  }

  

  render() {
    return (
      <div style={{ maxWidth: "1200px !important" }}>
        <video
          // className="no-video-trailer"
          loop
          controls={true}
          style={{
            objectFit: "fill",
            maxWidth: "80%",
            // height: "354px",
            // padding: "0px !important",
          }}
          poster={`${this.props.thumbnail}?width=1200`}
        >
          <source src={this.props.trailerUrl} type="video/mp4" />
        </video>
        
      </div>
    );
  }
}

export default ClassDetailTailer;
