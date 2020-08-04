import React, { PureComponent } from "react";
import { ClipLoader } from "react-spinners";
var Cl_color=localStorage.getItem('clientcolor');
export default class Loading extends PureComponent {
  render() {
    const render = this.props.pastDelay ? (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
        <ClipLoader loading={true} color={Cl_color} />
      </div>
    ) : null;

    return render;
  }
}
