import React from 'react'
import { linkParser } from "../../utils/linkParser";

export default function SubTextAboveFooter() {
    return (
        <React.Fragment>
            {linkParser("Subscription.EnterCodeSubText")}
        </React.Fragment>
    )
}
