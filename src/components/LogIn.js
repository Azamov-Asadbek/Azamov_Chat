import {
  Card,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useEffect } from 'react';

import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { isLoggedInUser, signin } from '../actions/auth.actions';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShow, setPasswordShow] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticated) {
      dispatch(isLoggedInUser());
    }
  }, [auth.authenticated, dispatch]);

  const userLogin = (e) => {
    e.preventDefault();
    dispatch(signin({ email, password }));
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
          data-aos="fade-up"
          className="mx-4 mx-md-2 bg-transparent text-center card_input"
        >
          <form onSubmit={userLogin}>
            <Typography variant="h5">WebChatga kirish</Typography>
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
              type={passwordShow ? 'text' : 'password'}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              required
            />

            <IconButton
              className="glasses"
              onClick={() => setPasswordShow(!passwordShow)}
            >
              {passwordShow ? <MdVisibility /> : <MdVisibilityOff />}
            </IconButton>

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

export default LogIn;
