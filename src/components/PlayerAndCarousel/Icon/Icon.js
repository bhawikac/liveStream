import React, { Component } from "react";

export default class extends Component {
  render() {
    const color = this.props.color ? this.props.color : "white";

    switch (this.props.name) {
      case "close":
        return (
          <svg
            className="svg-cl"
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="23"
            viewBox="0 0 23 23"
            onClick={this.props.clicked}
          >
            <g
              fill="none"
              fillRule="evenodd"
              stroke={color}
              strokeLinecap="square"
              strokeWidth="2"
            >
              <path d="M22.047 22.047L.834.834M.834 22.047L22.047.834" />
            </g>
          </svg>
        );
      case "left_arrow":
        return (
          <svg
            className="svg-cl"
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="20"
            viewBox="0 0 21 20"
          >
            <g fill="none" fillRule="evenodd">
              <rect width="21" height="20" fill={color} rx="0" />
              <path
                stroke="#FFF"
                strokeLinecap="round"
                strokeWidth="2"
                d="M13 5l-5 5.027L12.946 15"
              />
            </g>
          </svg>
        );

      case "left_arrow_featured":
        return (
          <svg className='Featuredstrokes' width="26px" height="53px" viewBox="0 0 28 53" version="1.1" xmlns="http://www.w3.org/2000/svg" display={this.props.showArrow} >
            <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g id="Featured-class" transform="translate(-19.000000, -218.000000)" fillRule="nonzero" stroke={color}>
                <g id="Group-4">
                  <polyline id="Path-2-Copy" transform="translate(33.017090, 244.034180) scale(-1, 1) translate(-33.017090, -244.034180) " points="20 218 46.0341797 244.03418 20 270.068359"></polyline>
                </g>
              </g>
            </g>
          </svg>
        );





      case "right_arrow":
        return (
          <svg
            className="svg-cl"
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="20"
            viewBox="0 0 21 20"
          >
            <g fill="none" fillRule="evenodd">
              <rect width="21" height="20" fill={color} rx="0" />
              <path
                stroke="#FFF"
                strokeLinecap="round"
                strokeWidth="2"
                d="M9 5l5 5.027L9.054 15"
              />
            </g>
          </svg>
        );
      case "right_arrow_featured":
        return (
          <svg className='Featuredstrokes' width="26px" height="53px" viewBox="0 0 28 53" xmlns="http://www.w3.org/2000/svg" display={this.props.showArrow}>
            <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g id="Featured-class" transform="translate(-949.000000, -218.000000)" fillRule="nonzero" stroke={color}>
                <g id="Group-4">
                  <polyline id="Path-2" points="950 218 976.03418 244.03418 950 270.068359"></polyline>
                </g>
              </g>
            </g>
          </svg>
        );




      case "filter":
        return (
          <svg
            className="svg-cl"
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="15"
            viewBox="0 0 23 15"
          >
            <path
              fill="#FFF"
              fillRule="nonzero"
              d="M8.75 15h5v-2.5h-5V15zM0 0v2.5h22.5V0H0zm3.75 8.75h15v-2.5h-15v2.5z"
            />
          </svg>
        );
      case "search":
        return (
          <svg
            className="svg-cl"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <path
              fill="#FFF"
              fillRule="nonzero"
              d="M14.294 12.579h-.903l-.32-.31a7.4 7.4 0 0 0 1.795-4.836 7.433 7.433 0 1 0-7.433 7.433 7.4 7.4 0 0 0 4.837-1.796l.309.32v.904L18.296 20 20 18.296l-5.706-5.717zm-6.861 0a5.139 5.139 0 0 1-5.146-5.146 5.139 5.139 0 0 1 5.146-5.146 5.139 5.139 0 0 1 5.146 5.146 5.139 5.139 0 0 1-5.146 5.146z"
            />
          </svg>
        );
      case "time":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="15"
            viewBox="0 0 13 15"
          >
            <path
              fill={color}
              fillRule="evenodd"
              d="M11.414 4.411l.405-.39c.113.05.25.03.343-.06l.073-.069a.289.289 0 0 0 0-.417l-.519-.502a.313.313 0 0 0-.432 0l-.072.07a.288.288 0 0 0 0 .418l.016.015-.375.362a6.19 6.19 0 0 0-3.591-1.542v-.361h.054a.5.5 0 0 0 .508-.491V1.28a.5.5 0 0 0-.508-.49H6.097a.5.5 0 0 0-.507.49v.164a.5.5 0 0 0 .507.49h.054v.36C3.161 2.553.765 4.904.597 7.859.41 11.116 3 13.912 6.37 14.092c.114.006.228.009.342.009 3.244 0 5.926-2.455 6.105-5.59a5.767 5.767 0 0 0-1.403-4.1zm.082 4.03c-.145 2.542-2.393 4.515-5.054 4.374-2.64-.141-4.67-2.333-4.525-4.886.14-2.457 2.242-4.381 4.786-4.381.089 0 .178.002.268.007 2.641.14 4.671 2.333 4.525 4.885zm-3.817.1c0 .52-.435.94-.972.94-.537 0-.972-.42-.972-.94 0-.424.293-.784.694-.9V4.815c0-.148.125-.268.278-.268.153 0 .278.12.278.268v2.828a.944.944 0 0 1 .694.9z"
            />
          </svg>
        );
      default:
        return null;
    }
  }
}
