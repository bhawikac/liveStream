import React from 'react';
import ComponentImage from '../../components/Image/Image';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { FontStyle } from "../../utils/font";
import { Typography } from '@material-ui/core';
import Routes from '../Router/Routes'

const ImageBanner = (props) => (
    <div className="page-container">
        <div className={props.className}>
            <ComponentImage imageSrc={props.imageSrc} height='75vh' />
            {/* <h1>{Translate({id:"homePage.SeeAllClasses"})}</h1> */}
            <div className={props.isOverlay ? "overlay" : ""}>
                <div className={props.isOverlay ? "centeredText" : ""}>
                    <Typography className="App-intro-wexer m-t-xs-20"
                        // style={FontStyle.SFProDisplayBig}
                        variant="h1"
                    >{props.marketingTagLine}
                    </Typography>
                    <Typography className="centeredTextDescription"
                    variant="subtitle1"
                    >{props.marketingDescription}</Typography>
                    <Button variant="contained" color="secondary" className="button"
                        
                        onClick={() => { props.history.push(Routes.classListViewRoute); }} >
                        <Typography variant="button">{props.buttonText ? props.buttonText : "Browse"}</Typography>
                    </Button>
                </div>
            </div>
        </div>
    </div>
);

export default withRouter(ImageBanner);