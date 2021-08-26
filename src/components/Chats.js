import {
  Avatar,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
  InputBase,
  Paper,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import {
  IoSearchOutline,
  IoSendSharp,
  IoCloseCircleOutline,
} from 'react-icons/io5';
import { getRealtimeUsers, GetRealXabar, UpdateMassage } from '../actions';
import AutorSite from '../assets/img/AsadbekAzamov.JPG';

const UserAcc = ({ user, onClick, boxShow }) => {
  return (
    <div onClick={boxShow}>
      <ListItem onClick={() => onClick(user)} button>
        <ListItemAvatar className="ms-2 ">
          <Avatar
            className="avatarUser"
            src={user.userPhoto}
            alt={`${user.firstName}ning rasmi`}
          />
        </ListItemAvatar>
        <ListItemText
          primary={`${user.firstName} ${user.lastName}`}
          secondary={user.isOnline ? 'Hozirda Online' : `Offline`}
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </div>
  );
};

const MyProfil = ({ rasm, ism }) => {
  return (
    <Grid
      className="catbox"
      container
      direction="row"
      alignItems="center"
      spacing={2}
      justifyContent="center"
    >
      <Grid xs={12} item>
        <Avatar
          className="myAva  mb-3 text-center mx-auto"
          src={rasm}
          alt={`User`}
        />
      </Grid>
      <Grid xs={12} className="opacityName text-center mx-auto" item>
        <h3 className="text-center">{ism}</h3>
        <Typography variant="body1">
          Kerakli chatni tanlab suhbatni boshlashingiz mumkin!
        </Typography>
      </Grid>
    </Grid>
  );
};

const Autor = () => {
  return (
    <>
      <Grid xs={12} item className="text-center">
        <Avatar
          className="avatarUser  mx-auto mb-2"
          src={AutorSite}
          alt={`Asadbek Azamovning rasmi`}
        />
      </Grid>
      <Grid className="text-center mb-3" item>
        <Typography variant="subtitle2">Sayt yaratuvchisi: </Typography>
        <Typography variant="h6">Asadbek Azamov</Typography>
      </Grid>
      <Grid className="text-center px-2" item>
        <Typography variant="body2">
          Savol va takliflaringiz bo'lsa &nbsp;
          <Link to="/comments">Sharhlar va fikrlar</Link> bo'limiga
          qoldirishingiz mumkin.
        </Typography>
      </Grid>
    </>
  );
};

const Chats = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  let unsubscribe;

  const [chatStarted, setChatStarted] = useState(false);
  const [chatUser, setChatUser] = useState('');
  const [InfoChatUser, setInfoChatUser] = useState('');
  const [clicked, setClicked] = useState(false);
  const [clickedInfo, setClickedInfo] = useState(false);
  const [message, setMessage] = useState('');
  const [userUid, setUserUid] = useState(null);
  useEffect(() => {
    if (!auth.authenticated) {
      return <Redirect to={`/login`} />;
    }
  }, [auth.authenticated]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    unsubscribe = dispatch(getRealtimeUsers(auth.uid))
      .then((unsubscribe) => {
        return unsubscribe;
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    return () => {
      unsubscribe.then((f) => f()).catch((error) => console.log(error));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unsubscribe]);

  const initChat = (user) => {
    setChatStarted(true);
    setChatUser(`${user.firstName} ${user.lastName}`);
    setInfoChatUser(user);
    setUserUid(user.uid);
    dispatch(
      GetRealXabar({
        uid_1: auth.uid,
        uid_2: user.uid,
      })
    );
  };

  const showChat = () => {
    setClicked(!clicked);
  };
  const showChatInfo = () => {
    setClickedInfo(!clickedInfo);
  };

  const SendMassage = (e) => {
    e.preventDefault();

    const msgObj = {
      user_uid_1: auth.uid,
      user_uid_2: userUid,
      message,
    };

    if (message !== '') {
      dispatch(UpdateMassage(msgObj)).then(() => {
        setMessage('');
      });
    }
  };

  const timeConverter = (x) => {
    const a = new Date(x * 1000);
    const months = [
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12',
    ];
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    const time = `${date}.${month}|${hour}:${min}`;
    return time;
  };

  if (!auth.authenticated) {
    return <Redirect to={`/login`} />;
  }
  return (
    <>
      <Grid item xs={12}>
        <Grid container className="chatsBox">
          <Grid item xs={12} sm={3}>
            <div className="users  py-3 pt-4 ">
              <div className="users__search mx-4 px-2">
                <TextField
                  label="Qidiruv"
                  fullWidth
                  className="input-forms mb-2"
                  type="search"
                  name="search"
                />
                <IoSearchOutline className="users__search__searchIcon" />
              </div>

              <List className="users__user mt-1 ms-2 me-4">
                {user.users.length > 0 ? (
                  user.users.map((user) => (
                    <UserAcc
                      key={user.uid}
                      boxShow={showChat}
                      onClick={initChat}
                      user={user}
                    />
                  ))
                ) : (
                  <Typography className="text-center" variant="body1">
                    Online foydalanuvchi yo'q!
                  </Typography>
                )}
              </List>
            </div>
          </Grid>

          <Grid
            className={
              !clicked ? 'mobile_chats' : 'mobile_chats show_mobile_chats '
            }
            item
            xs={12}
            sm={7}
          >
            <div className="chats__messages ">
              <IconButton onClick={showChat} className="close">
                <IoCloseCircleOutline />
              </IconButton>
              <Grid
                className="chats__messages__person"
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <Typography
                  onClick={showChatInfo}
                  className="ms-4"
                  variant="subtitle1"
                >
                  {chatStarted
                    ? chatUser
                    : `${auth.firstName} Chatga xush kelibsiz!`}
                </Typography>
              </Grid>

              <div className="chats__messages__box">
                {chatStarted ? (
                  user.xabarlar.map((xabar, index) =>
                    xabar.user_uid_1 === auth.uid ? (
                      <Grid
                        key={index}
                        className="message imp"
                        container
                        direction="row-reverse"
                        alignItems="center"
                        justifyContent="flex-start"
                        spacing={3}
                      >
                        <Grid item className="imp__box">
                          <Typography
                            className="exp__account text-start"
                            variant="body2"
                          >
                            {`${auth.firstName} ${auth.lastName}`}
                          </Typography>
                          <Typography variant="body1">
                            {xabar.message}
                          </Typography>
                          <div className="corner"></div>

                          <Typography
                            color="textSecondary"
                            component="span"
                            className="smallerTime"
                          >
                            {timeConverter(xabar.createdAt)}
                          </Typography>
                        </Grid>
                      </Grid>
                    ) : (
                      <Grid
                        key={index}
                        className="message exp"
                        container
                        direction="row"
                        alignItems="center"
                        spacing={3}
                        justifyContent="flex-start"
                      >
                        <Grid item className="exp__box">
                          <Typography
                            className="exp__account text-start"
                            variant="body2"
                          >
                            {chatUser}
                          </Typography>
                          <Typography variant="body1">
                            {xabar.message}
                          </Typography>
                          <div className="corner"></div>

                          <Typography
                            color="textSecondary"
                            component="span"
                            className="smallerTime"
                          >
                            {timeConverter(xabar.createdAt)}
                          </Typography>
                        </Grid>
                      </Grid>
                    )
                  )
                ) : (
                  <MyProfil
                    rasm={auth.men}
                    ism={`${auth.firstName} ${auth.lastName}`}
                  />
                )}
              </div>

              <div className="chats__messages__input">
                {chatStarted ? (
                  <Paper className="inp" component="form">
                    <InputBase
                      className="inpBase ms-3 me-2"
                      placeholder="Xabar matnini kiriting"
                      inputProps={{ 'aria-label': 'Xabar matnini kiriting' }}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />

                    <Divider className="line" orientation="vertical" />
                    <IconButton
                      className="iconBtn"
                      color="primary"
                      type="submit"
                      aria-label="directions"
                      onClick={SendMassage}
                    >
                      <IoSendSharp />
                    </IconButton>
                  </Paper>
                ) : null}
              </div>
            </div>
          </Grid>

          <Grid
            className={
              !clickedInfo ? 'mobile_chats' : 'mobile_chats show_mobile_chats '
            }
            item
            xs={12}
            sm={2}
          >
            <div className="infoFriend  ">
              <IconButton onClick={showChatInfo} className="close">
                <IoCloseCircleOutline />
              </IconButton>
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="center"
                className="mb-4"
              >
                {chatStarted ? (
                  <>
                    <Grid xs={12} item className="text-center">
                      <Avatar
                        className="avatarUser mx-auto mb-3"
                        src={InfoChatUser.userPhoto}
                        alt={`${InfoChatUser.firstName}ning rasmi`}
                      />
                    </Grid>

                    <Grid xs={12} className="text-center" item>
                      <Typography variant="subtitle1">{`${InfoChatUser.firstName} ${InfoChatUser.lastName} `}</Typography>
                    </Grid>
                  </>
                ) : (
                  <Autor />
                )}
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Chats;
