import React, { Fragment, useState, useEffect } from "react";
import { withRouter } from 'react-router'
import "../../components/PlayerAndCarousel/Workout/Workout.css";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import { Button, Typography } from "@material-ui/core";
import { differenceInCalendarDays, parse } from 'date-fns'
import { Translate } from '../../utils/Translate';
const style = {
  pausedButton: {
    width: ".8em",
    height: ".8em",
    marginTop: "-1px",
  }
};

function LiveStreamViewPage() {
    return (

    )
}

export default LiveStreamViewPage
