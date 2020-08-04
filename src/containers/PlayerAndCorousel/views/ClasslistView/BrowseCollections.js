import React, { Fragment } from 'react'
import { withRouter } from "react-router-dom";
import { List, ListItem, ListItemText, Divider, Typography, Grid } from '@material-ui/core';
import { Translate } from "../../../../utils/Translate";
import Routes from '../../../../components/Router/Routes'
const BrowseCollections = (props) => {

    function openCollectionPages(item) {
        console.log(props.location.state);
        props.history.push({
            pathname: Routes.collectionViewRoute + item.collectionTag,
            state: { selectedCollection: item.collectionName },
        });
    };  
    const closehandler=() => {
        props.history.goBack();
    }; 
    return (
        <Fragment>
                        
                <div className="page-container m-t-15" >
                    <img
                        className="CloseButton customClose btn-default hide-xs"
                        src={require("../../../../assets/images/close.png")}
                        onClick={closehandler}
                    /> 
                </div>
                <div className="page-container clear">
                <div className="browse-collection-menu clear">
                    <div className="btn-container" onClick={closehandler}>
                        <img src={require("../../../../assets/images/closeGreen.svg")} />
                    </div>
                    <Typography variant="h1">
                        {Translate({ id: "ClassListViews.Collections" })}
                    </Typography>
                    <ul>
                        {props.location.state && props.location.state.collectionArray && props.location.state.collectionArray.map((item, index) => (

                            <li onClick={() => openCollectionPages(item)}>{item.collectionName}</li>
                        ))}
                    </ul>
                </div>
                </div>
                </Fragment>
    )
}

export default withRouter(BrowseCollections);

