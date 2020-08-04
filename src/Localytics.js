import React from "react";
import { connect } from "react-redux";
import mapFancyNames from "./utils/ClassCategoryFancyNamesMapping";
import { SubscriberStatusConstants } from './utils/constants';

class Localytics extends React.Component {
    constructor(props) {
        super(props);
        this.state = { SessionActive: true };
    }
    customDimensions(position, dimension) {
        window.ll("setCustomDimension", position, dimension);
    }

    componentDidUpdate(prevProps) {

        if (
            (this.props.userDetail != null) &&
            (prevProps.userDetail != this.props.userDetail)
        ) {
            const userData = this.props.userDetail.applicationProfile;

            window.ll(
                "setCustomerEmail",
                `${userData.emailAddress}`
            );
            window.ll("setProfileAttribute", "First Name", `${userData.firstName}`, "app");
            window.ll("setProfileAttribute", "Last Name", `${userData.lastName}`, "app");

        }

        if ((prevProps.isAuthenticated !== this.props.isAuthenticated) && (this.props.isAuthenticated != null)) {
            //Setting Autheticated Custom Dimension to Localytics
            if (this.props.isAuthenticated) {

                window.ll("setCustomerId", localStorage.getItem("userId"));
                console.log("setting Authenticated status 1 ==>>" + new Date());
                window.ll('setCustomDimension', 1, '1');
                window.ll("setProfileAttribute", "Authenticated", "True", "app");

            } else {
                console.log("setting Authenticated status 0 ==>>" + new Date());
                window.ll('setCustomDimension', 1, '0');
                console.log("setting subscription status ==>> UNKNOWN" + new Date());
                window.ll('setCustomDimension', 2, 'UNKNOWN');
                window.ll("setProfileAttribute", "Authenticated", "False", "app");
                window.ll("setProfileAttribute", "Subscriber Status", "UNKNOWN", "app")
                //Deleting localytics customer id from Localstorage
                localStorage.setItem("_loc_ids", null);

            }
        }

        if (prevProps.PlayDuration !== this.props.PlayDuration) {
            if (this.props.ClassDetails !== null && (this.props.ClassDetails && this.props.ClassDetails.id)) {
                if (this.props.clubConnectClicked) {
                    window.ll("tagEvent", "Live Connect Class Performed", {
                        "Class ID": this.props.ClassDetails.id,
                        "Class Name": this.props.ClassDetails.title,
                        "Class Duration": this.ClassDurationTimeBand(
                            this.props.ClassDetails.duration
                        ),
                        "Play Duration": this.aroundTimeBand(this.props.PlayDuration),
                    });
                }
                else if(this.props.ClassDetails.id) {
                    window.ll("tagEvent", "On Demand Class Performed", {
                        "Class ID": this.props.ClassDetails.id,
                        "Class Name": this.props.ClassDetails.title,
                        "Class Duration": this.ClassDurationTimeBand(
                            this.props.ClassDetails.duration
                        ),
                        "Play Duration": this.aroundTimeBand(this.props.PlayDuration),
                        "Class Category": mapFancyNames(
                            this.props.ClassDetails.category != undefined ?
                                this.props.ClassDetails.category[0] :
                                this.props.ClassDetails.classCategory[0]
                        ),
                        "Provider ID": this.props.ClassDetails.newProviderId,
                        "Provider Name": this.props.ClassDetails.provider_id
                    });
                }

            }
        } 

        if (prevProps.isClassStarted !== this.props.isClassStarted && (this.props.isClassStarted == true)) {
            if (this.props.ClassDetails !== null && (this.props.ClassDetails && this.props.ClassDetails.id)
            ) {
                if (this.props.clubConnectClicked) {
                    window.ll("tagEvent", "Live Connect Class Started", {
                        "Class ID": this.props.ClassDetails.id,
                        "Class Name": this.props.ClassDetails.title,
                        "Class Duration": this.ClassDurationTimeBand(
                            this.props.ClassDetails.duration
                        )
                    });
                }
                else if(this.props.ClassDetails.id) {
                    window.ll("tagEvent", "On Demand Class Started", {
                        "Class ID": this.props.ClassDetails.id,
                        "Class Name": this.props.ClassDetails.title,
                        "Class Duration": this.ClassDurationTimeBand(
                            this.props.ClassDetails.duration
                        ),
                        "Class Category": mapFancyNames(
                            this.props.ClassDetails.category != undefined ?
                                this.props.ClassDetails.category[0] :
                                this.props.ClassDetails.classCategory[0]
                        ),
                        "Provider ID": this.props.ClassDetails.newProviderId,
                        "Provider Name": this.props.ClassDetails.provider_id
                    });
                }

            }
        }
        if (this.props.subscriptionStatus != null && (prevProps.subscriptionStatus !== this.props.subscriptionStatus)) {

            /** 
             * SubscriberStatusConstants 
             *   INACTIVE: 0
             *   ACTIVE: 1
             *   UNKNOWN: 2
             */
            if (this.props.subscriptionStatus == SubscriberStatusConstants.INACTIVE) {
                console.log("setting subscription status INACTIVE ==>>" + new Date());
                window.ll('setCustomDimension', 2, 'INACTIVE');
                window.ll("setProfileAttribute", "Subscriber Status", "INACTIVE", "app")
            } else if (this.props.subscriptionStatus == SubscriberStatusConstants.ACTIVE) {

                console.log("setting subscription status ACTIVE ==>>" + new Date());
                window.ll('setCustomDimension', 2, 'ACTIVE');
                window.ll("setProfileAttribute", "Subscriber Status", "ACTIVE", "app")
            } else {
                console.log("setting subscription status ==>> UNKNOWN" + new Date());
                window.ll('setCustomDimension', 2, 'UNKNOWN');
                window.ll("setProfileAttribute", "Subscriber Status", "UNKNOWN", "app")
            }
            //Sending User Login Event to Localytics
            console.log('Sending login event with delay ==>>' + new Date());
            var userId = localStorage.getItem("userId");
            var token = localStorage.getItem("token");
            if (prevProps.subscriptionStatus == null && (userId !== null && token !== null)) {

                window.ll("tagEvent", "User Login", {
                    "Client ID": localStorage.getItem("clientId"),
                    "User ID": userId
                });


            }
        }
    }
    ClassDurationTimeBand = min => {
        if (min <= 60) {
            //let min = sec / 60;
            if(min === 0){
                return "0-1"
            }
            let nearestInt = Math.ceil(min / 10);

            let maxValue = nearestInt * 10;

            return `${maxValue === 10 ? 0 : maxValue - 9}-${maxValue}`;
        } else if (min > 60) {
            return "61+";
        }
    };
    aroundTimeBand = sec => {
        if (sec <= 60) {
            return "0-1";
        } else if (sec > 60 && sec <= 300) {
            return "1-5";
        } else if (sec > 300 && sec <= 600) {
            return "6-10";
        } else if (sec > 600 && sec <= 3660) {
            let min = sec / 60;
            let nearestInt = Math.ceil(min / 10);

            let maxValue = nearestInt * 10;

            return `${maxValue - 9}-${maxValue}`;
        } else if (sec > 3660) {
            return "61+";
        }
    };
    componentWillUnmount() {
        this.setState({ SessionActive: false });
    }
    componentDidMount() {
        // document.cookie = 'jwt=; domain=.localytics.com; Path=/;expires=' + new Date(0).toUTCString();
        // document.cookie = '_biz_sid=; domain=.localytics.com; Path=/;';
        // document.cookie = 'ei_client_id=; domain=.localytics.com; Path=/;';

        let localyticsInitSet;
        if (localStorage.getItem("userId") !== null &&
            localStorage.getItem("token") !== null) {
            //If user is logged in se customer id in init method else only CDs
            localyticsInitSet = {
                customDimensions: [localStorage.getItem("clientId")],
                customerId: localStorage.getItem("userId"),
            }
        } else {
            localyticsInitSet = {
                customDimensions: [localStorage.getItem("clientId"), '0', 'UNKNOWN'],
                customerId: '',

            }
            localStorage.setItem("_loc_ids", null);
        }
        //--------------------------------------------------Localytics INIt--------------------

        + function (l, y, t, i, c, s) {
            l['LocalyticsGlobal'] = i;
            l[i] = function () {
                (l[i].q = l[i].q || []).push(arguments)
            };
            l[i].t = +new Date;
            (s = y.createElement(t)).type = 'text/javascript';
            s.src = '//web.localytics.com/v3/localytics.min.js';
            (c = y.getElementsByTagName(t)[0]).parentNode.insertBefore(s, c);
            window.ll('init', process.env.REACT_APP_LOCALYTICS_APP_ID, {
                ...localyticsInitSet,
                sessionTimeout: parseInt(process.env.REACT_APP_LOCALYTICS_TIMEOUT)
            });
        }(window, document, 'script', 'll');

    }
    render() {
        return <React.Fragment > {this.props.children} </React.Fragment>;
    }
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        userDetail: state.auth.userDetail, 
        ClassDetails: state.workout.ClassDetails,
        PlayDuration: state.onDemand.PlayDuration,
        subscriptionStatus: state.subscription.subscriptionStatus,
        isClassStarted: state.onDemand.isClassStarted,
        clubConnectClicked: state.workout.clubConnectClicked
    };
};
export default connect(
    mapStateToProps,
    null
)(Localytics);

