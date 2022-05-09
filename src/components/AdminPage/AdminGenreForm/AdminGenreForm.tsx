import React, {useEffect, useState} from 'react';
import GenreAPI from "../../../API/GenreAPI";
import {useParams} from "react-router-dom";
import {Song} from "../../Song/Song";
import {GenreType, SongType} from "../../../config/types";
import {Input, Skeleton} from "antd";
import {Formik} from "formik";

export type GenreTypeWithoutId = {
    _id?: string
    color: string,
    name: string
}

const initialValues: GenreTypeWithoutId = {
    color: '#be39dc',
    name: ''
}

const AdminGenreForm: React.FC = () => {
    const params = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [songs, setSongs] = useState<SongType[]>([]);
    const [genre, setGenre] = useState<GenreType>({
        _id: '',
        color: '#000000',
        name: ''
    })

    const onSubmit = (data: any) => {
        console.log(data)
        GenreAPI.createGenre(data).then(res => {

        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        if (params.id) {
            GenreAPI.getGenre(params.id).then(data => {
                setGenre(data.genre)
                setSongs(data.songs)
                initialValues.color = genre.color;
                initialValues.name = genre.name;
            })
        }
        setIsLoading(false);
    }, [])
    return (

        <>
            {isLoading ? <Skeleton active/> :
                <div className="info genre-page admin">
                    {genre.color && genre.name &&
                        <div className="info__header genre-page__header admin-genre__header"
                             style={{backgroundColor: genre.color}}>
                            <h1 className="desc__name genre-page__name">{genre.name}</h1>
                        </div>}
                    <div className="info__main">
                        <h2 className="main__title admin__title">Создание жанра</h2>
                        <div className="admin-form">
                            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                                {({values, touched, errors, handleSubmit, handleBlur, handleChange}) => {
                                    return <form onSubmit={handleSubmit}>
                                        <label htmlFor="name">Название жанра</label> <br/>
                                        <Input name='name'
                                               className={`form__input`}
                                               id="name"
                                               type="text"
                                               autoComplete='off'
                                               placeholder="Введите название жанра"
                                               value={values.name}
                                               onBlur={handleBlur}
                                               onChange={handleChange}
                                        />
                                        {errors.name && touched.name &&
                                            <p className="form__error_text">{errors.name}</p>}

                                        <label htmlFor="color">Выберите яркий цвет для жанра</label> <br/>
                                        <Input name='color'
                                               className={`form__input form__input_color`}
                                               id="color"
                                               type="color"
                                               value={values.color}
                                               onBlur={handleBlur}
                                               onChange={handleChange}
                                        />
                                        {errors.name && touched.name &&
                                            <p className="form__error_text">{errors.name}</p>}

                                        <button type="submit"
                                                className="form__button"
                                        >Создать
                                        </button>
                                    </form>
                                }}
                            </Formik>
                        </div>

                        {/*<h2 className="main__title admin__title">Песни</h2>*/}
                        {/*<div className="main__songs">*/}
                        {/*    {!!songs.length ? songs.map((song, idx) => (*/}
                        {/*        <div className="admin-item__wrap" key={genre._id}>*/}
                        {/*            <Song song={song} order={idx + 1}/>*/}
                        {/*        </div>*/}
                        {/*    )) : (<p className="genre-page__subtitle">У*/}
                        {/*        жанра {genre.name && genre.name.toUpperCase()} пока нет песен. Скоро мы это*/}
                        {/*        исправим.</p>)}*/}
                        {/*</div>*/}
                    </div>
                </div>
            }
        </>
    );
};

export default AdminGenreForm;
