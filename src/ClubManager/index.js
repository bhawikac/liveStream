import React, { useState } from "react";

import { connect } from "react-redux";
import { AuthenticateUser, clearAuthData } from "./action";


const mapStateToProps = state => {
  return {
    loading: state.loading,
    errorMessage: state.errorMessage,
    isAuthenticated: state.token !== ""
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuhtneticate: (uname, password) =>
      dispatch(AuthenticateUser(uname, password)),
    onclearAuthData: () => dispatch(clearAuthData())
  };
};

class clubManager extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {
      formData: "old",
      test: "sdf"
    }
    this.setFormData = this.setFormData.bind(this);
  }
  setFormData = (data) => {
    this.setState({ formData: data, test: "new" }, () => {
      this.props.onAuhtneticate(
        this.state.formData.email,
        this.state.formData.password
      );
    });

  }
  //const [formState, submit] = useState({ isSubmitted: false })
  render() {
    return (
      <React.Fragment>
    {this.props.children}
      </React.Fragment>
    }
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(clubManager);
