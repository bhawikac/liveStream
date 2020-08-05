import React from 'react'
const config = require('../assets/config.json')
const translatedFile = require(`../assets/translations/${config.language}.json`);
const imageURL = require('../assets/images/logo.png');

const UnsupportedBrowser = () => {
    return (
        <div className="UnsupportedDiv">
            <img style={{
                width: "331px",
                borderRadius: "0px"
            }}
                src={imageURL} width='100%' alt="Logo" />
            <p className="UnsupportedDivP subTitleText">
                {translatedFile.app.UnSupportedBrowser ? translatedFile.app.UnSupportedBrowser : "Your browser is not supported. We recommend installing the latest version of a supported browser:"}
            </p>
            <p className="UnsupportedDivP subTitleText" style={{ marginBottom: "0px" }}>
                PC: <a style={{ color: config.primaryColor }} href="https://www.google.com/chrome/">Chrome</a> •&nbsp; 
                <a style={{ color: config.primaryColor }} href="https://www.mozilla.org/en-US/firefox/new/">Firefox</a>
            </p>
            <p className="UnsupportedDivP subTitleText" style={{ marginTop: "0px" }}>
                Mac: <a style={{ color: config.primaryColor }} href="https://www.google.com/chrome/">Chrome</a> •&nbsp;
                <a style={{ color: config.primaryColor }} href="https://support.apple.com/downloads/safari"> Safari</a> •&nbsp;
                <a style={{ color: config.primaryColor }} href="https://www.mozilla.org/en-US/firefox/new/"> Firefox</a>
            </p>
        </div>
    )
}

export default UnsupportedBrowser
