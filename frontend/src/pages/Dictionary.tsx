import React from "react";
import {
  Box,
  Button,
  makeStyles,
  Theme,
  Typography,
  List,
  ListItem,
  Link,
} from "@material-ui/core";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
// import classes from "*.module.css";
import { createStyles } from "@material-ui/core/styles";
import "../index.scss";
import { useState } from "react";
import background from "../assets/images/background_7.jpeg";
import { url } from "node:inspector";

interface IProps {
  setIsDictionary: (value: boolean) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    titleWrapper: {
      backgroundImage: `url(${background})`,
      backgroundSize: "cover",
      padding: "20px 60px 20px 60px",
      [theme.breakpoints.down("sm")]: {
        padding: "20px 30px 20px 30px",
      },
    },
    dictionary: {
      background: "rgba(236,240,241,.85)",
      borderRadius: "10px",
    },
    dictTitle: {
      display: "flex",
    },
    tab: {
      fontSize: "3.5rem",
      width: "100%",
      textAlign: 'center',
      height: "60vh",
    margin: '0 auto',
    },
  })
);

const Dictionary: React.FC<IProps> = ({ setIsDictionary }: IProps) => {
  const classes = useStyles();
  const [target, setTarget] = useState("");

  const handleClick = () => {
    setIsDictionary(false);
  };
  const activeLink = (e: any) => {
    setTarget(e.target.innerHTML);
  };

  return (
    <>
      <Box className={classes.titleWrapper} color="text.primary">
        <Box className={classes.dictionary}>
          <Box className={classes.dictTitle}>
            <LocalLibraryIcon style={{ fontSize: 50 }} />
            <Typography
              gutterBottom
              variant="h3"
              style={{ fontWeight: 300, paddingLeft: 20 }}
            >
              Словарь
            </Typography>
          </Box>
          <List
            className="menu"
            style={{ padding: 0, margin: 0 }}
            onClick={activeLink}
          >
            <ListItem className={target == "Изучаемые слова" ? "active" : ""}>
              <Link
                className="link"
                style={{ textDecoration: "none", margin: '0 auto' }}
                href="#studied-words"
              >
                Изучаемые слова
              </Link>
            </ListItem>
            <ListItem className={target == "Сложные слова" ? "active" : ""}>
              <Link
                className="link"
                style={{ textDecoration: "none", margin: '0 auto' }}
                href="#difficult-words"
              >
                Сложные слова
              </Link>
            </ListItem>
            <ListItem className={target == "Удалённые слова" ? "active" : ""}>
              <Link
                className="link"
                style={{ textDecoration: "none", margin: '0 auto' }}
                href="#deleted-words"
              >
                Удалённые слова
              </Link>
            </ListItem>
          </List>
          <Box className="tabs">
            <Box
            className={classes.tab}
            id={"studied-words"}>
              Здесь нет слов
              <List></List>
            </Box>
            <Box
              className={classes.tab}
              id={"difficult-words"}
            >
              Здесь нет слов
              <List></List>
            </Box>
            <Box
              className={classes.tab}
              id={"deleted-words"}
            >
              Здесь нет слов
              <List></List>
            </Box>
          </Box>
        </Box>
      </Box>
      <Button onClick={handleClick}>Назад</Button>
    </>
  );
};

export default Dictionary;
