import React, {useCallback, useMemo} from 'react';
import {Formik} from "formik";
import * as yup from 'yup';
import '../auth.scss';
import {Link} from "react-router-dom";
import {signup} from "../../../redux/Actions/thunkUserActions";
import {useDispatch, useSelector} from 'react-redux';
import {Input} from "antd";
import logo from '../../../assets/imgs/logo-black.png'
import {RootState} from "../../../redux/Reducers/rootReducer";


type PropsType = {}

type UserDataType = {
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}

const Signup: React.FC<PropsType> = () => {
    const dispatch = useDispatch();
    const error = useSelector((state: RootState) => state.user.error);

    const initialValues: UserDataType = useMemo(() => {
        return {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }, [])

    const validationSchema = yup.object().shape({
        name: yup.string()
            .required('Укажите имя для своего профиля.')
            .min(2, 'Имя пользователя не может быть меньше 2 символов.')
            .max(40, 'Имя пользователя не может быть больше 40 символов.'),
        email: yup.string().trim()
            .required('Введите адрес электронной почты.').matches(/^\S+@\S+\.\S+$/, 'Адрес электронной почты недействителен. Убедитесь, что он указан в таком формате: example@email.com.'),
        password: yup.string().trim().required('Введите пароль.')
            .min(4, 'Пароль должен быть не менее 4 символов.')
            .max(20, 'Пароль должен быть не более 20 символов.'),
        confirmPassword: yup.string().trim().required('Введите пароль еще раз.')
            .oneOf([yup.ref('password')], 'Пароли не совпадают')
    })

    const onSubmit = useCallback((userData: UserDataType) => {
        console.log(userData);
        dispatch(signup(userData.email, userData.password, userData.name))
    }, [dispatch])

    return (
        <>
            <div className="form__logo_wrap">
                AMIR MUSIC
            </div>
            <h1 className="form__title form__title_signup">Зарегистрируйтесь и слушайте бесплатно</h1>
            {error && <div className="form__error_block">
                <span>{error}</span>
            </div>}
            <Formik onSubmit={onSubmit}
                    initialValues={initialValues}
                    validateOnBlur
                    validationSchema={validationSchema}
            >
                {({values, errors, touched, handleChange, handleBlur, handleSubmit}) => (
                    <form onSubmit={handleSubmit} className="form">
                        <label htmlFor="name">Ваше имя</label> <br/>
                        <Input className={`form__input ${errors.name && touched.name && 'form__input_error'}`}
                               type="text"
                               name="name"
                               placeholder="Укажите свое имя"
                               onChange={handleChange}
                               onBlur={handleBlur}
                               value={values.name}
                               autoComplete="nope"
                        />
                        {touched.name && errors.name &&
                            <p className="form__error_text">{errors.name}</p>}
                        <label htmlFor="email">Ваш адрес электронной почты</label> <br/>
                        <Input className={`form__input ${errors.email && touched.email && 'form__input_error'}`}
                               type="email"
                               name="email"
                               placeholder="Введите адрес электронной почты"
                               onChange={handleChange}
                               onBlur={handleBlur}
                               value={values.email}
                               autoComplete="off"
                        />
                        {touched.email && errors.email && <p className="form__error_text">{errors.email}</p>}
                        <label htmlFor="password">Пароль</label> <br/>
                        <Input className={`form__input ${errors.password && touched.password && 'form__input_error'}`}
                               type="password"
                               name="password"
                               placeholder="Придумайте пароль"
                               onChange={handleChange}
                               onBlur={handleBlur}
                               value={values.password}
                        />
                        {touched.password && errors.password &&
                            <p className="form__error_text">{errors.password}</p>}
                        <label htmlFor="confirmPassword">Подтвердите пароль</label> <br/>
                        <Input
                            className={`form__input ${errors.confirmPassword && touched.confirmPassword && 'form__input_error'}`}
                            type="password"
                            name="confirmPassword"
                            placeholder="Введите пароль еще раз"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.confirmPassword}
                        />
                        {touched.confirmPassword && errors.confirmPassword &&
                            <p className="form__error_text">{errors.confirmPassword}</p>}
                        <button type="submit"
                                className="form__button"
                        >Зарегистрироваться
                        </button>
                        <p className="form__subtitle">Уже есть аккаунт? {<Link to='/auth'>Войти</Link>}</p>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default Signup;
