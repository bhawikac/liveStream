import React, { Component } from "react";
import "./assets/style/App.css";
// import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import theme from "./theme/theme";
import Layout from "./containers/Layout/Layout";
import { Grid } from "../node_modules/@material-ui/core";
import { withRouter } from "react-router-dom";
import Router from "./components/Router/Router";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { authCheckState, SaveUserConsent } from "./store/actions/auth";
import { searchMetadata } from "./store/actions/ondemand";
import {
  LatestTncStatus,
  getTNCConsent,
} from "./store/selectors/Consents";
import CustomModal from "./components/Modal/Modal";
import { Translate } from "./utils/Translate";
import { ConsentAction } from "./utils/constants";
import axios from 'axios';
import ReactHtmlParser from "react-html-parser";


class App extends Component {
  constructor(props) {
    super(props);

  }
  componentDidMount() {
    /**
     * It makes in api call to firebase then checks to localstorage version
     */
    const version = localStorage.getItem("version");
    if (version != null) {
      console.log("Checking for New version Available")
      if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        console.log("dev mode")
      } else {
        try {

          axios.get(process.env.PUBLIC_URL + "/manifest.json").then((file) => {
            console.log(`Old Version :${version.toString()}`);
            console.log(`New Version ${file.data.verson.toString()}`);
            if (typeof version.toString() == typeof file.data.verson.toString()) {
              if (file.data.verson.toString() != version.toString()) {
                localStorage.setItem("version", file.data.verson.toString());
                alert("New content is available, please refresh your browser");
                window.location.reload(true);
              }
            } else {
              window.location.reload(true);
            }
          })
        } catch (e) {
          console.log("something went wrong")
          window.location.reload(true);
        }
      }
    }




    //if(va){}

    var sUsrAg = navigator.userAgent;
    var style = document.createElement("style");
    if (sUsrAg.indexOf("Firefox") > -1) {
      style.innerHTML = `  .cardDescription-p {
        padding-top: 0px;     
        width: 100%;
        white-space: pre-wrap;
        text-align: left;
        word-break:keep-all;
      }`;
    } else if (sUsrAg.indexOf("Opera") > -1 || sUsrAg.indexOf("OPR") > -1) {
      style.innerHTML = `.cardDescription-p {
        padding-top: 0px;     
        width: 100%;
        white-space: pre-wrap;
        text-align: left;
        word-break:keep-all;
      }`;
    } else if (sUsrAg.indexOf("Trident") > -1) {
      style.innerHTML = `  .cardDescription-p {
        padding-top: 0px;     
        width: 100%;
        white-space: pre-wrap;
        text-align: left;
        word-break:keep-all;
      }`;
    } else if (sUsrAg.indexOf("Edge") > -1) {
      style.innerHTML = `  .cardDescription-p {
        padding-top: 0px;     
        width: 100%;
        white-space: pre-wrap;
        text-align: left;
        word-break:keep-all;
      }`;
    } else if (sUsrAg.indexOf("Chrome") > -1) {
      style.innerHTML = `  .cardDescription-p {
        padding-top: 0px;     
        width: 100%;
        white-space: pre-wrap;
        text-align: left;
        word-break:keep-all;
      } ${
        window.screen.width == 1280
          ? ".slider-Featured-Arrow {padding-left:0px !important}"
          : ""
        }
      ${
        window.screen.width < 1366
          ? "@media (max-width: 1400px) and (min-width: 1251px) {.SearchHolder > * {width: 33.333333333%; min-width: 400px !important;}}"
          : ""
        }`;
    } else if (sUsrAg.indexOf("Safari") > -1) {
      style.innerHTML = `  .cardDescription-p {
        padding-top: 0px;     
        width: 100%;
        white-space: pre-wrap;
        text-align: left;
        word-break:keep-all;
      } ${
        window.screen.width == 1440
          ? ".slider-Featured-Arrow {padding-left:0px !important}"
          : ""
        } ${
        window.screen.width < 1366
          ? "@media (max-width: 1400px) and (min-width: 1251px) {.SearchHolder > * {width: 33.333333333%; min-width: 300px !important;}}"
          : ""
        }`;
    } else {
      style.innerHTML = `  .cardDescription-p {
        padding-top: 0px;     
        width: 100%;
        white-space: pre-wrap;
        text-align: left;
        word-break:keep-all;
      }`;
    }

    var ref = document.querySelector("script");
    ref.parentNode.insertBefore(style, ref);

    this.props.onUserInitialization();

    if (localStorage.getItem("userId") != null) {
      this.props.searchMetadata();
    }
  }
  state = {
    tncModelOpen: true,
    mktgModelOpen: true,
    tncHtml: null,
  };

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
    if (
      prevProps.Metadata != this.props.Metadata &&
      this.props.Metadata != null
    ) {
      localStorage.setItem("classTypes", [this.props.Metadata.classTypes]);
      localStorage.setItem("ProviderType", this.props.Metadata.providers);
    } else if (
      this.props.Metadata == null &&
      localStorage.getItem("userId") != null
    ) {
      this.props.searchMetadata();
    }
  }

  acceptTnc = tag => {
    this.props.saveUserConsent(tag, ConsentAction.Accepted);
    this.setState({ tncModelOpen: false });
  };

  acceptMktg = tag => {
    this.props.saveUserConsent(tag, ConsentAction.Accepted);
    this.setState({ mktgModelOpen: false });
  };

  cancelMktg = tag => {
    this.props.saveUserConsent(tag, ConsentAction.Rejected);
    this.setState({ mktgModelOpen: false });
  };

  checkModelStatus = () => {
    this.setState({ tncmodelOpen: true });
  };

  render() {
    let tncModal = null;

    if (!this.props.isLatestTncAccepted) {
      tncModal = (
        <CustomModal
          open={this.state.tncModelOpen}
          title={Translate({ id: "Reconsent.TncTitle" })}
          isContentScrollable={true}
          // tncHtml={this.state.tncHtml}
          // modelDescription={this.props.tncConsentDetail.label}
          okButtonClick={() => {
            this.acceptTnc(this.props.tncConsentDetail.tag);
          }}
          okButtonText={Translate({ id: "Actions.Accept" })}
        // acceptedCallback={this.acceptTnc}

        >
          <div>
            {this.state.tncHtml ? ReactHtmlParser(this.state.tncHtml) : null}
          </div>
        </CustomModal>
      );
    }

    // if(!this.props.isLatestMktgAccepted){
    //   mktgModal = <CustomModal open={this.state.mktgModelOpen}
    //   modelDescription = {this.props.mktgConsentDetail.label}
    //   okButtonClick = {()=>this.acceptMktg(this.props.mktgConsentDetail.tag)}
    //   modelTitle={Translate({ id: "Reconsent.MktgTitle"})}
    //   cancelButtonText={Translate({ id: "Actions.Cancel"})}
    //   okButtonText={Translate({ id: "Actions.Accept"})}
    //   cancelButtonClick={()=>this.cancelMktg(this.props.mktgConsentDetail.tag)}/>
    // }

    return (
      <MuiThemeProvider theme={theme}>

        {this.state.tncHtml && tncModal}

        <div className="App">
          <Grid container spacing={0}>
            <Grid item xs={12} sm={12}>
              <Layout>
                <Router />
              </Layout>
            </Grid>
          </Grid>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLatestTncAccepted: LatestTncStatus(state),
    Metadata: state.onDemand.Metadata,
    consents: state.auth.consents,
    tncConsentDetail: getTNCConsent(state),
    // mktgConsentDetail : getMKTGConsent(state),
    // isLatestMktgAccepted: LatestMktgStatus(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUserInitialization: () => dispatch(authCheckState()),
    searchMetadata: () => dispatch(searchMetadata()),
    saveUserConsent: (consentTag, action) =>
      dispatch(SaveUserConsent(consentTag, action)),
  };
};

//export default App;
export default injectIntl(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(App)
  )
);
