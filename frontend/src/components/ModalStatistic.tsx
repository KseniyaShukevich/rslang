import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import { IMiniGamesStat } from '../interfaces';

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
    marginBottom: "20px",
  },
  btn: {
    width: "80%",
    marginTop: "30px",
  },
  green: {
    color: 'green',
  },
  red: {
    color: 'red',
  },
}));

type Props = {
  title: string;
  tittleNoStatistics: string;
  isOpen: boolean;
  setIsOpen: any;
  countWords?: number,
  wordStatistic: IMiniGamesStat | null
};

const ModalStatistic: React.FC<Props> = ({
  title,
  tittleNoStatistics,
  isOpen,
  setIsOpen,
  countWords,
  wordStatistic
}) => {
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
            { wordStatistic &&
              <>
                <div className={classes.h1}>
                  {title}
                </div>
                {countWords && (
                  <div className={classes.h1}>
                    {countWords} изучаемых слов
                  </div>
                )}
                <div><strong>Саванна: </strong>
                  <ul>
                    <li className={classes.green}><span>правильных ответов - </span><strong>{`${wordStatistic.savannah.correctAnswers}`}</strong></li>
                    <li className={classes.red}><span>неправильных ответов - </span><strong>{`${wordStatistic.savannah.wrongAnswers}`}</strong></li>
                  </ul>
                </div>
                <div><strong>Аудиовызов: </strong>
                  <ul>
                    <li className={classes.green}><span>правильных ответов - </span><strong>{`${wordStatistic.audio.correctAnswers}`}</strong></li>
                    <li  className={classes.red}><span>неправильных ответов - </span><strong>{`${wordStatistic.audio.wrongAnswers}`}</strong></li>
                  </ul>
                </div>
                <div><strong>Спринт: </strong>
                  <ul>
                    <li className={classes.green}><span>правильных ответов - </span><span>{`${wordStatistic.sprint.correctAnswers}`}</span></li>
                    <li className={classes.red}><span>неправильных ответов - </span><span>{`${wordStatistic.sprint.wrongAnswers}`}</span></li>
                  </ul>
                </div>
                <div><strong>Своя игра: </strong>
                  <ul>
                    <li className={classes.green}><span>правильных ответов - </span><span>{`${wordStatistic.ownGame.correctAnswers}`}</span></li>
                    <li className={classes.red}><span>неправильных ответов - </span><span>{`${wordStatistic.ownGame.wrongAnswers}`}</span></li>
                  </ul>
                </div>
              </>
            }
            { !wordStatistic &&
              <div>{tittleNoStatistics}</div>
            }
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
