import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { selectUser } from '../slices/userSlice';
import {
        selectSettings,
        updateSettings,
        setLStorageSettings
      } from '../slices/settingsSlice';
import { useSelector, useDispatch } from 'react-redux';
import { ID_LOCALE_STORAGE } from '../utils/constants';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    btn: {
      width: '100%',
      marginTop: '30px',
    },
  })
);

interface ISettings {
  isTranslation: boolean
  isButtons: boolean
}

interface IProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

const ModalSettings: React.FC<IProps> = ({ isOpen, setIsOpen }: IProps) => {
  const classes = useStyles();
  const user = useSelector(selectUser);
  const userSettings = useSelector(selectSettings);
  const dispatch = useDispatch();
  const [settings, setSettings] = React.useState<ISettings | null>(null);
  const [isSave, setIsSave] = useState<boolean>(false);

  const settingsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (settings) {
      setSettings({ ...settings, [event.target.name]: event.target.checked });
    }
  };

  const closeSettingModal = () => {
    setIsOpen(false);
  }

  const save = () => {
    setIsSave(true);
    setIsOpen(false);
  }

  useEffect(() => {
    if (userSettings) {
      setSettings({
        isTranslation: userSettings.optional.isTranslation,
        isButtons: userSettings.optional.isButtons
      });
    }
  }, [userSettings]);

  useEffect(() => {
    if (settings && isSave) {
      setIsSave(false);
      if (user) {
        dispatch(updateSettings({
          userId: user.userId,
          body: {
            optional: {
              isTranslation: settings.isTranslation,
              isButtons: settings.isButtons
            }
          },
          token: user.token
        }));
      } else {
        localStorage.setItem(`${ID_LOCALE_STORAGE}settings`, JSON.stringify({
          optional: {
            isTranslation: settings.isTranslation,
            isButtons: settings.isButtons
          }
        }));
        dispatch(setLStorageSettings({
          optional: {
            isTranslation: settings.isTranslation,
            isButtons: settings.isButtons
          }
        }));
      }
    }
  }, [isSave]);

  return (
    <Modal
      className={classes.modal}
      open={isOpen}
      onClose={closeSettingModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
          timeout: 500,
    }}
    >
      <Fade in={isOpen}>
        <div className={classes.paper}>
          <div>
            {
              settings && (
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={settings.isTranslation}
                        onChange={settingsChange}
                        name="isTranslation"
                        color="primary"
                      />
                    }
                    label="Отображать перевод"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={settings.isButtons}
                        onChange={settingsChange}
                        name="isButtons"
                        color="primary"
                      />
                    }
                    label="Отображать кнопки"
                  />
                </FormGroup>
              )
            }
          </div>
          <div>
            <Button className={classes.btn} onClick={save} variant="contained" color="primary">
                Сохранить
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>
  );
}

export default ModalSettings;
