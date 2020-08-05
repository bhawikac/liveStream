import React from 'react'
import { Translate } from "../../utils/Translate";
const Label = React.memo(function MyComponent(props) {
    return (
        <React.Fragment>
            {`
                <a href="/tc" target="blank" class="controledClass dynamiclinks">
 
                </a>
            `
            }

        </React.Fragment>
    )
});

export default Label;