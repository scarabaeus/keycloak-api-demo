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
      url: 'http://localhost:8080/auth/admin/realms/UserManager/users',
    },
  },
});

export const addUser = (user) => {
  console.log(`${UserService.getUserName()} added the user ${user.username}`);
  return {
    type: ADD_USER,
    payload: {
      request: {
        url: 'http://localhost:8080/auth/admin/realms/UserManager/users',
        method: HttpService.HttpMethods.POST,
        data: user,
      },
    },
  };
};

export const deleteUser = (user) => {
  console.log(`${UserService.getUserName()} deletes the user ${user.username}`);
  return {
    type: DELETE_USER,
    payload: {
      user,
      request: {
        url: `http://localhost:8080/auth/admin/realms/UserManager/users/${user.id}`,
        method: HttpService.HttpMethods.DELETE,
      },
    },
  };
};
