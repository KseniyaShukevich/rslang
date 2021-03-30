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
    tab: {
      display: "none",
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
      fontSize: '22px',
      fontWeight: 500,
      padding: '6px 10px',
      backgroundColor: "#8dc1e6",
      "& p": {
        margin: "0 auto",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: '17px',
      },
    },
    activeTab: {
      fontSize: "3.5rem",
      width: "100%",
      textAlign: "center",
      height: "60vh",
      margin: "0 auto",
      [theme.breakpoints.down("xs")]: {
        fontSize: '2.5rem',
      },
    },
    listItem: {
      fontSize: '22px',
      fontWeight: 500,
      padding: '6px 10px',
      "& p": {
        margin: "0 auto",
      },
      "&:hover": {
        cursor: "pointer",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: '17px',
      },
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
  const [isStudiedWords, setIsStadiedWords] = useState(false);

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
          <List className={classes.list} onClick={activeLink}>
            <ListItem
              className={target == "Изучаемые слова" ? classes.active : classes.listItem}
            >
              <p>Изучаемые слова</p>
            </ListItem>
            <ListItem
              className={target == "Сложные слова" ? classes.active : classes.listItem}
            >
              <p>Сложные слова</p>
            </ListItem>
            <ListItem
              className={target == "Удалённые слова" ? classes.active : classes.listItem}
            >
              <p>Удалённые слова</p>
            </ListItem>
          </List>
          <Box className={classes.tabs}>
            <Box
              className={
                target == "Изучаемые слова" ? classes.activeTab : classes.tab
              }
            >
              Здесь нет слов1
            </Box>
            <Box
              className={
                target == "Сложные слова" ? classes.activeTab : classes.tab
              }
            >
              Здесь нет слов2
            </Box>
            <Box
              className={
                target == "Удалённые слова" ? classes.activeTab : classes.tab
              }
            >
              Здесь нет слов3
            </Box>
          </Box>
        </Box>
      </Box>

      <Button onClick={handleClick}>Назад</Button>
    </>
  );
};

export default Dictionary;
