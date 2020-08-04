import React from "react";
import ReactDOM from "react-dom"
const videoJs = document.getElementsByClassName("ClassPlayer");
class Portal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }
  componentDidMount() {
    if(videoJs.length>0){
      console.log("strip mounted 2")
      videoJs[0].appendChild(this.el);
    }
   
   
  }

  componentWillUnmount() {
     // if(videoJs.length>0){
       // videoJs[0].removeChild(this.el);
    //}
    
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}
export default Portal;