import { theme } from "../mui-style";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
  contentWrapper: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 40,
    margin: "0 auto",
    alignItems: "center",
  },
  iframe: {
    width: "80%",
    height: 600,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  subTitle: {
    "font-size": "1.5rem",
    fontWeight: 800,
    textAlign: "center",
  },
});

const Section2: React.FC<any> = () => {
  const classes = useStyles();

  return (
    <div className={classes.contentWrapper}>
      <p className={classes.subTitle}>Как работает RSLang?</p>
      <iframe
        className={classes.iframe}
        src="https://www.youtube.com/embed/UylAZQt1-MI"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="video"
      />
    </div>
  );
};
export default Section2;
