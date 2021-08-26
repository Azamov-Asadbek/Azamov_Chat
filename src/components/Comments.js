import {
  Avatar,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { IoSendSharp } from 'react-icons/io5';
import { UpdateGroupMassage } from '../actions';
const Comments = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [message, setMessage] = useState('');
  const user = useSelector((state) => state.user);

  const SendGroupMassage = (e) => {
    e.preventDefault();

    const msgObj = {
      userName: `${auth.firstName} ${auth.lastName}`,
      userId: auth.uid,
      userPhoto: auth.userPhoto,
      message,
    };

    if (message !== '') {
      dispatch(UpdateGroupMassage(msgObj)).then(() => {
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
        <Grid data-aos="zoom-out-down" item container className="chatsBox">
          <Grid item xs={12}>
            <div className="chats__messages ">
              <Grid
                className="chats__messages__person"
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <Typography className="ms-4" variant="subtitle1">
                  {user.groupXabarlar.length > 0
                    ? `${auth.firstName} ${auth.lastName}  nomi orqali xabar qoldirish`
                    : `Assalomu alaykum. Biror sharh qoldirsangiz oldingi malumotlarni o'qishingiz mumkin!`}
                </Typography>
              </Grid>

              <div className="chats__messages__box">
                {user.groupXabarlar.map((message, index) =>
                  message.userId === auth.uid ? (
                    <Grid
                      key={index}
                      className="message imp"
                      container
                      direction="row-reverse"
                      alignItems="center"
                      justifyContent="flex-start"
                      spacing={3}
                    >
                      <Grid item className="text-center">
                        <Avatar
                          className="mx-auto"
                          src={message.userPhoto}
                          alt={`${message.userName}ning rasmi`}
                        />
                        <Typography color="textSecondary" variant="overline">
                          {timeConverter(message.createdAt)}
                        </Typography>
                      </Grid>
                      <Grid item className="imp__box">
                        <Typography
                          className="exp__account text-start"
                          variant="body2"
                        >
                          {message.userName}
                        </Typography>
                        <Typography variant="body1">
                          {message.message}
                        </Typography>
                        <div className="corner"></div>
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
                      <Grid item className="text-center">
                        <Avatar
                          className="mx-auto"
                          src={message.userPhoto}
                          alt={`${message.userName}ning rasmi`}
                        />
                        <Typography color="textSecondary" variant="overline">
                          {timeConverter(message.createdAt)}
                        </Typography>
                      </Grid>
                      <Grid item className="exp__box">
                        <Typography
                          className="exp__account text-start"
                          variant="body2"
                        >
                          {message.userName}
                        </Typography>
                        <Typography variant="body1">
                          {message.message}
                        </Typography>
                        <div className="corner"></div>
                      </Grid>
                    </Grid>
                  )
                )}
              </div>

              <div className="chats__messages__input">
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
                    onClick={SendGroupMassage}
                  >
                    <IoSendSharp />
                  </IconButton>
                </Paper>
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Comments;
