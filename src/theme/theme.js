import { createMuiTheme } from "@material-ui/core/styles";

var theme = "";
var themeSettings = require("../assets/config.json");
theme = createMuiTheme({
  palette: {
    primary: {
      main: "#000"
    },
    secondary: {
      main: themeSettings.primaryColor
    },
    error: {
      main: themeSettings.errorColor
    }
  },
  typography: {
    fontFamily: ["SFProRounded-regular"].join(",")
  },
  props: {
    MuiButtonBase: {
      disableRipple: true
    }
  },
  shadows: new Array(25),

  overrides: {
    MuiButton: {
      root: {

        border: 0,
        borderRadius: "32px",
        textTransform: "NONE",
        width: "300px",
        height: "64px",

        '@media (max-width:450px)': {
          width: '100% !important',
          height: "48px",
          borderRadius: "24px",

        },

      },

      containedSecondary: {
        // textTransform: "uppercase",
        fontFamily: "SFProRounded",
        fontSize: "11px",
        fontWeight: "normal",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: 1.36,
        letterSpacing: "normal",
        textAlign: "center",
        color: "#ffffff",
      },
      textSecondary: {
        fontWeight: 900,
        fontStyle: "normal",
        // textTransform:"uppercase" ,
        // fontSize:"1.25rem",
        fontSize: "20px",
        "&:hover": {
          // backgroundColor:"white",
          // textDecoration:"none"
        }
      }
    },
    MuiDivider: {
      root: {
        backgroundColor: themeSettings.dividerColor,
        height: "100%",
        height: "2vw",
        width: "100%",
        margin: "0 auto"
      }
    },


    MuiInput: {
      underline: {
        "&&&&:before": {
          borderBottom: `1px solid #eae8e8z`,
          paddingTop: "5px"
        }
      },

      root: {
        //  width:'100%'
        fontSize: "22px",
        fontFamily: "SFProDisplay-Bold",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: 1.36,
        letterSpacing: "-0.2px"
      }
    },
    MuiInputLabel: {
      root: {
        color: "#9b9b9b",
        fontSize: "22px",
        fontStretch: "normal",
        fontStyle: "normal",
        // lineHeight: 1.36,
        letterSpacing: "-0.2px"

      }
    },
    MuiFormControl: {
      root: {
        margin: "normal",
        paddingBottom: "8px",
        minHeight: "59px",
      }
    },
    MuiToolBar: {
      root: {
        zIndex: "1000000000",
        boxShadow: "0px 10px 13px 0px rgba(0,0,0,0.18)"
      }
    },
  },
  breakpoints: {
    // values: {
    //   xs: 0,
    //   sm: 720,
    //   md: 1366,
    //   lg: 1920,
    //   xl:2920
    // }
    values: {
      xs: 0,
      sm: 600,
      md: 720,
      lg: 1280,
      xl: 1920
    }
  }
});

//heading
theme.typography.h1 = {
  fontFamily: "SFProDisplay-Bold",
  fontWeight:"normal",
  fontSize: "40px",
  fontStretch: "normal",
  fontStyle: "normal",
  lineHeight: "1.2",
  letterSpacing: "-0.8px",

  [theme.breakpoints.down('sm')]: {
    fontSize: "22px",
    lineHeight:"30px",
    letterSpacing: "-0.2px"
  },
  [theme.breakpoints.between('sm','md')]: {
    fontSize: '28px',
  },
};

//hundred of classes

theme.typography.h2 = {
  fontFamily: "SFProDisplay-Bold",
  fontWeight:"normal",
  fontSize: "28px",
  fontStretch: "normal",
  fontStyle: "normal",
  lineHeight: "1.14",
  letterSpacing: "-0.2px",

  [theme.breakpoints.down('sm')]: {
    fontFamily: "SFProDisplay-Bold",
    fontWeight:"normal",
    fontSize: "20px",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.4",
    letterSpacing: "normal",
  },
}
//footer
theme.typography.h3 = {
  fontFamily: "SFProRounded-Regular",
  fontSize: "17px",
  fontWeight:"normal",
  fontStretch: "normal",
  fontStyle: "normal",
  lineHeight: "1.41",
  letterSpacing: "-0.3px"

}
// card level
theme.typography.h4 = {
  fontFamily: "SFProDisplay-Regular",
  fontWeight:"normal",
  fontSize: "15px",
  fontStretch: "normal",
  fontStyle: "normal",
  lineHeight: "1.47",
  letterSpacing: "normal"

}

//login button for mobile
theme.typography.h5 = {
  fontFamily: "SFProDisplay-Bold",
  fontWeight:"normal",
  fontSize: "20px",
  fontStretch: "normal",
  fontStyle: "normal",
  lineHeight: "1.4",
  letterSpacing: "normal",

  [theme.breakpoints.down('sm')]: {
    fontFamily: "SFProRounded-Medium",
    fontSize: "15px",
    // fontWeight: "500",
  fontWeight:"normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.47",
    letterSpacing: "normal",
  }
}

theme.typography.h6 = {
  fontFamily: "SFProDisplay-Regular",
  fontSize: "20px",
  fontWeight: "normal",
  fontStretch: "normal",
  fontStyle: "normal",
  lineHeight: "1.4",
  letterSpacing: "normal",

}
theme.typography.h7 = {
  fontFamily: "SFProDisplay-Regular",
  fontSize: "17px",
  fontWeight: "normal",
  fontStretch: "normal",
  fontStyle: "normal",
  lineHeight: "1.4",
  letterSpacing: "normal",
  color: '#c6c5ca'
}
theme.typography.subtitle1 = {
  fontFamily: "SFProDisplay-Bold",
  fontSize: "20px",
  fontWeight:"normal",
  fontStretch: "normal",
  fontStyle: "normal",
  lineHeight: "1.4",
  letterSpacing: "normal",

  [theme.breakpoints.down('sm')]: {
    ...theme.typography.h3
  },
}

theme.typography.subtitle2 = {
  fontFamily: "SFProRounded-Semibold",
  fontSize: "17px",
  fontWeight:"normal",
  fontStretch: "normal",
  fontStyle: "normal",
  lineHeight: "1.41",
  letterSpacing: "-0.2px",
}

theme.typography.button = {
  fontFamily: "SFProDisplay-Bold",
  fontSize: "20px",
  fontWeight:"normal",
  fontStretch: "normal",
  fontStyle: "normal",
  lineHeight: "1.4",
  letterSpacing: "normal",
}

//Card Description
theme.typography.body1 = {
  fontFamily: "SFProDisplay-Bold",
  fontSize: "22px",
  fontWeight:"normal",
  fontStretch: "normal",
  fontStyle: "normal",
  lineHeight: "1.36",
  letterSpacing: "-0.2px",
}

theme.typography.body2 = {
  fontFamily: "SFProRounded-Regular",
  fontSize: "17px",
  fontWeight: "normal",
  fontStretch: "normal",
  fontStyle: "normal",
  lineHeight: "1.41",
  letterSpacing: "-0.3px",
}

// theme.typography={
//   ...theme.typography,
//   label:{
//     fontFamily: "SFProDisplay-Semibold",
//   fontSize: "20px",
//   fontWeight: "600",
//   fontStretch: "normal",
//   fontStyle: "normal",
//   lineHeight: "1.4",
//   letterSpacing: "normal",
//   }
// }

theme.typography.caption = {
  fontFamily: "SFProRounded-Regular",
  fontSize: "15px",
  fontWeight: "normal",
  fontStretch: "normal",
  fontStyle: "normal",
  lineHeight: "1.47",
  letterSpacing: "normal"
}

theme.typography.overline = {
  fontFamily: "SFProRounded-Regular",
  fontSize: "13px",
  fontWeight: "normal",
  fontStretch: "normal",
  fontStyle: "normal",
  lineHeight: 1.38,
  letterSpacing: "normal",
  color: "#ff0000"

}

export default theme;
