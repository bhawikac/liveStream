import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
const config = require('../../assets/config.json')

class Spinner extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.fetchTenantConfig();
    }
    render() {
        return (
            <div style={{ textAlign: "center" }} className="classes-spinner">
                {!this.props.areCards && ( 
                    <CircularProgress
                        label="lable"
                        style={{color:config.secondaryColor}}
                        size={70}
                        // className={this.props.classes.progress}
                        thickness={5}
                        //color="red"
                    />
                )}
            </div>
        );
    }
}

export default Spinner;
