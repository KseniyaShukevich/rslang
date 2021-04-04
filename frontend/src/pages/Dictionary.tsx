import React, { useRef } from "react";
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
import LearningWords from '../components/LearningWords';
import BookElement from '../components/BookElement';
import { DEPARTMENTS, DEPARTMENTCOLORS } from '../constants';

interface IProps {
  setIsDictionary: (value: boolean) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    titleWrapper: {
      backgroundImage: `url(${background})`,
      backgroundSize: "cover",
      backgroundPosition: '50%',
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
      alignItems: 'center',
      height: 70,
      paddingLeft: theme.spacing(1)
    },
    list: {
      display: "grid",
      "grid-template-columns": "repeat(3, 1fr)",
      border: "1px solid #e3f2fd",
      boxShadow: "0 2px 4px 0 #e3f2fd",
      margin: 0,
      padding: 0,
    },
    booksContainer: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    active: {
      color: 'white',
      fontSize: "22px",
      fontWeight: 500,
      padding: "6px 10px",
      "& p": {
        margin: "0 auto",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "17px",
      },
    },
    listItem: {
      fontSize: "22px",
      fontWeight: 500,
      padding: "6px 10px",
      transition: '0.3s',
      "& p": {
        margin: "0 auto",
      },
      "&:hover": {
        cursor: "pointer",
        color: '#302673'
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "17px",
      },
    },
  })
);

const Dictionary: React.FC<IProps> = ({ setIsDictionary }: IProps) => {
  const classes = useStyles();
  const [isChosenTab, setIsChosenTab] = useState([true, false, false]);
  const [group, setGroup] = useState<number>(0);
  const activeElement = useRef<any>(0);

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
              style={{ fontWeight: 300, margin: '0 0 0 5px' }}
            >
              Словарь
            </Typography>
          </Box>
          <List className={classes.list}>
            <ListItem
              className={isChosenTab[0] ? classes.active : classes.listItem}
              style={isChosenTab[0] ? {background: '#5bc79a'} : {}}
              onClick={() => setIsChosenTab([true, false, false])}
            >
              <p style={{ textAlign: 'center' }}>Изучаемые слова</p>
            </ListItem>
            <ListItem
              className={isChosenTab[1] ? classes.active : classes.listItem}
              style={isChosenTab[1] ? {background: '#f75757'} : {}}
              onClick={() => setIsChosenTab([false, true, false])}
            >
              <p style={{ textAlign: 'center' }}>Сложные слова</p>
            </ListItem>
            <ListItem
              className={isChosenTab[2] ? classes.active : classes.listItem}
              style={isChosenTab[2] ? {background: '#99a8a2'} : {}}
              onClick={() => setIsChosenTab([false, false, true])}
            >
              <p style={{ textAlign: 'center' }}>Удалённые слова</p>
            </ListItem>
          </List>
          <Box className={classes.booksContainer}>
            {
              DEPARTMENTS.map((book, index) =>
                <BookElement
                  book={book}
                  setGroup={setGroup}
                  activeElement={activeElement}
                  color={DEPARTMENTCOLORS[index]}
                  index={index}
                  key={book}
                />
              )
            }
          </Box>
          {isChosenTab[0] && (
            <LearningWords
              group={group}
              mode={'learning'}
              text={'Для этого раздела нет изучаемых слов'}
            />
          )}
          {isChosenTab[1] && (
            <LearningWords
              group={group}
              mode={'hard'}
              text={'Для этого раздела нет сложных слов'}
            />
          )}
          {isChosenTab[2] && (
            <LearningWords
              group={group}
              mode={'deleted'}
              text={'Для этого раздела нет удаленных слов'}
            />
          )}
        </Box>
      </Box>
      <Button onClick={handleClick}>Назад</Button>
    </>
  );
};

export default Dictionary;
