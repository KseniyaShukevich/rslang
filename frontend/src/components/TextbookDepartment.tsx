import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom"
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarsRoundedIcon from '@material-ui/icons/StarsRounded';
import MenuBookIcon from '@material-ui/icons/MenuBook';

import { ITextbookDepartment } from '../interfaces';
import { PAGES } from '../constants';
import { getNotEmptyPages } from '../requests';
import { selectUser } from '../slices/userSlice';
import { groupNonEmptyPages, selectGroupNonEmptyPagesArr } from '../slices/groupPagesSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItem: {
      borderWidth: 2,
      borderStyle: 'solid',
      borderRadius: 5,
      marginBottom: theme.spacing(1)
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    link: {
      color: 'inherit',
      textDecoration: 'none',
    },
  }),
);

const TextbookDepartment: React.FC<ITextbookDepartment &  {handleOnLoading: (e: boolean) => void}> = (props) => {
  const { book, name, color, handleOnLoading } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [fetched, setFetched] = useState(false);
  const [open, setOpen] = useState(false);
  const groupPagesArr = useSelector(selectGroupNonEmptyPagesArr);

  const [pages, setPages] = useState(PAGES);

  const handleClick = () => {
    if (user && !open && !fetched) {
      handleOnLoading(true);
      (async () => {
        let res = await getNotEmptyPages(user.userId, book, user.token)
        dispatch(groupNonEmptyPages([res, book]));
        setFetched(true);
        setOpen(true);
        handleOnLoading(false);
      })();
    } else {
      setOpen(!open);
    }
  };

  useEffect(() => {
    setPages(groupPagesArr[book] || PAGES);
  }, [ groupPagesArr ])

  return (
    <>
      <ListItem button onClick={handleClick} className={classes.listItem} style={{ borderColor: `${color}` }}>
        <ListItemIcon >
          <StarsRoundedIcon style={{ fontSize: 50, color: `${color}` }} />
        </ListItemIcon>
        <ListItemText primary={name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {pages.map((page) => (
          <Link key={page.name} to={`/tutorial/page/${book}/${page.number - 1}`} className={classes.link}>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <MenuBookIcon  style={{ color: `${color}` }} />
              </ListItemIcon>
              <ListItemText primary={page.name} />
            </ListItem>
          </Link>
          ))}
        </List>
      </Collapse>
    </>
  );
}

export default TextbookDepartment;
