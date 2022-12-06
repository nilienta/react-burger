import { useCallback, useState, FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/types';
import { Redirect } from 'react-router-dom';
import styles from './forgot-password.module.css';
import {
  Button,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { checkingEmail } from '../../services/actions/checking-mail';
import { useForm } from '../../services/hooks/use-form';

const ForgotPasswordPage: FC = () => {
  const dispatch = useAppDispatch();

  const { emailExists, possibleEmail, isAuth } = useAppSelector(
    (state) => state.auth
  );

  const { values, handleChange } = useForm({
    email: possibleEmail,
  });

  const forgotPassword = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      dispatch(checkingEmail(values));
    },
    [values, dispatch]
  );
  if (emailExists) {
    return (
      <Redirect
        to={{
          pathname: '/reset-password',
        }}
      />
    );
  }

  if (isAuth) {
    return (
      <Redirect
        to={{
          pathname: '/',
        }}
      />
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={forgotPassword}>
          <h1 className="text text_type_main-medium">Восстановление пароля</h1>
          <EmailInput
            placeholder="Укажите e-mail"
            onChange={handleChange}
            value={values.email!}
            name={'email'}
            autoComplete="on"
          />
          <Button type="primary" size="large" htmlType="submit">
            Восстановить
          </Button>
        </form>
        <p className="text text_type_main-default text_color_inactive mt-20">
          Вспомнили пароль?{' '}
          <Link to="/login" className={styles.link}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
