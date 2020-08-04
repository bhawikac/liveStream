import React, { Fragment, useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import PageTitle from '../../components/PageTitle';
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";
import { Grid, Typography } from "@material-ui/core";
import { Translate } from '../../utils/Translate';
import Select from "../../components/selector/Select";
import Spinner from '../../components/spinner/spinner'
import { FetchClubLiveConnect } from '../../store/actions/ondemand';
import * as actionTypes from "../../store/actions/actionTypes";
import ClubCardNew from './ClubCardNew';


const mapStateToProps = state => {
    return {
        clubClasses: state.onDemand.clubClasses
    };
};

const mapDispatchToProps = dispatch => {
    return {
        FetchClubLiveConnect: () => dispatch(FetchClubLiveConnect()),
        storeDeepLinkDataToStore: (id) => dispatch({ type: actionTypes.SAVE_DEEPLINK_PAYLOAD, deeplinkData: id }),
    };
};


function ClubList(props) {

    const [clubClasses, setClubClasses] = useState(props.clubClasses ? props.clubClasses.data : null);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        console.log(clubClasses);
        if (props.clubClasses == null) {
            var path = props.location.pathname;
            props.FetchClubLiveConnect();
            setLoading(true);
            props.storeDeepLinkDataToStore(path)
        } else {
            setClubClasses(props.clubClasses.data);
            setLoading(false);
        }
    }, [props.clubClasses]);
    return (
        <Fragment>
            <div className="page-container">
                <Typography variant="h1" className="">
                    {Translate({ id: "club.Title" })}
                </Typography>
                <Typography variant="h6" className="text-gray m-b-20 m-b-xs-10">
                    {Translate({ id: "club.Description" })}
                </Typography>
            </div>
            <div className="bgContainer2 top0 m-t-15 p-t-32 p-t-xs-16">
                <div className="page-container">
                    <Grid container justify="flex-start" spacing={4}>
                        {isLoading ?
                            <Spinner /> :
                            clubClasses && clubClasses.map((item, index) => (
                                <Grid item lg={4} md={6} sm={12} xs={12} key={item.id}>
                                    <ClubCardNew clubData={item}></ClubCardNew>
                                </Grid>
                            ))}
                    </Grid>
                </div>
            </div>
        </Fragment>
    )
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ClubList));



