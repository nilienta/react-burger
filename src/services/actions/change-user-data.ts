import { getData } from '../../utils/burger-api';
import { TAuthActions } from '../types/types-auth';
import { Dispatch } from 'react';
import { BASE_URL } from './app';

export const CHANGE_USER_DATA_REQUEST: 'CHANGE_USER_DATA_REQUEST' =
  'CHANGE_USER_DATA_REQUEST';
export const CHANGE_USER_DATA_SUCCESS: 'CHANGE_USER_DATA_SUCCESS' =
  'CHANGE_USER_DATA_SUCCESS';
export const CHANGE_USER_DATA_FAILED: 'CHANGE_USER_DATA_FAILED' =
  'CHANGE_USER_DATA_FAILED';

export interface IChangeUserDataRequestAction {
  readonly type: typeof CHANGE_USER_DATA_REQUEST;
}
export interface IChangeUserDataSuccessAction {
  readonly type: typeof CHANGE_USER_DATA_SUCCESS;
  readonly user: { name: string; email: string };
}
export interface IChangeUserDataFailedAction {
  readonly type: typeof CHANGE_USER_DATA_FAILED;
}

export type TChangeUserDataActions =
  | IChangeUserDataRequestAction
  | IChangeUserDataSuccessAction
  | IChangeUserDataFailedAction;

export const updateUserData = (form: { name?: string; email?: string }) => {
  return (dispatch: Dispatch<TAuthActions>) => {
    dispatch({
      type: CHANGE_USER_DATA_REQUEST,
    });
    getData(`${BASE_URL}/auth/user`, 'PATCH', form, true)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: CHANGE_USER_DATA_SUCCESS,
            user: res.user,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: CHANGE_USER_DATA_FAILED,
        });
        console.log(err.message);
      });
  };
};
