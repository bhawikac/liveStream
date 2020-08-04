import React, { Fragment, useState } from 'react'
import { withRouter } from 'react-router'
import ClubCardNew from './ClubCardNew'
import PageTitle from '../../components/PageTitle';
import Button from '@material-ui/core/Button';
import { Grid, Typography } from "@material-ui/core";
import { Translate } from '../../utils/Translate';
import Select from "../../components/selector/Select";
import { isMobile } from "react-device-detect";
function ClubPage(props) {
    const viewAllClick = () => {
        props.history.push({
            pathname: "/connect/clubList",
            state: {clubClasses: props.clubClasses}
        });
    };
    return (
        <Fragment>
            <div className="page-container">
                <Typography variant="h1" className="align-left">{Translate({ id: "club.Title" })} </Typography>
                <Grid container direction="row">
                    <Grid item sm={6} md={6} lg={6} xs={12} className="align-left">
                        <Typography className="text-gray" variant="h6" >
                            {Translate({ id: "club.Description" })}
                        </Typography>
                    </Grid>

                    <Grid item sm={6} md={6} lg={6} className="text-right hidden-xs">
                        <Button className="view-btn"
                            color="secondary"
                            variant="contained"
                            onClick={viewAllClick}
                        >
                            <Typography variant="h4">
                                {Translate({ id: "ClassListViews.ViewAll" })}
                            </Typography>
                        </Button>
                    </Grid>

                </Grid>
            </div>
            <div className="bgContainer2 m-t-15 m-t-xs-15">
                <div className="page-container">                    
                        <Grid container justify="flex-start" spacing={4} className="cardList">
                            {props.clubClasses.map((item, index) => (
                                index < 3 ?
                                    <Grid item lg={4} md={6} sm={12} xs={12} key={item.id}>
                                        <ClubCardNew clubData={item}></ClubCardNew>
                                    </Grid>
                                    : null
                            ))}
                        </Grid>
                        <div className="hidden-lg clear">
              <Grid container justify="flex-start" spacing={4}>
                <Grid item xs={12} className="m-b-xs-10 clear align-left" >
                  <Button
                    className="view-btn"
                    color="secondary"
                    variant="contained"
                    onClick={viewAllClick}
                  >
                    <Typography variant="h4">
                      {Translate({ id: "ClassListViews.ViewAll" })}
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            </div>
                     </div>
            </div>
        </Fragment>
    )
}

export default withRouter(ClubPage)

