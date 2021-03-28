import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    width: "auto",
    minWidth: "300px",
    maxWidth: "412px",
    minHeight: "238px",
    borderRadius: "8px",
    padding: "38px 25px 20px",
    boxSizing: "border-box",
    textAlign: "center",
  },
  h1: {
    color: "#7e919f",
    maxWidth: "288px",
    fontSize: "16px",
    textAlign: "center",
  },
  btn: {
    width: "80%",
    marginTop: "30px",
  },
}));

type Props = {
  isOpen: boolean;
  setIsOpen: any;
};

const ModalStatistic: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  const classes = useStyles();

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Modal
        className={classes.modal}
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>
          <div className={classes.paper}>
            <div className={classes.h1}>
              В каждой мини-игре это слово было угадано:
            </div>
            <div>
              <Button
                className={classes.btn}
                onClick={() => handleClose()}
                color="primary"
              >
                закрыть
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalStatistic;
