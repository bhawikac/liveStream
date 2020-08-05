const AppBarButtonStyle = {
  AccountBarButton: {
    fontSize: "11px",
    // width: "130px",
    // height: "32px",
    // color: "#000",
    border: "none",
    // backgroundColor: '#fff',
    // marginRight:"10px"
    // width:"50%",
    fontWeight: "bold",

  },
  AppBarButtonMobile: {
    fontSize: "10px",
    width: "90px",
    height: "30px",
    color: "#FFFFFF",
    border: "000",
    width: "50%"
  },
  loginButton: {
    ['@media (min-width:780px)']: {
      textTransform: "none",
      width: "200px",
      borderRadius: "24px",
      height: "48px"
    },
    ['@media (max-width:779px)']: {
      textTransform: "none",
      width: "140px",
      borderRadius: "18px",
      height: "40px"
    }
  }
};
export default AppBarButtonStyle;
