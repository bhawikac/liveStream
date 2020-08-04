import React from "react";

const componentImage = props => (
  <div>
    <img
      style={{ width: props.width }}
      src={props.imageSrc}
      alt="Logo"
      className="image"
    />
  </div>
);

export default componentImage;
