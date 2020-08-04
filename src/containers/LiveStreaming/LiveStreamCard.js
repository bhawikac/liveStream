import React, { PureComponent, Component } from "react";
import "../../components/PlayerAndCarousel/Workout/Workout.css";
import Grid from "@material-ui/core/Grid";
import { Button, Typography } from "@material-ui/core";
// import { differenceInCalendarDays, parse } from 'date-fns'
import CountdownButton from "./countdownButton";
import { Translate } from '../../utils/Translate';

export default function LiveStreamCard(props) {
  function getNextOccurenceDate(status, activeTiming, occuranceTiming){
    // const date = prop.split('T')[0]
    let occDate
    if(status=="streaming")
    occDate = new Date(activeTiming.split('T')[0])
    else
    occDate = new Date(occuranceTiming.split('T')[0])
    const currDate = new Date()
    if(occDate.getDate() === currDate.getDate()
    && occDate.getMonth() === currDate.getMonth()
    && occDate.getYear() === currDate.getYear())
       //return "Today" //add PO
       return Translate({ id:"liveStream.Today"})
    else {
      
      const dateParts = occDate.toString().split(' ')
      return `${dateParts[1]} ${dateParts[2]}`
    }  
  }
  function getTimetoStart(prop){
    const time= new Date(prop)
    const hh = time.getHours()
    const mm = time.getMinutes()
    return `${hh < 10 ? '0'+hh : hh}:${mm < 10 ? '0'+mm : mm }`
  }
    return (
        <Grid container item className="">
          <div className="workoutPlayer">
            <video
              style={{width: "100%"}}
              preload="none"
              loop
              playsInline
              className="Trailer thumbnail"
              poster={props.thumbnail}
            //   onClick={this.props.clicked}
            //   onMouseOver={(e) => this.startVideo(e.target)}
            //   onMouseOut={e => e.target.pause()}
            >
              <source
                src={props.trailerLinkMobile
                    ? props.trailerLinkMobile
                    : props.trailerLinkWeb
                      ? props.trailerLinkWeb
                      : props.url
                }
                type={props.trailerLinkMobile || props.trailerLinkWeb
                    ? "video/mp4"
                    : "application/x-mpegURL"
                }
              />
            </video>
            <div className="workout-info">
                <Typography variant="subtitle2" className="workout-day">
                  
                {getNextOccurenceDate(props.eventStatus, props.activeTime, props.nextOccurence)}   
                             
                </Typography>
                <Typography variant="h2" className="m-t-5 m-t-xs-5">
                  {getTimetoStart(props.nextOccurence)}
                </Typography>
                <p className="workout-desc">
                {props.description}  
                </p>
               <CountdownButton startTime={props.activeTime} status={props.eventStatus} />

            </div>
          </div>
        </Grid>  
      )
}
