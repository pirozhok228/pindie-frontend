'use client'

import Styles from './AuthForm.module.css';
import { useState, useEffect } from 'react';
import { authorize } from '@/app/api/api-utils';
import { endpoints } from '@/app/api/config';
import { isResponseOk } from '@/app/api/api-utils';

import { useStore } from '@/app/store/app-store';

export const AuthForm = (props) => {
  const [authData, setAuthData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState({ status: null, text: null });
  const authContext = useStore();

  const handleInput = (e) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    let timer;
    if (authContext.user) { // Данные о user из контекста
      timer = setTimeout(() => {
        setMessage({ status: null, text: null });
        props.close();
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [authContext.user]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = await authorize(endpoints.auth, authData);
    if (isResponseOk(userData)) {
      authContext.login({...userData, id: userData._id}, userData.jwt); // login из контекста
      setMessage({ status: "success", text: "Вы авторизовались!" });
    } else {
      setMessage({ status: "error", text: "Неверные почта или пароль" });
    }
  };
  return (
    <form className={Styles['form']} onSubmit={handleSubmit}>
      <h2 className={Styles['form__title']}>Авторизация</h2>
      <div className={Styles['form__fields']}>
        <label className={Styles['form__field']}>
          <span className={Styles['form__field-title']}>Email</span>
          <input className={Styles['form__field-input']} name="email" type="email" placeholder="hello@world.com" onInput={handleInput} />
        </label>
        <label className={Styles['form__field']}>
          <span className={Styles['form__field-title']}>Пароль</span>
          <input className={Styles['form__field-input']} name="password" type="password" placeholder='***********' onInput={handleInput} />
        </label>
      </div>
      {message.status &&
        <p className={Styles.form__message}>{message.text}</p>
      }
      <div className={Styles['form__actions']}>
        <button className={Styles['form__reset']} type="reset">Очистить</button>
        <button className={Styles['form__submit']} type="submit">Войти</button>
      </div>
    </form>
  )
};
