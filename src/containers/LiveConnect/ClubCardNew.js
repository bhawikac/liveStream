import React from 'react'
import { withRouter } from 'react-router';
import { useSelector } from "react-redux"
import Workout from "../../components/PlayerAndCarousel/Workout/Workout"
import Routes from '../../components/Router/Routes'


function ClubCardNew(props) {
    const { clubData } = props
    const isAuthenticated = useSelector(state => state.auth.token != "")


    const getMaxResolutionThumbnail = (picturesObj) => {
        if (picturesObj.length === 0) {
            return;
        }

        var max = picturesObj[0].height;
        var maxIndex = 0;

        for (var i = 1; i < picturesObj.length; i++) {
            if (picturesObj[i].height > max) {
                maxIndex = i;
                max = picturesObj[i].height;
            }
        }

        return maxIndex;
    }
    const onClubCardClicked = () => {
        console.log(clubData);
        if (!isAuthenticated) {
            props.history.push({ pathname: "/signin" });
            return
        }
        let video = {
            id: clubData.id,
            url: clubData.streamingLink,
            creationDate: clubData.created_Time ? clubData.created_Time : "",
            trailerLinkWeb: clubData.trailerLink,
            description: clubData.description,
            title: clubData.name,
            thumbnail: clubData.pictures ? clubData.pictures.sizes[getMaxResolutionThumbnail(clubData.pictures.sizes)].link : "",
            durationSecond: clubData.duration,
        };
        props.history.push({
            pathname: Routes.connectClassPlayerRoute + video.id,
            state: { selectedItem: video, isClubConnect: true },
        });
    }
    return (
        <div>
            <Workout
                creationDate={clubData.created_Time}
                trailerLinkWeb={clubData.trailerLink}
                history={props.history}
                showFav={isAuthenticated ? true : false}
                thumbnail={clubData.pictures ? (clubData.pictures.sizes ? clubData.pictures.sizes[getMaxResolutionThumbnail(clubData.pictures.sizes)].link : "") : ""}
                url={clubData.streamingLink}
                title={clubData.name}
                duration={clubData.duration
                    ? Math.floor(clubData.duration / 60)
                    : 55}
                description={clubData.description}
                show={true}
                id={clubData.id}
                clicked={onClubCardClicked}
                level={clubData.level}
                isClubConnect={true}
            />
        </div>
    )
}

export default withRouter(ClubCardNew)
