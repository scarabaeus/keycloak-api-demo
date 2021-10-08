import { SUCCESS_SUFFIX } from 'redux-axios-middleware';
import HttpService from '../services/HttpService';
import UserService from '../services/UserService';
import { ENDPOINTS } from '../constants';

const LIST_USERS = 'LIST_USERS';
const GET_USER = 'GET_USER';
const ADD_USER = 'ADD_USER';
const DELETE_USER = 'DELETE_USER';

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case LIST_USERS + SUCCESS_SUFFIX:
      return action.payload.data;

    case DELETE_USER:
      return state.filter((user) => user.id !== action.payload.user.id);

    case GET_USER + SUCCESS_SUFFIX:
      return action.payload.data;

    default:
      return state;
  }
};

export default usersReducer;

export const allUsers = () => ({
  type: LIST_USERS,
  payload: {
    request: {
      url: ENDPOINTS.USERS(),
    },
  },
});

export const getUser = async ({ userId }) => {
  const ax = HttpService.getAxiosClient();
  return ax
    .get(ENDPOINTS.USER({ userId }))
    .then((res) => {
      const { data } = res;
      return data;
    })
    .catch((err) => {});
};

export const getAssignedClientRolesForUser = async ({ userId, clientId }) => {
  const ax = HttpService.getAxiosClient();
  return ax
    .get(ENDPOINTS.CLIENT_ROLES_ASSIGNED({ userId, clientId }))
    .then((res) => {
      const { data } = res;
      return data;
    })
    .catch((err) => {});
};

export const getAvailableClientRolesForUser = async ({ userId, clientId }) => {
  const ax = HttpService.getAxiosClient();
  return ax
    .get(ENDPOINTS.CLIENT_ROLES_AVAILABLE({ userId, clientId }))
    .then((res) => {
      const { data } = res;
      return data;
    })
    .catch((err) => {});
};

export const getAssignedRealmRolesForUser = async ({ userId, clientId }) => {
  const ax = HttpService.getAxiosClient();
  return ax
    .get(ENDPOINTS.REALM_ROLES_ASSIGNED({ userId, clientId }))
    .then((res) => {
      const { data } = res;
      return data;
    })
    .catch((err) => {});
};

export const getAvailableRealmRolesForUser = async ({ userId, clientId }) => {
  const ax = HttpService.getAxiosClient();
  return ax
    .get(ENDPOINTS.REALM_ROLES_AVAILABLE({ userId, clientId }))
    .then((res) => {
      const { data } = res;
      return data;
    })
    .catch((err) => {});
};

export const getUserProfile = async ({ userId }) => {
  const ax = HttpService.getAxiosClient();
  return ax
    .get(ENDPOINTS.USER_PROFILE({ userId }))
    .then((res) => {
      const { data } = res;
      return data;
    })
    .catch((err) => {});
};

export const updateUser = async ({ userId, data }) => {
  const ax = HttpService.getAxiosClient();
  return ax
    .put(ENDPOINTS.USER({ userId }), data)
    .then((res) => {
      const { data } = res;
      return data;
    })
    .catch((err) => {});
};

export const addUser = (user) => {
  console.log(`${UserService.getUserName()} added the user ${user.username}`);
  return {
    type: ADD_USER,
    payload: {
      request: {
        url: ENDPOINTS.USERS(),
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
        url: ENDPOINTS.USER({ userId: user.id }),
        method: HttpService.HttpMethods.DELETE,
      },
    },
  };
};
