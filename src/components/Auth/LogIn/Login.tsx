import React, {useCallback, useMemo} from 'react';
import {Formik} from "formik";
import * as yup from 'yup';
import {Link} from "react-router-dom";
import '../auth.scss';
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../../redux/Actions/thunkUserActions";
import {Input} from "antd";
import logo from '../../../assets/imgs/logo-black.png'
import {RootState} from "../../../redux/Reducers/rootReducer";

type UserDataLoginType = {
    email: string,
    password: string
}

const validateSchema = yup.object().shape({
    email: yup.string().trim()
        .required('Введите адрес электронной почты из аккаунта Spotify.').matches(/^\S+@\S+\.\S+$/, 'Адрес электронной почты недействителен. Убедитесь, что он указан в таком формате: example@email.com.'),
    password: yup.string().trim().required('Введите пароль вашего акканта Spotify.')
})

const Login: React.FC = () => {
    const error = useSelector((state: RootState) => state.user.error);
    const dispatch = useDispatch();

    const initialValues: UserDataLoginType = useMemo(() => {
        return {
            email: '',
            password: ''
        }
    }, [])

    const onSubmit = useCallback((userDataLogin: UserDataLoginType) => {
        dispatch(login(userDataLogin.email, userDataLogin.password));
    }, [dispatch])

    return (
        <>
            <div className="form__logo_wrap">
                AMIR MUSIC
            </div>
            <h5 className="form__title">Чтобы продолжить, войдите в Amir Music.</h5>
            {error && <div className="form__error_block">
                <span>{error}</span>
            </div>}
            <Formik initialValues={initialValues} onSubmit={onSubmit}
                    validationSchema={validateSchema}
                    validateOnBlur
            >
                {({values, touched, errors, handleSubmit, handleBlur, handleChange}) => (
                    <form className="form" onSubmit={handleSubmit}>
                        <label htmlFor="login__email">Email</label> <br/>
                        <Input name='email'
                               className={`form__input ${errors.email && touched.email && 'form__input_error'}`}
                               id="login__email"
                               type="email"
                               autoComplete='off'
                               placeholder="Введите email"
                               value={values.email}
                               onBlur={handleBlur}
                               onChange={handleChange}
                        />
                        {errors.email && touched.email && <p className="form__error_text">{errors.email}</p>}
                        <label htmlFor="login__password">Пароль</label> <br/>
                        <Input name='password'
                               className={`form__input ${errors.password && touched.password && 'form__input_error'}`}
                               id="login__password"
                               type="password"
                               autoComplete='off'
                               placeholder="Введите пароль"
                               value={values.password}
                               onBlur={handleBlur}
                               onChange={handleChange}
                        />
                        {errors.password && touched.password &&
                            <p className="form__error_text">{errors.password}</p>}
                        <button type="submit"
                                className="form__button form__button_login"
                        >Войти
                        </button>
                        <h5 className="form__subtitle">Нет аккаунта?</h5>
                        <button className="form__button" type="button">
                            <Link to={'/auth/signup'}>РЕГИСТРАЦИЯ В Amir Music</Link>
                        </button>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default Login;