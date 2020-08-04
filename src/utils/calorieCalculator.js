export function calculateCalorie(userDetail, kCoefficient) {
    let calorieBurn = 0;
    const hRmax = 208 - 0.7 * userDetail.age;
    const heartRate = kCoefficient / 100 * hRmax;
    if (userDetail.gender == "male") {
        calorieBurn = (-55.0969 +
            0.6309 * heartRate +
            0.1988 * userDetail.weightKg +
            0.2017 * userDetail.age) /
            4.184 *
            60 *
            (this.elapsedTime / 60 / 60)
    }
    else {
        calorieBurn =
            (-20.4022 +
                0.4472 * heartRate -
                0.1263 * userDetail.weightKg +
                0.074 * userDetail.age) /
            4.184 *
            60 *
            (this.elapsedTime / 60 / 60);
    }
}