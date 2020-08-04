const customDialogStyle = {
  paper1: {
    width: "100%",
    maxWidth: 800,
    textAlign: "center",
    maxHeight: 496,
    height: "auto",
    minHeight: 320,
    paddingBottom: 136,
    borderRadius:"10px"
  },
  paper2: {
    width: "100%",
    maxWidth: 800,
    textAlign: "center",
    maxHeight: "475px",
    height: "auto",
    paddingBottom: 64,
    paddingTop: 56,
    borderRadius:"10px",
    '@media (max-width:719px)':{
      paddingTop: "30px",
      paddingBottom: "10px"
    },
  },
  
  paper3: {
    width: "100%",
    maxWidth: 800,
    textAlign: "center",
    maxHeight: 500,
    height: "auto",
    minHeight: 320,
    paddingBottom: 56,
    borderRadius:"10px",
    '@media (max-width:719px)':{
      paddingTop: "30px",
      paddingBottom: "10px"
    },
  }
};

export default customDialogStyle;