import { firestore } from 'firebase';
import { userConstants } from './Constants';

export const getRealtimeUsers = (uid) => {
  return async (dispatch) => {
    const db = firestore();
    dispatch({ type: `${userConstants.GET_REALTIME_USERS}_REQUEST` });
    const unsubscribe = db.collection('users').onSnapshot((querySnapshot) => {
      const users = [];
      querySnapshot.forEach(function (doc) {
        if (doc.data().uid !== uid) {
          users.push(doc.data());
        }
      });
      dispatch({
        type: `${userConstants.GET_REALTIME_USERS}_SUCCESS`,
        payload: { users },
      });
    });
    return unsubscribe;
  };
};

export const UpdateMassage = (msgObj) => {
  return async (dispatch) => {
    const db = firestore();
    db.collection('xabar')
      .add({
        ...msgObj,
        isView: false,
        createdAt: new Date(),
      })
      .then((data) => {
        // console.log(data);
      })
      .catch((error) => console.log(error));
  };
};

export const UpdateGroupMassage = (msgObj) => {
  return async (dispatch) => {
    const db = firestore();
    db.collection('GroupXabar')
      .add({
        ...msgObj,
        isView: false,
        createdAt: new Date(),
      })
      .then((data) => {
        // console.log(data);

        db.collection('GroupXabar')
          .orderBy('createdAt')
          .onSnapshot((querySnapshot) => {
            const groupXabarlar = [];
            querySnapshot.forEach(function (doc) {
              groupXabarlar.push(doc.data());

              dispatch({
                type: `${userConstants.GET_REALTIME_GROUP_MESSAGE}_SUCCESS`,
                payload: { groupXabarlar },
              });
            });
            // console.log(groupXabarlar);
          });
      })
      .catch((error) => console.log(error));
  };
};

export const GetRealGroupXabar = () => {
  return async (dispatch) => {
    const db = firestore();
    db.collection('GroupXabar')
      .orderBy('createdAt')
      .onSnapshot((querySnapshot) => {
        const groupXabarlar = [];
        querySnapshot.forEach(function (doc) {
          groupXabarlar.push(doc.data());

          dispatch({
            type: `${userConstants.GET_REALTIME_GROUP_MESSAGE}_SUCCESS`,
            payload: { groupXabarlar },
          });
        });
        // console.log(groupXabarlar);
      });
  };
};

export const GetRealXabar = (user) => {
  return async (dispatch) => {
    const db = firestore();
    db.collection('xabar')
      .where('user_uid_1', 'in', [user.uid_1, user.uid_2])
      .orderBy('createdAt', 'asc')
      .onSnapshot((querySnapshot) => {
        const xabarlar = [];
        querySnapshot.forEach(function (doc) {
          if (
            (doc.data().user_uid_1 === user.uid_1 &&
              doc.data().user_uid_2 === user.uid_2) ||
            (doc.data().user_uid_1 === user.uid_2 &&
              doc.data().user_uid_2 === user.uid_1)
          ) {
            xabarlar.push(doc.data());
          }

          if (xabarlar.length > 0) {
            dispatch({
              type: `${userConstants.GET_REALTIME_CHAT_MESSAGE}_SUCCESS`,
              payload: { xabarlar },
            });
          } else {
            dispatch({
              type: `${userConstants.GET_REALTIME_CHAT_MESSAGE}_FAILURE`,
              payload: { xabarlar },
            });
          }
        });
        // console.log(xabarlar);
      });
  };
};
