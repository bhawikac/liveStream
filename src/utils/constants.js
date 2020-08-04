export const workoutResultType = {
    UnTracked: 0,
    DidNotWorkout: 1,
    Workout: 2,
    WorkoutResult: 3,
    Class: 4,
    Challenge: 5,
    PremiumPlan: 6,
    VirtualClass: 7,
    ClubConnectVideo: 8
}

export const SubscriptionProductType = {
    Annual: "Annually",
    Quarterly: "Quarterly",
    Monthly: "Monthly",
    Trial: "trial", // don't change the value, it will impact the trial period.(src\store\selectors\subscription.js)
    Daily: "Daily"

}
export const StripeSourceType = {
    Card: "card"
}

export const ConsentType = {
    TNC: "tnc",
    Marketing: "mktg"
}

export const ConsentAction = {
    Rejected: 1,
    Accepted: 2
}
export const SubscriberStatusConstants = {
    INACTIVE: 0,
    ACTIVE: 1,
    UNKNOWN: 2
}