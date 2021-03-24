import { lightGreen, orange } from "@material-ui/core/colors";
import { createMuiTheme, createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: orange[800],
      light: orange[600],
      dark: orange[900]
    },
    secondary: {
      main: '#e57373',
      light: '#ffa4a2',
      dark: '#af4448'
    },
    text: {
      primary: '#212121',
      secondary: 'white',
      disabled: '',
    }
  },
  spacing: 10,
})

export const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
      flexGrow: 1,
    },
    spacer: {
      flex: 1,
    },
    title: {
      marginRight: theme.spacing(2),

      '&:first-letter': {
        color: theme.palette.secondary.light,
        fontWeight: 600,
        'font-size': theme.spacing(3.1),
      }
    },
    titleSpan: {
      verticalAlign: '7%',
    },
}));
