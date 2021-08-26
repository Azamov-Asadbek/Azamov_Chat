import { Container, Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import LogIn from './components/LogIn';
import SignUpPage from './components/SugnUpPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Chats';
import PrivateRoute from './components/PrivateRoute';
import { isLoggedInUser } from './actions/auth.actions';
import { useDispatch, useSelector } from 'react-redux';
import Comments from './components/Comments';

import Aos from 'aos';
import 'aos/dist/aos.css';

const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticated) {
      dispatch(isLoggedInUser());
    }
  }, [auth.authenticated, dispatch]);

  useEffect(() => {
    Aos.init({ duration: 1500, once: true });
  }, []);
  return (
    <Container>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        className="gridContainer"
      >
        <Grid
          item
          container
          direction="row"
          justifyContent="center"
          spacing={2}
          xs={12}
          className="AzamovChat rounded"
        >
          <Router>
            <Grid item xs={12}>
              <Header />
            </Grid>

            <Grid
              item
              container
              direction="row"
              justifyContent="space-around"
              xs={12}
              data-aos="fade-up"
            >
              <Grid className="position-relative" item container xs spacing={2}>
                <PrivateRoute path="/" exact component={Home} />
                <PrivateRoute path="/comments" component={Comments} />
                <Route path="/login" component={LogIn} />
                <Route path="/signin" component={SignUpPage} />
              </Grid>
            </Grid>
          </Router>
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
