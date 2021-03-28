import React, { useState } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import { Redirect } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        width: 'auto',
        minWidth: '300px',
        maxWidth: '412px',
        minHeight: '238px',
        borderRadius: '8px',
        padding: '38px 25px 20px',
        boxSizing: 'border-box',
        textAlign: 'center',
    },
    h1: {
        color: '#7e919f',
        maxWidth: '288px',
        fontSize: '16px',
        textAlign: 'center',
    },
    h2: {
        color: '#7e919f',
        maxWidth: '288px',
        fontSize: '16px',
        textAlign: 'center',
        marginBottom: theme.spacing(1),
    },
    btn: {
        width:'80%',
        marginTop:'30px',
    }
}));


type Props = {
    isOpen: boolean,
    setIsOpen: (value: boolean) => void
}


const ModalCloseGame: React.FC<Props> = ({isOpen, setIsOpen}) => {
    const classes = useStyles();
    const [isCloseGame, setIsCloseGame] = useState<boolean>(false);

    const handleClose = () => {
      setIsOpen(false);
    };

    const closeGame = () => {
      setIsOpen(false);
      setIsCloseGame(true);
    };

    return (
        <div>
            { isCloseGame && <Redirect to='/mini-games' /> }
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
                        <div className={classes.h1}>Вы точно хотите покинуть игру?</div>
                        <div className={classes.h2}>Результат игры не будет сохранен.</div>
                        <div>
                            <Button className={classes.btn} onClick={closeGame} variant="contained" color="primary">
                                Покинуть
                            </Button>
                        </div>
                        <div>
                            <Button className={classes.btn} onClick={handleClose} color="primary">
                                отмена
                            </Button>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}

export default ModalCloseGame;
