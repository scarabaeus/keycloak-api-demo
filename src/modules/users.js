import { SUCCESS_SUFFIX } from 'redux-axios-middleware';
import HttpService from '../services/HttpService';
import UserService from '../services/UserService';

const LIST_USERS = 'LIST_USERS';
const ADD_USER = 'ADD_USER';
const DELETE_USER = 'DELETE_USER';

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case LIST_USERS + SUCCESS_SUFFIX:
      return action.payload.data;

    case DELETE_USER:
      return state.filter((user) => user.id !== action.payload.user.id);

    default:
      return state;
  }
};

export default usersReducer;

export const allUsers = () => ({
  type: LIST_USERS,
  payload: {
    request: {
      url: '/demo/users',
    },
  },
});

export const addUser = (user) => {
  console.log(`${UserService.getUsername()} added the user ${user.title}`);
  return {
    type: ADD_USER,
    payload: {
      request: {
        url: '/demo/users',
        method: HttpService.HttpMethods.POST,
        data: user,
      },
    },
  };
};

export const deleteUser = (user) => {
  console.log(`${UserService.getUsername()} deletes the user ${user.title}`);
  return {
    type: DELETE_USER,
    payload: {
      user,
      request: {
        url: `/demo/users/${user.id}`,
        method: HttpService.HttpMethods.DELETE,
      },
    },
  };
};
