import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loadable from "react-loadable";
import Loading from "../PlayerAndCarousel/Loading/Loading";
import TncLink from "../../containers/TermsAndConditions/TncLink";
import HomePage from "../../containers/HomePage/HomePage";
import OnDemandPage from "../../containers/OnDemandPage/OnDemandPage";
import AccountButtonDotsMobile from "../../assets/components/AccountButtonDotsMobile";
import BrowseCollections from "../../containers/PlayerAndCorousel/views/ClasslistView/BrowseCollections"
import ClubPage from "../../containers/LiveConnect/ClubPage"
import ClubList from "../../containers/LiveConnect/ClubList"
import Livestreamlist from "../../containers/LiveStreaming/LiveStreamList"
import PaymentDone from "../../containers/Stripe/PaymentDone";
import Routes from './Routes'
const config = require('../../assets/config.json');


const delay = 1500;

const Notfound = Loadable({
  loader: () => import("../404/404"),
  loading: Loading,
  delay,
});

const forgetPassword = Loadable({
  loader: () => import("../../containers/User/ForgetPassword"),
  loading: Loading,
  delay,
});

const updateUserDetails = Loadable({
  loader: () => import("../../containers/User/UpdateAccount"),
  loading: Loading,
  delay,
});

const contact = Loadable({
  loader: () => import("../../containers/Contact/Contact"),
  loading: Loading,
  delay,
});

const ClassListViewRecent = Loadable({
  loader: () =>
    import(
      "../../containers/PlayerAndCorousel/views/ClasslistView/ClasslistViewRecent"
    ),
  loading: Loading,
  delay,
});

const ClassListViewSearch = Loadable({
  loader: () =>
    import(
      "../../containers/PlayerAndCorousel/views/ClasslistView/ClasslistViewSearch"
    ),
  loading: Loading,
  delay,
});

const ClassCollection = Loadable({
  loader: () =>
    import(
      "../../containers/PlayerAndCorousel/views/ClasslistView/NewCollectionPages"
    ),
  loading: Loading,
  delay,
});
const ClassListViewFav = Loadable({
  loader: () =>
    import(
      "../../containers/PlayerAndCorousel/views/ClasslistView/ClasslistViewFavourite"
    ),
  loading: Loading,
  delay,
});

const Player = Loadable({
  loader: () =>
    import("../../containers/PlayerAndCorousel/views/Player/Player"),
  loading: Loading,
  delay,
});

const SubscribePage = Loadable({
  loader: () => import("../../containers/Stripe/Subscribe"),
  loading: Loading,
  delay,
});

const CheckOutPage = Loadable({
  loader: () => import("../../containers/Stripe/CheckOutPage"),
  loading: Loading,
  delay,
});

const SigninPage = Loadable({
  loader: () => import("../../containers/SignIn/SignIn"),
  loading: Loading,
  delay,
});

const UserAccount = Loadable({
  loader: () => import("../../containers/User/Account"),
  loading: Loading,
  delay,
});

const Signup = Loadable({
  loader: () => import("../../containers/Signup/Signup"),
  loading: Loading,
  delay,
});

//By Nikhil on 26h Nov, 2019
//This component/method is used to restrict the user from accessing the direct routes on the basis of checkStatusTag
// checkStatusTag is configured in config.json and it will redirect the user to signIn page. 
const PrivateRoute = ({ component: Component, checkStatusTag, ...rest }) => (
  <Route {...rest} render={(props) => (
    checkStatusTag === false
      ? <Redirect to='/signin' /> : <Component {...props} />
  )} />
)
class Router extends Component {
  componentDidMount() {
    let url = window.location.pathname;
    let splittedUrl = url.split("/");
    if (splittedUrl.includes("ondemand")) {
      //checking old deeplink
      if (splittedUrl.includes("deep")) {
        let indexOfClassId = splittedUrl.indexOf("deep") + 1;
        if (splittedUrl[indexOfClassId] != undefined) {
          window.location.pathname = `/classes/${splittedUrl[indexOfClassId]}`
        }
      } else {
        let index = splittedUrl.indexOf("ondemand");
        splittedUrl[index] = "classes";
        let newUrl = splittedUrl.join("/");
        window.location.pathname = newUrl;
      }
    }
  }
  render() {
    return (
      <Route
        render={({ location }) => (
          <Switch location={location}>
            <Route path={Routes.oldOnDemandClassPlayerRoute} exact component={OnDemandPage} />
            <Route path="/tc" component={TncLink} />
            <Route path="/connect" exact component={ClubPage} />
            <Route path="/success" component={PaymentDone} />
            <Route path="/connect/clubList" exact component={ClubList}></Route>
            <Route path="/livestreamlist" exact component={Livestreamlist}></Route>
            <Route
              path={`${Routes.collectionViewRoute}:id`}
              exact
              component={ClassCollection}
            />
            <Route path={`${Routes.connectClassPlayerRoute}:id`} exact component={Player} />
            {/* <Route path="/terms-and-conditions" exact component={TermsAndCondition} /> */}
            {/* <Route path="/ondemand" exact component={OnDemandPage} /> */}
            <Route path={Routes.classListViewRoute} exact component={OnDemandPage} />
            <Route
              path={Routes.searchRoute}
              exact
              component={ClassListViewSearch}
            />
            <Route path={Routes.favClassRoute}
              exact
              component={ClassListViewFav} />
            <Route path="/ondemand/fav" exact component={ClassListViewFav} />
            <Route
              path={Routes.recentActivityRoute}
              exact
              component={ClassListViewRecent}
            />
            <Route path={`${Routes.onDemandClassPlayerRoute}`} component={Player} />


            <Route
              path="/browse"
              exact
              component={BrowseCollections}
            />
            <Route path="/signin" exact component={SigninPage} />
            <PrivateRoute path="/signup" component={Signup} checkStatusTag={config.showSignUpPage} />
            <Route path="/subscribe" exact component={SubscribePage} />
            <Route path="/subscribe/CheckOut" exact component={CheckOutPage} />
            <Route path="/user/account" exact component={UserAccount} />
            <Route path="/contact" exact component={contact} />
            <PrivateRoute path="/user/update" exact component={updateUserDetails} checkStatusTag={config.showSignUpPage} />
            <Route
              path="/ondemand/player/deep/:classId"
              exact
              component={Player}
            />

            <PrivateRoute
              path="/user/forget/:token"
              exact
              component={forgetPassword} checkStatusTag={config.showForgetPasswordPage}
            />
            <Route path="/options" exact component={AccountButtonDotsMobile} />

            <Route path="/" exact component={HomePage} />


            <Route component={Notfound} />
          </Switch>
        )}
      />
    );
  }
}

export default props => <Router />;
/* Rendering any components inside the Switch that isn't a Route causes buggy behaviour so here I'm wrapping the component in a UserConsumer */
