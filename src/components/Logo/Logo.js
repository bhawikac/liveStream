import React from 'react';
import { withRouter } from 'react-router-dom';
const imageURL = require('../../assets/images/logo.png');
const imageURL3x = require('../../assets/images/logo@3x.png');
const imageURL2x = require('../../assets/images/logo@2x.png');

const logo = (props) => (
    <div onClick={() => { props.history.push({ pathname: "/" }); }} className="logoHolder" >
        <div style={{     
        }} >
            <picture>
                <source media="(min-width: 1050px)" srcSet={imageURL3x} width='100%' alt="Logo" />
                <source media="(min-width: 465px)" srcSet={imageURL2x} width='100%' alt="Logo" />
                <img style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    borderRadius: "0px"
                }} 
                src={imageURL} width='100%' alt="Logo" />
            </picture>
        </div>
    </div>
);

export default withRouter(logo);