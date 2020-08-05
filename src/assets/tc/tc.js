import React, { Component } from "react";
import ReactHtmlParser from "react-html-parser";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { GetConsentDetail  } from "../../store/actions/auth";

class Tc extends Component {
  constructor(props){
    super(props);
    this.state={
      tncHtml: null
    }}

    componentDidMount() {
      if (this.props.consents == null || this.props.consents.length == 0) {
        this.props.loadConsentDetail();
      }
    }
    componentDidUpdate(prevProps) {
      if (
        this.props.consents != null &&
        prevProps.consents != this.props.consents
      ) {
        for (var i = 0; i < this.props.consents.length; i++) {
          if (this.props.consents[i].policy == "tnc") {
            this.setState({ tncHtml: this.props.consents[i].policyHtml });
          }
        }
      }
    }

  render() {
    return ReactHtmlParser(this.state.tncHtml);
  }
}
const mapStateToProps = state => {
  return {
    consents: state.auth.consents
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadConsentDetail: () => dispatch(GetConsentDetail()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Tc));
