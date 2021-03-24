import { theme } from "../mui-style";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
  contentWrapper: {
    paddingTop: 40,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    "max-width": 1700,
    margin: "0 auto",
  },
  iframe: {
    width: "80%",
    height: 600,
    margin: "0 auto",
  },
});

const Section2: React.FC<any> = () => {
  const classes = useStyles();

  return (
    <div className={classes.contentWrapper}>
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
