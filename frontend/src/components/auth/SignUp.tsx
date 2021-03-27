import { Box, Button, createStyles, IconButton, InputAdornment, makeStyles, TextField, Theme } from '@material-ui/core';
import { Redirect, useHistory } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ICreds, IUser, IUserResponse, login, logup } from '../../services/authorisation.service';
import { selectUser, signedUser } from '../../slices/userSlice';
import PageLayout from '../PageLayout'
import { CLOUD_NAME, CLOUD_URL, DEFAULT_AVATAR } from '../../utils/constants';
import uploadImage from '../../utils/uploadImage';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      justifyContent: 'center',
      display: 'flex',
      width: '100%',
      paddingBottom: '7rem'
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',

      '& > *': {
        margin: theme.spacing(1, 0),
        width: '20rem',
      },
    },
    formControlRoot: {
      height: '3rem'
    },
    button: {
      width: '100%',
    },
    defaultRecord: {
      textAlign: 'center'
    },
    photoLable: {
      display: 'flex',
      justifyContent: 'center',
      cursor: 'pointer'
    },
    imagePreviewContainer: {
      height: 150,
      width: 150,
      borderRadius: '50%',
      backgroundSize: 'cover',
    },
    imagePreview: {
      height: 150,
      width: 150,
      borderRadius: '50%',
      objectFit: 'cover',
    }
  }),
);

const SignUp: React.FC = () => {
  const classes = useStyles();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  let history = useHistory();
  const inputFile = useRef<HTMLInputElement>(null);


  const [newUser, setNewUser] = useState<IUser>({ name: '', email: '', imageId: '',password: '' });
  const [imageObj, setImageObj] = useState<File | null>(null);
  const [showPswd, setShowPswd] = useState<boolean>(false);
  const [errors, setErrors] = useState<IUser>({ name: '', email: '', password: '' });
  const [imageUrl, setImageUrl] = useState<string>(`url('${CLOUD_URL}/${CLOUD_NAME}/${DEFAULT_AVATAR}')`);



//   const uploadImage = async (file: any, formData: FormData) => {
//     let imageId: string ='travelApp/avatar_ltzdkha';

//     if (file) {
//       const upload_preset: string = 'ujwcmlol';
//       formData.append("file", file);
//       formData.append("upload_preset", upload_preset);
//       const data = await requestToCloudinary(formData);
//       imageId = data.public_id;
//     }

//     return imageId;
// }




  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setNewUser({ ...newUser, name });
  }

  function handlePhotoSelection(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files || !event.target.files[0]) { return; }

    const fileObj = event.target.files && event.target.files[0];
    setImageObj(fileObj);

    const imageContainer = document.getElementById('imageContainer');
    const imagePreview = document.getElementById('imagePreview');

    if (imagePreview && imageContainer) {
      imageContainer.removeChild(imagePreview);
    }

    const img = document.createElement("img");
    img.src = URL.createObjectURL(fileObj);
    img.height = 200;
    img.id = 'imagePreview'
    img.className = classes.imagePreview
    img.onload = () => {
      URL.revokeObjectURL(img.src);
    }
    imageContainer?.appendChild(img)
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    setNewUser({ ...newUser, email });
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    setNewUser({ ...newUser, password });
  }

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (isFormValid()) {
      // set loader

      const formData = new FormData();

      const imageId: string = imageObj ? await uploadImage(imageObj, formData) : DEFAULT_AVATAR;

      const response = await logup({ ...newUser, imageId });
      if (response.status >= 400) {
        alert(await response.text())
      } else {
        const userResponse: IUserResponse = await response.json();

        // dispatch(signedUser(userResponse));
        // history.push('/');
      }
    }
  }

  const isFormValid = () => {
      setErrors({
        name: newUser.name.length ? '' : 'Обязательное поле',
        email: newUser.email.length ? '' : 'Обязательное поле',
        password: newUser.password.length ? '' : 'Обязательное поле'
      });
    return newUser.name.length && newUser.email.length && newUser.password.length
  }

  const handleFocus = (field: 'name' | 'email' | 'password') => {
    switch (field) {
      case 'name':
        setErrors({ ...errors, email: ''});
        break;
      case 'email':
        setErrors({ ...errors, email: ''});
        break;
      case 'password':
        setErrors({ ...errors, password: ''});
        break;
    }
  }

  const handleClickShowPassword = () => {
    setShowPswd(!showPswd);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <PageLayout>
      <div className={classes.wrapper}>
        <form className={classes.root} noValidate autoComplete="off">
          <label className={classes.photoLable}>
            <Box
              className={classes.imagePreviewContainer}
              style={{
                backgroundImage: imageUrl,
              }}
              id="imageContainer"
            >
            <input
              style={{ display: "none" }}
              ref={inputFile}
              type="file"
              accept="image/*"
              onChange={handlePhotoSelection}
            />

            </Box>
          </label>

          <TextField
            className={classes.formControlRoot}
            onChange={handleNameChange}
            onFocus={() => handleFocus("name")}
            value={newUser.name}
            required
            label="Имя пользователя"
            InputLabelProps={{
              style: {
                color: "primary",
              },
            }}
            error={!!errors.name}
            helperText={errors.name}
            variant="outlined"
            size="small"
          />
          <TextField
            className={classes.formControlRoot}
            onChange={handleEmailChange}
            onFocus={() => handleFocus("email")}
            value={newUser.email}
            required
            label="Email"
            InputLabelProps={{
              style: {
                color: "primary",
              },
            }}
            error={!!errors.email}
            helperText={errors.email}
            variant="outlined"
            size="small"
          />
          <TextField
            className={classes.formControlRoot}
            variant="outlined"
            size="small"
            type={showPswd ? "text" : "password"}
            value={newUser.password}
            required
            label="Пароль"
            error={!!errors.password}
            helperText={errors.password}
            onChange={handlePasswordChange}
            onFocus={() => handleFocus("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPswd ? (
                      <Visibility color="primary" />
                    ) : (
                      <VisibilityOff color="primary" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            className={classes.button}
            type="submit"
            color="primary"
            variant="contained"
            onClick={handleSubmit}
          >
            Регистрация
          </Button>
        </form>
      </div>
    </PageLayout>
  );
}

export default SignUp;
