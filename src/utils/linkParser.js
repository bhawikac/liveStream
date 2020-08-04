import { Translate } from "./Translate";
import ReactHtmlParser from "react-html-parser";
const config = require('../assets/config.json')
const translatedFile = require(`../assets/translations/${config.language}.json`);

/**
 * Nikhil Gupta
 * 15th June 2020
 * 
 * Purpose
 * For parsing the link/URl in the PO file.
 * 
 * param 1: String eg:"Subscription.EnterCodeSubText"
 * param 2: Object eg: { clubName: localStorage.getItem("ClientDisplayName") }
 * @param {*} id 
 * @param {*} valueObject 
 */

export function linkParser(id, valueObject) {
    if (translatedFile && id) {
        if (arguments.length > 1) {
            return Translate({
                id,
                values: valueObject
            })
        }
        let key = id.split(".")
        let stringValue = translatedFile[key[0]][key[1]]
        let startIndex = stringValue.indexOf("{")
        let endIndex = stringValue.indexOf("}")
        if (startIndex > -1 || endIndex > -1) {
            let reqString = stringValue.slice(startIndex + 1, endIndex)
            let hrefValArray = stringValue.slice(startIndex + 1, endIndex).split(":")
            if (reqString.includes("http")) {
                //contins linkText and href value
                if (hrefValArray.length > 2) {
                    let hrefVal = ""
                    hrefValArray.forEach((element, i) => {
                        if (i > 0)
                            hrefVal += element
                        hrefVal += ":"
                    });
                    hrefVal = hrefVal.slice(1, hrefVal.length - 1)
                    stringValue = stringValue.replace(stringValue.substring(startIndex, endIndex + 1), `<a href=${hrefVal}>${hrefValArray[0]}</a>`)
                }
                //contains only href value
                else {
                    stringValue = stringValue.replace(stringValue.substring(startIndex, endIndex + 1), `<a href=${reqString}>${reqString}</a>`)

                }
            }
            else {
                //contins linkText and href value
                if (hrefValArray.length > 1) {
                    stringValue = stringValue.replace(stringValue.substring(startIndex, endIndex + 1), `<a href=//${hrefValArray[1].trim()}>${hrefValArray[0]}</a>`)
                }
                //contains only href value
                else {
                    stringValue = stringValue.replace(stringValue.substring(startIndex, endIndex + 1), `<a href=//${reqString.trim()}>${reqString}</a>`)

                }
            }

        }
        return ReactHtmlParser(stringValue,valueObject);
    }
}