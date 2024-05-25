'use client'

import Styles from './RegistrForm.module.css'
import { useState } from 'react'

export const RegistrForm = () => {
    const [reg, setReg] = useState(false);
    return (
        <form className={Styles['form']}>
            {reg ? <h2 className={Styles['form__title']}>Регистрация прошла успешно</h2>
                :
                <>
                    <h2 className={Styles['form__title']}>Регистрация</h2>
                    <div className={Styles['form__fields']}>
                        <label className={Styles['form__field']}>
                            <span className={Styles['form__field-title']}>Ник</span>
                            <input className={Styles['form__field-input']} type="text" />
                        </label>
                        <label className={Styles['form__field']}>
                            <span className={Styles['form__field-title']}>Дата рождения</span>
                            <input className={Styles['form__field-input']} type="date" />
                        </label>
                        <label className={Styles['form__field']}>
                            <span className={Styles['form__field-title']}>Email</span>
                            <input className={Styles['form__field-input']} type="email" />
                        </label>
                        <label className={Styles['form__field']}>
                            <span className={Styles['form__field-title']}>Пароль</span>
                            <input className={Styles['form__field-input']} type="password" />
                        </label>
                    </div>
                    <div className={Styles['form__actions']}>
                        <button className={Styles['form__submit']} onClick={() => { setReg(true) }}>Зарегистрироваться</button>
                    </div>
                </>
            }
        </form>
    )
}