import React from 'react'
import { Grid } from "@material-ui/core";
import Workout from "../../../../components/PlayerAndCarousel/Workout/Workout";


function OnDemandNewPage() {

    return (
        <div>
            <Grid container className="workoutsDiv">
        {this.state.classes.map((c, index) =>
          c.show ? (
            <Grid item container xs={12} sm={6} md={6} lg={4} className="cardAlign" key={Math.random()} >
            <Workout
              keywords={c.keywords}
              isPrevPlaying={this.state.isPrevPlaying}
              takePreviousPlayer={this.takePreviousPlayer}
              prevPlayer={this.state.prevPlayer}
              isSearchPageCard={true}
              creationDate={c.creationDate}
              trailerLinkMobile={c.trailerLinkMobile}
              trailerLinkWeb={c.trailerLinkWeb}
              classCategory={c.category}
              calories={c.calorieBurn}
              equipmentTypes={c.equipmentTypes}
              equipmentNames={c.equipmentNames}
              key={index}
              thumbnail={`${c.thumbnail}?width=1200`}
              url={c.url}
              title={c.title}
              duration={c.duration}
              description={c.description}
              clicked={() => this.onClickHandler(c.id)}
              show={true}
            />
            </Grid>
          ) : null
        )}
      </Grid>
        </div>
    )
}

export default OnDemandNewPage
