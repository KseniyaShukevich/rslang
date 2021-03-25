import { Link, makeStyles } from "@material-ui/core";
import React from "react";
import PageLayout from "./PageLayout";

const useStyles = makeStyles({
  game: {
    width: "40%",
    height: 215,
    border: "4px solid blue",
    borderRadius: "62%",
    marginTop: 20,
    backgroundImage: "linear-gradient(to bottom, #b17c2e75 20%,#3875fff2 80%)",
    "background-blend-mode": "overlay",
  },
  games: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  titleGame: {
    cursor: "pointer",
    fontSize: "4em",
    textAlign: "center",
    borderRadius: "85%",
    fontWeight: "bolder",
  },
});

const MiniGames: React.FC = () => {
  const smth = 9;
  const classes = useStyles();

  return (
    <PageLayout>
      <div className={classes.games}>
        <div className={classes.game}>
          <Link style={{ textDecoration: "none" }}>
            <p className={classes.titleGame}>Саванна</p>
          </Link>
        </div>
        <div className={classes.game}>
          <Link style={{ textDecoration: "none" }}>
            <p className={classes.titleGame}>Аудиовызов</p>
          </Link>
        </div>
        <div className={classes.game}>
          <Link style={{ textDecoration: "none" }}>
            <p className={classes.titleGame}>Спринт</p>
          </Link>
        </div>
        <div className={classes.game}>
          <Link style={{ textDecoration: "none" }}>
            <p className={classes.titleGame}>Своя игра</p>
          </Link>
        </div>
      </div>
      <span />
    </PageLayout>
  );
};

export default MiniGames;
