import React from "react";

class CountDown extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
   // window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="video-wrapper no-backGroung">
        <p className="minusTimer">{this.props.minusTimer}</p>
      </div>
    );
  }
}
export default CountDown;
