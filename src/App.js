import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie } from './services/utils';
import HomePage from './pages/home/home';
import LoginPage from './pages/login/login';
import RegisterPage from './pages/register/register';
import ForgotPasswordPage from './pages/forgot-password/forgot-password';
import ResetPasswordPage from './pages/reset-password/reset-password';
import ProfilePage from './pages/profile/profile';
import OrderHistoryPage from './pages/order-history/order-history';
import IngredientPage from './pages/ingredient/ingredient.jsx';
import NotFound404 from './pages/404/404';
import { ProtectedRoute } from './components/protected-route';
import { getUser } from './services/actions/login';
import {
  SET_INVISIBLE_MODAL_INGREDIENT,
  SET_VISIBLE_INGREDIENT,
} from './services/actions/app';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Modal from './components/modal/modal';
import IngredientDetails from './components/burger-ingredients/ingredient-details/ingredient-details';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (getCookie('accessToken')) {
      dispatch(getUser());
    }
  }, []);

  const ModalSwitch = () => {
    const location = useLocation();
    const history = useHistory();
    let background = location.state && location.state.background;

    const handleModalClose = () => {
      dispatch({
        type: SET_INVISIBLE_MODAL_INGREDIENT,
      });
      dispatch({
        type: SET_VISIBLE_INGREDIENT,
        visibleIngredient: {},
      });
      history.goBack();
    };

    const { ingredients } = useSelector((state) => state.app);

    return (
      <>
        <Switch location={background || location}>
          <Route path="/" exact={true}>
            <HomePage />
          </Route>
          <Route path="/login" exact={true}>
            <LoginPage />
          </Route>
          <Route path="/register" exact={true}>
            <RegisterPage />
          </Route>
          <Route path="/forgot-password" exact={true}>
            <ForgotPasswordPage />
          </Route>
          <Route path="/reset-password" exact={true}>
            <ResetPasswordPage />
          </Route>
          <ProtectedRoute path="/profile/" exact={true}>
            <ProfilePage />
          </ProtectedRoute>
          <ProtectedRoute path="/profile/orders" exact={true}>
            <OrderHistoryPage />
          </ProtectedRoute>
          <Route path="/ingredients/:id" exact={true}>
            <IngredientPage />
          </Route>
          <Route>
            <NotFound404 />
          </Route>
        </Switch>
        {ingredients.length > 0 && background && (
          <Route
            path="/ingredients/:id"
            children={
              <Modal
                onClose={handleModalClose}
                size="medium"
                header="Детали ингредиента"
              >
                <IngredientDetails />
              </Modal>
            }
          />
        )}
      </>
    );
  };

  return (
    <Router>
      <ModalSwitch />
    </Router>
  );
}