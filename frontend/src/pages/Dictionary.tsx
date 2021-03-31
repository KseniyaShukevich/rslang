import React from "react";
import {
  Box,
  Button,
  Typography,
  makeStyles,
  Theme,
  List,
  ListItem,
} from "@material-ui/core";
import { useState } from "react";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import background from "../assets/images/background_7.jpeg";
import { createStyles } from "@material-ui/core/styles";

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
    list: {
      display: "grid",
      "grid-template-columns": "repeat(3, 1fr)",
      border: "1px solid #e3f2fd",
      boxShadow: "0 2px 4px 0 #e3f2fd",
      margin: 0,
      padding: 0,
    },
    tabs: {
      paddingTop: "4rem",
      height: "60vh",
      overflowY: "auto",
    },
    active: {
      fontSize: "22px",
      fontWeight: 500,
      padding: "6px 10px",
      backgroundColor: "#8dc1e6",
      "& p": {
        margin: "0 auto",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "17px",
      },
    },
    activeTab: {
      fontSize: "3.5rem",
      width: "100%",
      textAlign: "center",
      height: "60vh",
      margin: "0 auto",
      [theme.breakpoints.down("xs")]: {
        fontSize: "2.5rem",
      },
    },
    listItem: {
      fontSize: "22px",
      fontWeight: 500,
      padding: "6px 10px",
      "& p": {
        margin: "0 auto",
      },
      "&:hover": {
        cursor: "pointer",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "17px",
      },
    },
  })
);

const Dictionary: React.FC<IProps> = ({ setIsDictionary }: IProps) => {
  const classes = useStyles();
  const [isChosenTab, setIsChosenTab] = useState([false, false, false]);

  const handleClick = () => {
    setIsDictionary(false);
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
          <List className={classes.list}>
            <ListItem
              className={isChosenTab[0] ? classes.active : classes.listItem}
              onClick={() => setIsChosenTab([true, false, false])}
            >
              <p>Изучаемые слова</p>
            </ListItem>
            <ListItem
              className={isChosenTab[1] ? classes.active : classes.listItem}
              onClick={() => setIsChosenTab([false, true, false])}
            >
              <p>Сложные слова</p>
            </ListItem>
            <ListItem
              className={isChosenTab[2] ? classes.active : classes.listItem}
              onClick={() => setIsChosenTab([false, false, true])}
            >
              <p>Удалённые слова</p>
            </ListItem>
          </List>
          <Box className={classes.tabs}>
            {isChosenTab[0] && (
              <Box className={classes.activeTab}>Здесь нет слов1</Box>
            )}
            {isChosenTab[1] && (
              <Box className={classes.activeTab}>Здесь нет слов2</Box>
            )}
            {isChosenTab[2] && (
              <Box className={classes.activeTab}>Здесь нет слов3</Box>
            )}
          </Box>
        </Box>
      </Box>
      <Button onClick={handleClick}>Назад</Button>
    </>
  );
};

export default Dictionary;
