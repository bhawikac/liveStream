import React from 'react'
import { Grid, IconButton, MenuItem, Menu, Typography } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Translate } from "../../utils/Translate";
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux"
import Routes from '../../components/Router/Routes'

const ITEM_HEIGHT = 48;
const AccountButtonDotsMobile = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const isAuthenticated = useSelector(state => state.auth.token !== "");
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (

        !isAuthenticated ? (
        // <div >
        //     <Grid container className="tripleDotsPage" onClick={() => {
        //         props.history.push({ pathname: "/signup" });
        //     }}>
        //         <Grid item >
        //             <Typography variant="button">
        //                 SignUp
        //             </Typography>
        //         </Grid>
        //         <Grid item><img
        //             className=""
        //             src={require("../../assets/images/RightArrow.svg")}
        //         /></Grid>
        //     </Grid>

        // </div>
                
        <div>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
                className="kebab"
            >
                <img src={require("../../assets/images/more-vert.svg")} />
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: 200,
                        // top:50,
                        // left:100
                    },
                }}
                style={{ top:"25px", left:"-10px"}}
            >
                <MenuItem
                    onClick={() => {
                        setAnchorEl(null);
                        props.history.push({ pathname: "/signup" });
                    }}
                >
                    <Typography variant="button">{Translate({ id: "layout.SignUp" })}</Typography>
                </MenuItem>
                
            </Menu>
        </div>
        ) : (<div>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
                className="kebab"
            >
                <img src={require("../../assets/images/more-vert.svg")} />
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: 200,
                    },
                }}
                style={{ top:"40px", left:"-10px"}}

            >
                <MenuItem
                    onClick={() => {
                        setAnchorEl(null);
                        props.history.push({ pathname: Routes.classListViewRoute});
                    }}
                >
                    <Typography variant="button">
                    {Translate({ id: "footer.home" })}
                        </Typography>
                </MenuItem>
                {/* <MenuItem
                    onClick={() => {
                        setAnchorEl(null);
                        props.history.push({ pathname: "/connect" });
                    }}
                >
                    <Typography variant="button">{Translate({ id: "club.Id" })}</Typography>
                </MenuItem> */}
                <MenuItem
                    onClick={() => {
                        setAnchorEl(null);
                        props.history.push({ pathname: Routes.recentActivityRoute });
                    }}
                >
                    <Typography variant="button">{Translate({ id: "ClassListViews.MyActivity" })}</Typography>
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        setAnchorEl(null);
                        props.history.push({ pathname: Routes.favClassRoute });
                    }}
                >
                    <Typography variant="button">{Translate({ id: "ClassListViews.FavTitle" })}</Typography>
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        setAnchorEl(null);
                        props.history.push({ pathname:Routes.searchRoute });
                    }}
                >
                    <Typography variant="button">{Translate({ id: "ClassListViews.Search" })}</Typography>
                </MenuItem>
            </Menu>
        </div>)
    )
}

export default withRouter(AccountButtonDotsMobile);
