import React from 'react';
import { Grid, Typography, Button } from "@material-ui/core";
import Workout from '../Workout/Workout';
import { Translate } from '../../../utils/Translate'


const ClassOfTheDay = React.memo(function Cotd(props) {
    const { classOfTheDay } = props;

    return (

        <React.Fragment>
          
                <div className="page-container">
                    <Grid container direction="row" className="">
                        <Grid item lg={6} md={6} sm={6} xs={12}>
                            <Typography variant="h1" className="align-left m-t-15 m-t-xs-15 clear" style={{lineHeight: "1.4"}}>
                                {classOfTheDay.collectionName}
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
                <div className='bgContainer2 codBg'>
                <div className='page-container' style={{ margin: '0 auto' }}>
                    <Grid container justify="flex-start" spacing={4} className='resposibleGrid'>
                        <Grid item xs={12} sm={12} md={12} lg={8}>

                            <Workout
                                keywords={classOfTheDay.collectionItems[0].keywords}
                                isSearchPageCard={false}
                                creationDate={classOfTheDay.collectionItems[0].creationDate}
                                trailerLinkWeb={classOfTheDay.collectionItems[0].trailerLinkWeb}
                                trailerLinkMobile={classOfTheDay.collectionItems[0].trailerLinkMobile}
                                isSliderWorkout={true}

                                thumbnail={`${classOfTheDay.collectionItems[0].imageLink}?width=1200`}
                                url={classOfTheDay.collectionItems[0].streamingLink}
                                equipmentTypes={classOfTheDay.collectionItems[0].equipmentTypes}
                                equipmentNames={classOfTheDay.collectionItems[0].equipmentNames}
                                isFav={classOfTheDay.collectionItems[0].favourite}
                                title={classOfTheDay.collectionItems[0].className}
                                duration={classOfTheDay.collectionItems[0].durationSecond
                                    ? Math.floor(classOfTheDay.collectionItems[0].durationSecond / 60)
                                    : 55}
                                description={classOfTheDay.collectionItems[0].classDescription}
                                show={true}
                                calories={classOfTheDay.collectionItems[0].calorieBurn}
                                id={classOfTheDay.collectionItems[0].tag}
                                classCategory={classOfTheDay.collectionItems[0].classCategory}
                                clicked={props.takeUserToClassDetail}
                                level={classOfTheDay.collectionItems[0].level}

                            />

                        </Grid>
                        <Grid item xs={0} sm={0} md={6} lg={4}>
                            <div className='classofthedaydetailbox'>
                                <Typography variant="body2" className="cardDescription-p text-gray m-tb-5 m-b-10">
                                {Translate({ id: "ClassListViews.checkoutClassOfTheDay" })}
         </Typography>
                                <Grid item lg={6} md={6} sm={6} className="hidden-xs">
                                    <Button
                                        className="view-btn"
                                        color="secondary"
                                        variant="contained"
                                        onClick={props.takeUserToClassDetail}
                                    >
                                        <Typography variant="h4">
                                            {Translate({ id: "ClassListViews.goToClassOfTheDayDetailButton" })}
                                        </Typography>
                                    </Button>
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>


                </div>
            </div>

        </React.Fragment>
    );
});



export default ClassOfTheDay;

