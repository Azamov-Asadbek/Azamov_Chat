import { authConstants } from '../actions/Constants';

const initState = {
  firstName: '',
  lastName: '',
  email: '',
  men: '',
  authenticating: false,
  authenticated: false,
  error: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initState, action) => {
  // console.log(action);

  // eslint-disable-next-line default-case
  switch (action.type) {
    case `${authConstants.USER_LOGIN}_REQUEST`:
      state = {
        ...state,
        authenticating: true,
      };
      break;
    case `${authConstants.USER_LOGIN}_SUCCESS`:
      state = {
        ...state,
        ...action.payload.user,
        men: action.payload.men,
        authenticated: true,
        authenticating: false,
      };
      break;
    case `${authConstants.USER_LOGIN}_FAILURE`:
      state = {
        ...state,
        authenticated: false,
        authenticating: false,
        error: action.payload.error,
      };
      break;

    case `${authConstants.USER_LOGOUT}_REQUEST`:
      break;
    case `${authConstants.USER_LOGOUT}_SUCCESS`:
      state = {
        ...initState,
      };
      break;
    case `${authConstants.USER_LOGOUT}_FAILURE`:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;
  }
  return state;
};
