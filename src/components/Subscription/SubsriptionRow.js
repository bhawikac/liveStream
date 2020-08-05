import React from "react";
import { Grid, Typography } from "@material-ui/core";
import './SubsciptionRow.css'
import { Translate } from '../../utils/Translate'
import { SubscriptionProductType } from "../../utils/constants";
const config = require('../../assets/config.json')


class SubscriptionRow extends React.PureComponent {

    render() {
        // const planType = this.props.plan.tag.split("_").slice(-1)[0]
        const { plan } = this.props;
        var { amount } = this.props.plan;
        amount = Number.isInteger(amount) ? amount : amount.toFixed(2)
        const offer = plan.savePercent;
        // if (plan) {
        //     var planType="";
        //     if (plan.interval === "month") {
        //         if (plan.intervalCount === 1) {
        //              planType = SubscriptionProductType.Monthly
        //         }
        //         if (plan.intervalCount === 3) {
        //              planType = SubscriptionProductType.Quarterly
        //         }
        //     }
        //     else if (plan.interval === "year") {
        //          planType = SubscriptionProductType.Annual
        //     }
        //     else if (plan.interval === "day" && plan.intervalCount === 1) {
        //          planType = SubscriptionProductType.Daily
        //     }

        // }
        return (
            <div className='fixedWidthGrid'>
                <Grid container direction="row" justify="center" className='subscriptionRow' >
                    <div className='subscriptionPlan'>
                        <Typography variant="h5" className='subscriptionPlanTitle' >
                            {`${config.currency} ${amount} `}
                            {this.props.displayName}
                        </Typography>

                        {/* {offer ? offer !== 0 &&
                            <div className='offerTextBox'>
                                <p className='offerText'>
                                    {Translate({ id: "Subscription.Save" })} {offer} %</p>
                            </div>: null} */}
                    </div>

                    <div className='subscriptionSelectButton'>
                        <div onClick={() => this.props.callback(this.props.plan.tag, this.props.displayName, amount)} className='selectButton btn-default'>
                            <Typography style={{ lineHeight: 1.8 }} variant='caption'>
                                {Translate({ id: "Subscription.SelectButtonTitle" })}
                            </Typography>
                        </div>
                    </div>
                </Grid >
                <hr className='hrow' />
            </div>

        )
    }
}

export default SubscriptionRow;