import React, {useEffect, useState} from "react";
import {Formik} from "formik";
import {Input} from "antd";
import {ArtistType} from "../../../config/types";
import * as yup from "yup";
import {validationRulesArtist} from "../../../config/ValidationRules";
import {useParams} from "react-router-dom";
import ArtistAPI from "../../../API/ArtistAPI";
import {useDispatch} from "react-redux";
import {setError} from "../../../redux/Actions/errorAction";

export type ArtistFormData = {
    name: string,
    image: string,
}

const initialValues: ArtistFormData = {
    name: "",
    image: ""
};

const validateSchema = yup.object().shape(validationRulesArtist);

const AdminArtistForm: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();
    const dispatch = useDispatch();
    const [isSubmit, setIsSubmit] = useState(false);

    const onSubmit = (data: ArtistFormData) => {
        setIsSubmit(true);
        const formData = new FormData();
        for (let key in data) {
            // @ts-ignore
            formData.append(key, data[key]);
        }
        // formData.append()
        ArtistAPI.createArtist(formData).then(res => {
            console.log(res);
            res?.data?.message && dispatch(setError(res.data.message));
        }).finally(() => {
            setIsSubmit(false);
        });
    };

    useEffect(() => {
        if (params.id) {
            ArtistAPI.getArtistById(params.id).then((data: ArtistType) => {
                initialValues.name = data.name;
                initialValues.image = data.image;
            });
        }
        setIsLoading(false);
    }, [params.id]);

    useEffect(() => {
        return () => {
            for (let key in initialValues) {
                // @ts-ignore
                initialValues[key] = "";
            }
        };
    }, []);

    return (
        <>
            {isLoading
                ? <h1>IsloadIng</h1>
                : <div className="admin-form">
                    <h1 className="admin-form__title">Создание артиста</h1>
                    <Formik initialValues={initialValues}
                            onSubmit={onSubmit}
                            validationSchema={validateSchema}
                    >
                        {({ values, touched, errors, handleSubmit, handleBlur, handleChange, setFieldValue }) => {
                            return <form onSubmit={handleSubmit}>
                                <label htmlFor="name">Имя исполнителя</label> <br/>
                                <Input name="name"
                                       className={`form__input`}
                                       id="name"
                                       type="text"
                                       autoComplete="off"
                                       placeholder="Введите имя исполнителя"
                                       value={values.name}
                                       onBlur={handleBlur}
                                       onChange={handleChange}
                                />
                                {errors.name && touched.name && <p className="form__error_text">{errors.name}</p>}

                                <label htmlFor="image">Фото исполнителя</label> <br/>
                                <Input name="image"
                                       className={`form__input form__input_upload`}
                                       id="image"
                                       type="file"
                                       autoComplete="off"
                                       placeholder="Загрузите обложку для песни"
                                       onBlur={handleBlur}
                                       onChange={(e) =>
                                           setFieldValue("image", e.target.files && e.target.files[0])}
                                />
                                {errors.image && touched.image && <p className="form__error_text">{errors.image}</p>}

                                <button type="submit" disabled={isSubmit}
                                        className="form__button"
                                >{isSubmit ? "Загрузка" : "Создать"}
                                </button>
                            </form>;
                        }}
                    </Formik>
                </div>
            }
        </>
    );
};

export default AdminArtistForm;
