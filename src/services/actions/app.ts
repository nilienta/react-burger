import { getData } from '../../utils/burger-api';
import { TAppAction } from '../../utils/types';
import { Dispatch } from 'react';
import { TIngredient } from '../../utils/types';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const SET_BUNS = 'SET_BUNS';
export const SET_MAINS_AND_SAUCES = 'SET_MAINS_AND_SAUCES';
export const MODIFY_CONSTRUCTOR_INGREDIENTS = 'MODIFY_CONSTRUCTOR_INGREDIENTS';
export const UPDATE_CONSTRUCTOR_LIST = 'UPDATE_CONSTRUCTOR_LIST';
export const DELETE_INGREDIENTS = 'DELETE_INGREDIENTS';
export const SET_TOTAL_PRICE = 'SET_TOTAL_PRICE';
export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const SET_NUMBER_ORDER = 'SET_NUMBER_ORDER';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';
export const SET_VISIBLE_INGREDIENT = 'SET_VISIBLE_INGREDIENT';
export const SET_VISIBLE_MODAL_INGREDIENT = 'SET_VISIBLE_MODAL_INGREDIENT';
export const SET_INVISIBLE_MODAL_INGREDIENT = 'SET_INVISIBLE_MODAL_INGREDIENT';
export const SET_VISIBLE_MODAL_CONSTRUCTOR = 'SET_VISIBLE_MODAL_CONSTRUCTOR';
export const SET_INVISIBLE_MODAL_CONSTRUCTOR =
  'SET_INVISIBLE_MODAL_CONSTRUCTOR';
export const RESET_STATE = 'RESET_STATE';

export const BASE_URL = 'https://norma.nomoreparties.space/api';

export const getIngredients = (URL_API: string) => {
  return (dispatch: Dispatch<TAppAction>) => {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    getData(URL_API, 'GET')
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            ingredients: res.data,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
        console.log(err.message);
      });
  };
};
export const postOrder = (
  URL_POST: string,
  order: { ingredients: (string | number | undefined)[] }
) => {
  return (dispatch: Dispatch<TAppAction>) => {
    dispatch({
      type: POST_ORDER_REQUEST,
    });
    getData(URL_POST, 'POST', order)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: SET_NUMBER_ORDER,
            numberOrder: String(res.order.number).padStart(6, '0'),
          });
          dispatch({
            type: RESET_STATE,
          });
        }
      })
      .catch((error) =>
        dispatch({
          type: POST_ORDER_FAILED,
          error,
        })
      );
  };
};