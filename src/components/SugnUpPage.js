import { Card, Grid, TextField, Typography } from '@material-ui/core';
import { storage } from 'firebase';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signup } from '../actions/auth.actions';
import AccountImgTrue from '../assets/logos/downloadImage.png';

const SugnUpPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rasm, setRasm] = useState('');
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const RegisterUser = (e) => {
    e.preventDefault();

    const user = {
      firstName,
      lastName,
      email,
      rasm,
      password,
    };
    dispatch(signup(user));
  };
  const ChangeImage = async (e) => {
    const file = e.target.files[0];
    const storageRef = storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setRasm(await fileRef.getDownloadURL());
  };

  if (auth.authenticated) {
    return <Redirect to={`/`} />;
  }
  return (
    <Grid item xs={12}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        item
        className="logInPage rounded"
      >
        <Card
          data-aos="fade-left"
          className="mx-4 mx-md-2 bg-transparent text-center card_input"
        >
          <form onSubmit={RegisterUser}>
            <Typography variant="h5">Ro'yhatdan o'tish</Typography>
            <div className="user-photo mb-2 py-2 justify-content-md-around ">
              <img
                src={!rasm ? AccountImgTrue : rasm}
                alt="Shaxsiy rasm"
                className="me-3"
              />
              <label
                onChange={ChangeImage}
                className="user-photo__input me-md-2"
              >
                <input type="file" accept="image/*" />
                Rasmingizni yuklang
              </label>
            </div>

            <TextField
              label="Ismingizni kiriting!"
              fullWidth
              variant="filled"
              className="input-forms mb-2"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              name="firstName"
              required
            />

            <TextField
              label="Familiyangizni kiriting!"
              fullWidth
              variant="filled"
              className="input-forms mb-2"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              name="lastName"
              required
            />

            <TextField
              label="Emailingizni kiriting!"
              fullWidth
              variant="filled"
              className="input-forms mb-2"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              required
            />

            <TextField
              label="Parolingizni kiriting!"
              fullWidth
              variant="filled"
              className="input-forms mb-2"
              type="text"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              required
            />

            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary">
                Kirish
              </button>
            </div>
          </form>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SugnUpPage;
