import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED } from '../actions/login';
import { SET_POSSIBLE_EMAIL } from '../actions/login';

import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
} from '../actions/register';

import {
  SEND_EMAIL_FOR_PASSWORD_REQUEST,
  SEND_EMAIL_FOR_PASSWORD_SUCCESS,
  SEND_EMAIL_FOR_PASSWORD_FAILED,
} from '../actions/checking-mail';

import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
} from '../actions/reset-password';

import {
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
} from '../actions/login';

import {
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_FAILED,
} from '../actions/login';

import {
  CHANGE_USER_DATA_REQUEST,
  CHANGE_USER_DATA_SUCCESS,
  CHANGE_USER_DATA_FAILED,
} from '../actions/login';

import { SET_LOCATION } from '../actions/login';
import { setCookie, deleteCookie } from '../../utils/cookie';

const authInitialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  possibleEmail: '',

  prevLocation: '/',
  emailExists: false,

  isAuth: false,
  loader: false,
  fail: false,
};

export const authReducer = (state = authInitialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        loader: true,
        fail: false,
      };
    }
    case LOGIN_SUCCESS: {
      setCookie('accessToken', action.accessToken.split('Bearer ')[1]);
      localStorage.setItem('refreshToken', action.refreshToken);
      return {
        ...state,
        loader: false,
        isAuth: true,
        user: action.user,
        refreshToken: action.refreshToken,
        accessToken: action.accessToken.split('Bearer ')[1],
        possibleEmail: null,
        fail: false,
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        fail: true,
        isAuth: false,
        loader: false,
      };
    }
    case REGISTER_REQUEST: {
      return {
        ...state,
        loader: true,
        fail: false,
      };
    }
    case REGISTER_SUCCESS: {
      setCookie('accessToken', action.accessToken.split('Bearer ')[1]);
      localStorage.setItem('refreshToken', action.refreshToken);
      return {
        ...state,
        loader: false,
        user: action.user,
        refreshToken: action.refreshToken,
        accessToken: action.accessToken.split('Bearer ')[1],
        isAuth: true,
        fail: false,
      };
    }
    case REGISTER_FAILED: {
      return {
        ...state,
        fail: true,
        isAuth: false,
        loader: false,
      };
    }
    case SET_POSSIBLE_EMAIL: {
      return {
        ...state,
        possibleEmail: String(action.possibleEmail),
      };
    }
    case GET_USER_DATA_REQUEST: {
      return {
        ...state,
        loader: true,
        fail: false,
      };
    }
    case GET_USER_DATA_SUCCESS: {
      return {
        ...state,
        loader: false,
        fail: false,
        user: action.user,
        isAuth: true,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
      };
    }
    case GET_USER_DATA_FAILED: {
      return {
        ...state,
        loader: false,
        fail: true,
      };
    }
    case CHANGE_USER_DATA_REQUEST: {
      return {
        ...state,
        loader: true,
        fail: false,
      };
    }
    case CHANGE_USER_DATA_SUCCESS: {
      return {
        ...state,
        loader: false,
        fail: false,
        user: action.user,
      };
    }
    case CHANGE_USER_DATA_FAILED: {
      return {
        ...state,
        loader: false,
        fail: true,
      };
    }
    case SEND_EMAIL_FOR_PASSWORD_REQUEST: {
      return {
        ...state,
        loader: true,
        fail: false,
      };
    }
    case SEND_EMAIL_FOR_PASSWORD_SUCCESS: {
      return {
        ...state,
        loader: false,
        emailExists: true,
        fail: false,
      };
    }
    case SEND_EMAIL_FOR_PASSWORD_FAILED: {
      return {
        ...state,
        fail: true,
        loader: false,
      };
    }
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        loader: true,
        fail: false,
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        loader: false,
        fail: false,
      };
    }
    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        fail: true,
        loader: false,
      };
    }
    case LOGOUT_REQUEST: {
      return {
        ...state,
        loader: true,
        fail: false,
      };
    }
    case LOGOUT_SUCCESS: {
      deleteCookie('accessToken');
      return {
        ...state,
        loader: false,
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuth: false,
        fail: false,
      };
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        fail: true,
        loader: false,
      };
    }
    case SET_LOCATION: {
      return {
        ...state,
        prevLocation: action.prevLocation,
      };
    }
    default: {
      return state;
    }
  }
};
