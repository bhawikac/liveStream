import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from './components/spinner/AppLoader';
import { BrowserRouter } from "react-router-dom";
import Localytics from "./Localytics";
import { fetchTenantConfig } from './store/actions/ondemand'
import App from './App'

class AppWrapper extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <React.Fragment>
                {this.props.tenantConfig == null ?
                    <Spinner fetchTenantConfig={this.props.fetchTenantConfig} /> :
                    <Localytics>
                        <BrowserRouter>
                            <App />
                        </BrowserRouter>
                    </Localytics>
                }

            </React.Fragment>

        );
    }
}

const mapStateToProps = state => {
    return {

        tenantConfig: state.onDemand.tenantConfig

    };
};

const mapDispatchToProps = dispatch => {
    return {

        fetchTenantConfig: () => dispatch(fetchTenantConfig()),

    };
};

//export default App;
export default
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AppWrapper);


