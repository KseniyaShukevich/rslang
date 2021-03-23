import React from 'react';
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
  }),
);

const TextbookDepartment: React.FC<ITextbookDepartment> = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem button onClick={handleClick} className={classes.listItem} style={{ borderColor: `${props.color}` }}>
        <ListItemIcon >
          <StarsRoundedIcon style={{ fontSize: 50, color: `${props.color}` }} />
        </ListItemIcon>
        <ListItemText primary={props.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {PAGES.map((elem, index) => (
          <ListItem button className={classes.nested} key={index}>
            <ListItemIcon>
              <MenuBookIcon  style={{ color: `${props.color}` }} />
            </ListItemIcon>
            <ListItemText primary={elem} />
          </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
}

export default TextbookDepartment;
