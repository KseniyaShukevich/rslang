import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Drawer, List, ListItem, makeStyles } from "@material-ui/core";
import MenuBookTwoToneIcon from "@material-ui/icons/MenuBookTwoTone";
import SportsEsportsTwoTone from "@material-ui/icons/SportsEsportsTwoTone";
import InsertChartTwoTone from "@material-ui/icons/InsertChartTwoTone";

import { theme } from "../mui-style";



const useStyles = makeStyles({
  list: {
    width: 300,
    height: '100%',
    padding: theme.spacing(1, 0, 0),
    // backgroundColor: '#1565c11a'
  },
  menuItemWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  tutorialLink: {
    alignItems: 'flex-start'
  },
  customTwoTones: {
    paddingLeft: theme.spacing(1),
    // filter: 'invert(30%) sepia(98%) saturate(1068%) hue-rotate(188deg) brightness(89%) contrast(94%)'
    filter: 'invert(64%) sepia(19%) saturate(5959%) hue-rotate(320deg) brightness(114%) contrast(80%)'
  },
  text: {
    // fontWeight: 600,
    marginLeft: '1rem',
    fontSize: '1.5rem',
    color: theme.palette.primary.main,
  },
});

const menuItems = [
  {
    link: '/tutorial',
    title: ' Электронный учебник',
    IconComponent: MenuBookTwoToneIcon
  },
  {
    link: '/mini-games',
    title: ' Мини-игры',
    IconComponent: SportsEsportsTwoTone
  },
  {
    link: '/statistics',
    title: ' Статистика',
    IconComponent: InsertChartTwoTone
  },
]

interface IProps {
  toggleOpen: boolean,
  setToggleOpen: (e: boolean) => void;
}

const Sidebar: React.FC<IProps> = ({ toggleOpen, setToggleOpen }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(toggleOpen);
  }, [toggleOpen])


  const closeDrawer = () => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setOpen(false);
    setToggleOpen(false);

  };

  return (
    <div>
      <React.Fragment key={'left'}>
        <Drawer
          anchor={'left'}
          open={open}
          onClose={closeDrawer()}
          PaperProps={{ style: { position: 'absolute', paddingTop: 64 } }}
          BackdropProps={{ style: { position: 'absolute' } }}
          ModalProps={{
            // container: document.getElementById('drawer-container'),
            style: { zIndex: 1 }
          }}
          SlideProps={{

          }}
          variant="temporary"
        >
          <div
            className={classes.list}
            role="presentation"
            onClick={closeDrawer()}
            onKeyDown={closeDrawer()}
          >
            <List>
              {menuItems.map(({ link, title, IconComponent}, i) => (
                <ListItem button key={title}>
                  <Link to={link} className={`${classes.menuItemWrapper} ${i === 0 ? classes.tutorialLink : ''}`}>
                    <IconComponent style={{ fontSize: 50 }} className={classes.customTwoTones}/>
                    <div className={classes.text}>
                      {title}
                    </div>
                  </Link>
                </ListItem>
              ))}
            </List>
          </div>
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default Sidebar;
