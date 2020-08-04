import React from "react";
import Timer from 'react-compound-timer'
import { Button, Typography } from "@material-ui/core";
import { Translate } from '../../utils/Translate';

function classStarted(startTime, status) {

    if (startTime!=null && new Date(startTime) < new Date() && status=="streaming") {
        const passTime = new Date(startTime).getTime()
        const currTime = new Date().getTime()
        const diff = ((currTime-passTime));
        return (
        <Timer formatValue={(value) => `${(value < 10 ? `0${value}` : value)}`} initialTime={diff || 0}>
            <span>{Translate({ id:"liveStream.Join"})} </span><Timer.Minutes />{':'}
            <Timer.Seconds />
        </Timer>)
    }
    else {
        return <span>{Translate({ id:"liveStream.ViewDetails"})}</span>
    }
}
export default function CountdownButton({ startTime, status }) {
    return (<Button className={(new Date(startTime) < new Date() && status=="streaming") ? `view-btn bg-red` : `view-btn`}
        color="secondary"
        variant="contained"
    // onClick={props.action}
    >
        <Typography variant="h4">
            {classStarted(startTime, status)}
        </Typography>
    </Button>)
}
