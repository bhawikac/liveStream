import React, { Fragment, useState } from 'react'
import { withRouter } from 'react-router'
import LiveStreamCard from "./LiveStreamCard";
import Button from '@material-ui/core/Button';
import { Grid, Typography } from "@material-ui/core";
import { Translate } from '../../utils/Translate';

function LiveStreamHome(props) {
    const viewDetails = () => {
        props.history.push({
            pathname: "/livestreamlist",
            state: { clubClasses: props.clubClasses }
        });
    };
    return (
        <Fragment>
            <div className="page-container">
                <Grid container direction="row" alignItems="center" onClick={viewDetails}>
                    <Grid item className="align-left makeTextClickable">
                        <Typography variant="h1" className="align-left">{Translate({ id: "club.Title" })} </Typography>
                    </Grid>
                    <Grid item className="makeTextClickable">
                        <img src={require("../../assets/images/fw-green.png")} height="34" className="align-bottom" style={{marginBottom: "-5px"}}/>
                    </Grid>
                </Grid>
                <Typography className="text-gray align-left" variant="h6" >
                    {Translate({ id: "club.Description" })}
                </Typography>
            </div>
            <div className="bgContainer2 m-t-15 m-t-xs-15">
                <div className="page-container live">
                    <Grid container justify="flex-start" spacing={4} className="cardList">
                        {props.clubClasses.map((clubData, index) => (
                            index < 3 ?
                                <Grid item lg={4} md={6} sm={12} xs={12} key={clubData.id}>
                                    <LiveStreamCard
                                        creationDate={clubData.created_Time}
                                        nextOccurence={clubData.next_Occurrence_Time}
                                        activeTime={clubData.live.active_Time}
                                        eventStatus={clubData.live.status}
                                        trailerLinkWeb={clubData.trailerLink}
                                        history={props.history}
                                        thumbnail={clubData.pictures ? (clubData.pictures.sizes ? clubData.pictures.sizes[0].link : "") : ""}
                                        url={clubData.streamingLink}
                                        title={clubData.name}
                                        duration={clubData.duration
                                            ? Math.floor(clubData.duration / 60)
                                            : 55}
                                        description={clubData.title}
                                        show={true}
                                        id={clubData.id}
                                        // clicked={onClubCardClicked}
                                        level={clubData.level}
                                        isClubConnect={true}
                                        action={viewDetails}

                                    />
                                </Grid>
                                : null
                        ))}
                    </Grid>
                </div>
            </div>
        </Fragment>
    )
}

export default withRouter(LiveStreamHome)

