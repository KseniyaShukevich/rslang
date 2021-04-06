import React from 'react';
import { Theme, createStyles, makeStyles, } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      backgroundColor: '#43da6b',
      width: '23px',
      height: '23px',
      borderRadius: '50%',
      margin: '0 7px',
    },
    iconBlack: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#25312b',
      backgroundColor: '#25312b',
      width: '23px',
      height: '23px',
      borderRadius: '50%',
      margin: '0 7px',
    },
    iconHidden: {
      display: 'inline-flex',
      opacity: '0',
      width: '23px',
      height: '23px',
      borderRadius: '50%',
      margin: '0 7px',
    },
  })
);

interface IProps {
  wordSequence: number,
  isSingleSequence: boolean,
}

const CorrectAnswerIcons: React.FC<IProps> = (props) => {
  const { wordSequence, isSingleSequence } = props;
  const classes = useStyles();

  return (
    <>
      {isSingleSequence && [0, 1, 2].map((elem) => {
        return (
        <div className={(elem === 1) ? classes.icon : classes.iconHidden} key={elem}>
          <CheckIcon fontSize="small" />
        </div> )
      })}
      {!isSingleSequence && [0, 1, 2].map((elem) => {
        return (
        <div className={(elem < wordSequence) ? classes.icon : classes.iconBlack} key={elem}>
          <CheckIcon fontSize="small" />
        </div> )
      })}
    </>
  );
}

export default CorrectAnswerIcons;
