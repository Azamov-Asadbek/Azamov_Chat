import { userConstants } from '../actions/Constants';

const initState = {
  users: [],
  xabarlar: [],
  groupXabarlar: [],
  error: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    // eslint-disable-next-line no-undef
    case `${userConstants.GET_REALTIME_USERS}_REQUEST`:
      break;
    // eslint-disable-next-line no-undef
    case `${userConstants.GET_REALTIME_USERS}_SUCCESS`:
      state = {
        ...state,
        users: action.payload.users,
      };
      break;
    case `${userConstants.GET_REALTIME_CHAT_MESSAGE}_SUCCESS`:
      state = {
        ...state,
        xabarlar: action.payload.xabarlar,
      };
      break;
    case `${userConstants.GET_REALTIME_CHAT_MESSAGE}_FAILURE`:
      state = {
        ...state,
        xabarlar: [],
      };
      break;

    case `${userConstants.GET_REALTIME_GROUP_MESSAGE}_SUCCESS`:
      state = {
        ...state,
        groupXabarlar: action.payload.groupXabarlar,
      };
      break;
  }

  return state;
};
