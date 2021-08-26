import { Avatar, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../actions/auth.actions';
import AzamovLogo from '../assets/logos/A_logo.png';
const Header = () => {
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  return (
    <Navbar
      data-aos="fade-down"
      variant="dark"
      className="rounded navbar_chat"
      expand="lg"
    >
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/" className="AzamovBrand">
          <img src={AzamovLogo} alt="Azamov Logo" />
          WebChat
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={auth.authenticated ? 'm-auto' : 'ms-auto'}>
            {auth.authenticated ? (
              <>
                <Nav.Link className="mx-2" as={NavLink} to="/">
                  Xabarlar
                </Nav.Link>
                <Nav.Link className="mx-2" as={NavLink} to="/comments">
                  Sharhlar va fikrlar
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    dispatch(logout(auth.uid));
                  }}
                  className="mx-2"
                >
                  Chiqish
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link
                  className=" rounded btn btn-outline-primary my-lg-1 mt-3 mx-2 px-5"
                  as={NavLink}
                  to="/login"
                >
                  Kirish
                </Nav.Link>
                <Nav.Link
                  className=" rounded btn btn-outline-primary my-lg-1 mt-3 mb-2  mx-2 px-5"
                  as={NavLink}
                  to="/signin"
                >
                  Ro'yhatdan o'tish
                </Nav.Link>
              </>
            )}
          </Nav>
          {auth.authenticated ? (
            <Nav className="mr-3">
              <Nav.Link>
                <Grid
                  container
                  justifyContent="flex-end"
                  alignItems="center"
                  spacing={1}
                  className="chats__myInfo"
                >
                  <Grid item>
                    <Avatar
                      src={auth.men}
                      alt={`${auth.firstName}ning rasmi`}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">{`${auth.firstName} ${auth.lastName}`}</Typography>
                  </Grid>
                </Grid>
              </Nav.Link>
            </Nav>
          ) : null}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
