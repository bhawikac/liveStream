import React from "react";
import Tc from "../../assets/tc/tc"
import PageTitle from "../../components/PageTitle";

class TncLink extends React.PureComponent {
  render() {
    return (
      <div className="p-t-62">
        <PageTitle label="Terms and Conditions" />
        
        <Tc />
      </div>
    );
  }
}
export default TncLink;
