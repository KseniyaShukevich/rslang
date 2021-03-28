import React from 'react';
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";

type Props = {
  level:number,
  setLevel:any,
}
const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);
const useStyles = makeStyles((theme) => ({
  margin: {
    margin:theme.spacing(1),
  },
  chooseLevel: {
    margin: '0 auto 58px',
    fontSize: '18px',
    lineHeight: '24px',
    fontWeight: 300,
    color: '#fff',
    opacity: '.8',
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',

  }

}));



const ChooseLevel:React.FC<Props> = ({level, setLevel}) => {
  const classes = useStyles();


  const handleChange = (event: any) => {
    setLevel(event.target.value);
  };
  return (
    <div className={classes.chooseLevel}> Выберите уровень сложности
      <span>
            <FormControl className={classes.margin}>
        <NativeSelect
          id="demo-customized-select-native"
          value={level}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          <option value={0}>1</option>
          <option value={1}>2</option>
          <option value={2}>3</option>
          <option value={3}>4</option>
          <option value={4}>5</option>
          <option value={5}>6</option>
        </NativeSelect>
      </FormControl></span>
    </div>
  );
};

export default ChooseLevel;
