import { auth, firestore } from 'firebase';
import { authConstants } from './Constants';

export const signup = (user) => {
  return async (dispatch) => {
    const db = firestore();

    const userPic = user.rasm;
    dispatch({ type: `${authConstants.USER_LOGIN}_REQUEST` });

    auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        console.log(data);
        const currentUser = auth().currentUser;

        const userProfilName = `${user.firstName}  ${user.lastName}`;
        currentUser
          .updateProfile({
            displayName: userProfilName,
            photoURL: `${userPic}`,
          })
          .then(() => {
            db.collection('users').doc(data.user.uid).set({
              firstName: user.firstName,
              lastName: user.lastName,
              uid: data.user.uid,
              createdAt: new Date(),
              userPhoto: data.user.photoURL,
              isOnline: true,
            });
          })
          .then(() => {
            const loggedInUser = {
              firstName: user.firstName,
              lastName: user.lastName,
              uid: data.user.uid,
              email: user.email,
              userPhoto: data.user.photoURL,
            };
            localStorage.setItem('user', JSON.stringify(loggedInUser));
            console.log('Muvaffaqqiyatli kirildi......!');
            dispatch({
              type: `${authConstants.USER_LOGIN}_SUCCESS`,
              payload: { user: loggedInUser },
            });
          })
          .catch((error) => {
            console.log(error);
            dispatch({
              type: `${authConstants.USER_LOGIN}_FAILURE`,
              payload: { error },
            });
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const signin = (user) => {
  return async (dispatch) => {
    dispatch({ type: `${authConstants.USER_LOGIN}_REQUEST` });
    auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        const db = firestore();
        db.collection('users')
          .doc(data.user.uid)
          .update({
            isOnline: true,
          })
          .then(() => {
            const name = data.user.displayName.split(' ');

            const firstName = name[0];
            const lastName = name[name.length - 1];

            const loggedInUser = {
              firstName,
              lastName,
              uid: data.user.uid,
              email: data.user.email,
              userPhoto: data.user.photoURL,
            };

            localStorage.setItem('user', JSON.stringify(loggedInUser));

            dispatch({
              type: `${authConstants.USER_LOGIN}_SUCCESS`,
              payload: { user: loggedInUser },
            });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: `${authConstants.USER_LOGIN}_FAILURE`,
          payload: { error },
        });
      });
  };
};

export const isLoggedInUser = () => {
  return async (dispatch) => {
    const db = firestore();

    const user = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null;

    if (user) {
      db.collection('users').onSnapshot((querySnapshot) => {
        const odamlar = [];
        querySnapshot.forEach(function (doc) {
          odamlar.push(doc.data());

          odamlar.forEach(function (odam) {
            if (odam.uid === user.uid) {
              const men = odam.userPhoto;
              dispatch({
                type: `${authConstants.USER_LOGIN}_SUCCESS`,
                payload: { men },
              });
            }
          });
        });
      });
      dispatch({
        type: `${authConstants.USER_LOGIN}_SUCCESS`,
        payload: { user },
      });
    } else {
      dispatch({
        type: `${authConstants.USER_LOGIN}_FAILURES`,
        payload: { error: "Qayta kiritib ko'ring" },
      });
    }
  };
};

export const logout = (uid) => {
  return async (dispatch) => {
    dispatch({ type: `${authConstants.USER_LOGOUT}_REQUEST` });

    const db = firestore();
    db.collection('users')
      .doc(uid)
      .update({
        isOnline: false,
      })
      .then(() => {
        auth()
          .signOut()
          .then(() => {
            localStorage.clear();
            dispatch({
              type: `${authConstants.USER_LOGOUT}_SUCCESS`,
            });
          })
          .catch((error) => {
            console.log(error);
            dispatch({
              type: `${authConstants.USER_LOGOUT}_FAILURE`,
              payload: { error },
            });
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
