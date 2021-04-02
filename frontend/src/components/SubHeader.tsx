import React, { useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Typography } from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import SettingsTwoToneIcon from '@material-ui/icons/SettingsTwoTone';
import AppsTwoToneIcon from '@material-ui/icons/AppsTwoTone';
import Pagination from '@material-ui/lab/Pagination';
import { DEPARTMENTCOLORS } from '../constants';
import { PaginationItem } from '@material-ui/lab';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      position: 'relative',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      textAlign: 'center',
    },
    bookWrapper: {
      position: 'absolute',
      right: '10px',
      top: '12px',
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'solid 2px white',
    },
    pagination: {
      '& > *': {
        marginTop: theme.spacing(2),
      },
    },
    link: {
      textDecoration: 'none',
      color: 'black',
    }
  }),
);

interface ISubHeader {
  page: string,
  book: string,
  pagesArr: number[],
  nextPage: boolean,
}

const getColor = (bookDepartment: number): string => {
  return DEPARTMENTCOLORS[bookDepartment];
}

const SubHeader: React.FC<ISubHeader> = (props) => {
  const { book, page: pageNumber, pagesArr, nextPage } = props;
  const history = useHistory();
  const classes = useStyles();
  const [page, setPage] = useState(Number(pageNumber) + 1);
  // const [pageList, setPageList] = useState(pagesArr.map(pageNumber => Number(pageNumber) + 1));

  const handleChange = (value: number) => {
    setPage(value);
  };

  // useEffect(() => {
  //   if (nextPage) {
  //     handleChange(page + 1) // TODO переделать если номер не итерируется
  //   }
  // }, [nextPage])

  useEffect(() => {
    history.push(`/tutorial/page/${book}/${page - 1}`);
  }, [page])

  // useEffect(() => {
  //   setPageList(pagesArr.map(pageNumber => Number(pageNumber) + 1));
  // }, [pagesArr])

  return (
    <div className={classes.root} style={{ backgroundColor: getColor(Number(book)) }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Link to="/tutorial" className={classes.link}>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <AppsTwoToneIcon />
            </IconButton>
          </Link>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <SettingsTwoToneIcon />
          </IconButton>
          <div className={classes.root}>
            <Pagination
              count={pagesArr.length}
              page={pagesArr.indexOf(page)+1}
              siblingCount={2}
              color="primary"
              size="small"
              renderItem = {(item)=> {
                item.page = pagesArr[item.page - 1]
                item.onClick = () => {
                  handleChange(item.page)
                }
                return <PaginationItem {...item}/>
              }}
            />
          </div>
          <Box style={{ backgroundColor: getColor(Number(book)) }} className={classes.bookWrapper}>
            <Typography variant="h6" className={classes.title}>
              {`Книга ${Number(book) + 1}`}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default SubHeader;
