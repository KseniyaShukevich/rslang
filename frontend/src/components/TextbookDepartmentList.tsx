import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { DEPARTMENTS, DEPARTMENTCOLORS } from '../constants';
import TextbookDepartment from './TextbookDepartment';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 500,
      backgroundColor: 'rgba(255,255,255,.6)',
      borderRadius: '10px',
      margin: theme.spacing(0, 'auto', 4),
      padding: theme.spacing(2, 3),
    },
  }),
);

const TextbookDepartmentsList: React.FC = () => {
  const classes = useStyles();

  return (
    <List className={classes.root} >
      {DEPARTMENTS.map((elem: string, index: number) => {
        return <TextbookDepartment book={index} name={elem} color={DEPARTMENTCOLORS[index]} key={index} />
      })}
    </List>
  );
}

export default TextbookDepartmentsList;
