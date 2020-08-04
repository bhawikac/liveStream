import { createSelector } from 'reselect'
import { SubscriptionProductType } from "../../utils/constants";

const userSubscription = (state) => state.subscription.userSubscripton;
const subscriptionProduct = (state) => state.subscription.subscriptionProduct

export const getUserActiveSubscription = createSelector([userSubscription],
    (userSubs) => {
        let userActivesubscription = null;
        if (userSubs != null && (typeof userSubs !== 'undefined' && userSubs.length > 0)) {
            let userActiveSubscriptions = userSubs.filter(x => x.Status === "active" ||
                (x.hasOwnProperty("subscription") ?
                    (x.subscription !== null
                        && x.subscription.status === "active")
                    : false));
            if (userActiveSubscriptions.length > 0) {
                userActivesubscription = userActiveSubscriptions[0];
            }
        }else if(userSubs && userSubs.status === "trialing"){
                return userSubs;
            }
        
        return userActivesubscription;
    });


export const getTrailPlanDetail = createSelector([subscriptionProduct],
    (subProd) => {
        let trialPlan = null;
        if (subProd != null && subProd.length > 0) {
            trialPlan = subProd[0].plans.filter(x => x.tag.indexOf(SubscriptionProductType.Trial) > 0 || x.trialPeriodDays > 0);
        }
        return trialPlan;
    })