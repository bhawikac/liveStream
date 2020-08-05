import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import { Translate } from '../../utils/Translate'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { linkParser } from '../../utils/linkParser'



class SubscriptionComponent extends Component {

    render() {
        return (
            <div>
                <div className="m-bt-lg-60 m-tb-sm-25 p-gt-sm-5">
                    <Typography variant="h1" className="subTitle">
                        {Translate({ id: "homePage.FreeAccessTitle" })}
                    </Typography>
                    <Typography variant="h3" className="subText m-t-5 m-b-20">
                        {/* {Translate({ id: "Subscription.EnterCodeSubText" })} */}
                        {linkParser("Subscription.EnterCodeSubText")}

                    </Typography>
                    {this.props.isAuthenticated ? "" :
                        <Button variant="contained" color="secondary" className="m-t-15 m-t-xs-15"
                            onClick={() => { this.props.history.push({ pathname: "/signup" }); }}>
                            <Typography variant="button">
                                {Translate({ id: "Subscription.GetAccess" })}
                            </Typography>
                        </Button>
                    }
                </div>
            </div>
        )
    }
};

const mapStateToProps = state => {

    return {
        isAuthenticated: state.auth.token != "",
    };
}



export default connect(mapStateToProps, null)(withRouter(SubscriptionComponent));