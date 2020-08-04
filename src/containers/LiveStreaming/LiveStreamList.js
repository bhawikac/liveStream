import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'react-router'
import "../../components/PlayerAndCarousel/Workout/Workout.css";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import { Button, Typography } from "@material-ui/core";
import { Translate } from '../../utils/Translate';
import LiveStreamCard from "./LiveStreamCard";
import { FetchLSConnectList } from "../../store/actions/ondemand"
import ClubCardNew from '../../containers/LiveConnect/ClubCardNew';
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from '../../components/spinner/spinner'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(1.0),
        margin: "10px 0",
        backgroundColor: '#efeff4',
        borderRadius: "0"
    },
}));

const Livestreamlist = (props) => {
    const [SelectedDate, setSelectedDate] = useState(new Date())
    const [classesParticularDate, setclassesParticularDate] = useState([])
    const clubListClasses = useSelector(state => state.onDemand.ListClasses)
    const dispatch = useDispatch();
    const classes = useStyles();
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(FetchLSConnectList())
    }, [])
    useEffect(() => {
        hasClassonThisDate(SelectedDate)
    }, [clubListClasses])
    const getMaxResolutionThumbnail = (picturesObj) => {
        if (picturesObj.length === 0) {
            return;
        }

        var max = picturesObj[0].height;
        var maxIndex = 0;

        for (var i = 1; i < picturesObj.length; i++) {
            if (picturesObj[i].height > max) {
                maxIndex = i;
                max = picturesObj[i].height;
            }
        }

        return maxIndex;
    }
    function getDateChips(count) {
        const cdate = Date.now()
        const oneDayLength = 86400
        const output = []
        for (let i = 0; i < count; i++) {
            const currentDate = new Date(cdate + i * 1000 * oneDayLength)
            const dateItem = currentDate.toString().split(' ')
            if (i == 0) {
                // output.push({ chipLabel: "Today", dateInApiFormat: currentDate })               
                output.push({ chipLabel: Translate({ id: "liveStream.Today" }), dateInApiFormat: currentDate })
            }
            else {
                output.push({ chipLabel: `${dateItem[0]} ${dateItem[2]} ${dateItem[1]}`, dateInApiFormat: currentDate })
            }
        }
        return output;
    }
    function hasClassonThisDate(date) {
        setSelectedDate(date)
        if (clubListClasses) {
            var reqData = getclasses(date)
            setclassesParticularDate(reqData)
        }
    }

    function getclasses(date) {
        return clubListClasses && clubListClasses.eventData.filter(eventData => new Date(eventData.next_Occurrence_Time).getDate() === new Date(date).getDate())
    }
    // function getRecordedClasses(){
    //     return clubListClasses && clubListClasses.connectData
    // }
    return (
        <Fragment>
            <Grid>
                <Typography variant="h1" className="">{Translate({ id: "club.Title" })} </Typography>
                <Grid container direction="row">
                    <Grid item lg={12} md={12} sm={12} xs={12} className="text-center">
                        <Typography className="text-gray padding16" variant="h6" >
                            {Translate({ id: "club.Description" })}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item lg={12} md={12} sm={12}>
                    <Paper component="ul" className={classes.root}>
                        {getDateChips(7).map((data, key) => {
                            return (
                                <li key={key} className={`liveStreamChips`}>
                                    <Chip
                                        label={data.chipLabel}
                                        onClick={() => (hasClassonThisDate(data.dateInApiFormat))}
                                        className={`${data.dateInApiFormat.getDate() === SelectedDate.getDate() ? "text-black" :
                                            getclasses(data.dateInApiFormat) && getclasses(data.dateInApiFormat).length > 0 ? "" : "disabledText"}`}>
                                    </Chip>
                                </li>
                            );
                        })}
                    </Paper>
                </Grid>
            </Grid>
            <InfiniteScroll
            style={{ color: "white", overflow: "hidden" }}
            scrollThreshold="50%"
            dataLength="50"
            // next={this.loadMore}
            // hasMore={this.props.itemsRemaining}
            loader={
              <Spinner
                // areCards={this.props.classes.length > 0 ? true : false}
                backColor="white"
              />
            }
            endMessage={
              <p style={{ display: "none" }}>
                <b />
              </p>
            }
          >
            <div className="page-container live m-t-5">
                <Grid container justify="flex-start" spacing={4} className="cardList">
                    {classesParticularDate.length === 0 ?
                        <Grid item>
                            <Typography className="text-gray align-left p-t-32 m-t-xs-15" variant="h6" >
                                {Translate({ id: "liveStream.NoResult" })}
                            </Typography>
                        </Grid> :
                        classesParticularDate && classesParticularDate.map((eventData, index) =>
                            <Grid item lg={4} md={6} sm={12} xs={12} key={eventData.id}>
                                <LiveStreamCard
                                    creationDate={eventData.created_Time}
                                    nextOccurence={eventData.next_Occurrence_Time}
                                    activeTime={eventData.live.active_Time}
                                    eventStatus={eventData.live.status}
                                    trailerLinkWeb={eventData.trailerLink}
                                    history={props.history}
                                    thumbnail={eventData.pictures ? (eventData.pictures.sizes ? eventData.pictures.sizes[0].link : "") : ""}
                                    url={eventData.streamingLink}
                                    title={eventData.name}
                                    duration={eventData.duration
                                        ? Math.floor(eventData.duration / 60)
                                        : 55}
                                    description={eventData.title}
                                    show={true}
                                    id={eventData.id}
                                    // clicked={onClubCardClicked}
                                    level={eventData.level}
                                    isClubConnect={true}
                                />
                            </Grid>

                        )}
                    <Grid item lg={12} md={12} sm={12} xs={12} >
                        <Typography className="align-left p-t-32 m-t-xs-15" variant="h6" >
                            {Translate({ id: "liveStream.RecordedClasses" })}
                        </Typography>
                    </Grid>
                    {isLoading ?
                        <Spinner /> :
                        clubListClasses && clubListClasses.connectData.data.map((connectData, index) =>
                            <Grid item lg={4} md={6} sm={12} xs={12} key={connectData.id}>
                                <ClubCardNew clubData={connectData}></ClubCardNew>
                            </Grid>
                        )}

                </Grid>
            </div>
        </InfiniteScroll>
        </Fragment >)
}

export default withRouter(Livestreamlist);