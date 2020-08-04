import React, { useEffect, useState, useCallback } from 'react';
import ClassOfTheComponent from './ClassOfTheDayComponent'
import Routes from '../../Router/Routes'
import config from "../../../assets/config.json"


function Cotd(props) {
    const [classOfTheDay, setClassOfTheDay] = useState(null);
    useEffect(() => {
        if (props.collectionArray && props.collectionArray.length > 0) {

            if (props.collectionArray[1].collectionType == "classoftheday" && (props.collectionArray[1].collectionItems != null) && (props.collectionArray[1].collectionItems.length > 0)) {
                console.log(props.collectionArray);
                setClassOfTheDay(props.collectionArray[1]);
            } else {
                //This Block only get executed if API returns data in random order
                props.collectionArray.forEach((collection) => {
                    if (collection.collectionType == "classoftheday" && (collection.collectionItems != null) && (collection.collectionItems.length > 0)) {
                        console.log(collection);
                        setClassOfTheDay(collection);
                    }
                })
            }
        }

    }, [props.collectionArray]);

    const takeUserToClassDetail = useCallback(
        () => {

            console.log(classOfTheDay.collectionItems[0]);
            props.history.push({
                pathname: Routes.onDemandClassPlayerRoute + classOfTheDay.collectionItems[0].tag,
                state: { selectedItem: classOfTheDay.collectionItems[0] },
            });


        },
    );
    return (
        <React.Fragment>
            {config.showClassOfTheDay && classOfTheDay != null &&
                <div className='indent'>
                    <div className='clear'>


                        <ClassOfTheComponent takeUserToClassDetail={takeUserToClassDetail} classOfTheDay={classOfTheDay} />
                    </div>
                </div>
            }

        </React.Fragment>
    )
}

export default Cotd;
