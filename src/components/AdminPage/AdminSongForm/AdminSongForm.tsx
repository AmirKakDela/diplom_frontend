import React, {useEffect, useState} from 'react';
import {Formik} from "formik";
import {Input} from "antd";
import {ArtistType, GenreType, SongType} from "../../../config/types";
import GenreAPI from "../../../API/GenreAPI";
import * as yup from "yup";
import {validationRulesSong} from "../../../config/ValidationRules";
import {useParams} from "react-router-dom";
import ArtistAPI from "../../../API/ArtistAPI";
import SongsAPI from "../../../API/SongsAPI";
import {useDispatch} from "react-redux";
import {setError} from "../../../redux/Actions/errorAction";
import './adminSongForm.scss';

export type SongTypeWithoutId = {
    name: string,
    artist: string,
    artistId: string,
    cover: string,
    song: string,
    genre: string,
    _id?: string
}

const initialValues: SongTypeWithoutId = {
    name: '',
    artist: '',
    artistId: '',
    cover: '',
    song: '',
    genre: '',
}

const validateSchema = yup.object().shape(validationRulesSong)

const AdminSongForm: React.FC = () => {
    const [genres, setGenres] = useState<GenreType[]>([]);
    const [artists, setArtists] = useState<ArtistType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();
    const dispatch = useDispatch();
    const [isSubmit, setIsSubmit] = useState(false);

    const onSubmit = (data: SongTypeWithoutId) => {
        setIsSubmit(true)
        console.log('onSubmit', data);
        data.artist = artists.find(artist => artist._id === data.artistId)?.name || ''
        const formData = new FormData();
        for (let key in data) {
            // @ts-ignore
            formData.append(key, data[key])
        }
        // formData.append()
        SongsAPI.createSong(formData).then(res => {
            res.data.message && dispatch(setError(res.data.message));
            console.log(res)
        }).finally(() => {
            setIsSubmit(false)
        })
    }

    useEffect(() => {
        GenreAPI.getAllGenre().then(data => {
            setGenres(data)
        })
        ArtistAPI.getAllArtists().then(data => {
            setArtists(data);
        })
    }, [])

    useEffect(() => {
        if (params.id) {
            SongsAPI.getSongById(params.id).then((data: SongType) => {
                initialValues.name = data.name
                initialValues.artistId = data.artistId;
                initialValues.genre = data.genre;
            })
        }
        setIsLoading(false);
    }, [params.id])

    useEffect(() => {
        return () => {
            for (let key in initialValues) {
                // @ts-ignore
                initialValues[key] = ''
            }
        }
    }, [])


    return (
        <>
            {isLoading
                ? <h1>IsloadIng</h1>
                : <div className="admin-form">
                    <h1 className='admin-form__title'>Создание песни</h1>
                    <Formik initialValues={initialValues}
                            onSubmit={onSubmit}
                            validationSchema={validateSchema}
                    >
                        {({values, touched, errors, handleSubmit, handleBlur, handleChange, setFieldValue}) => {
                            return <form onSubmit={handleSubmit}>
                                <label htmlFor="name">Название песни</label> <br/>
                                <Input name='name'
                                       className={`form__input`}
                                       id="name"
                                       type="text"
                                       autoComplete='off'
                                       placeholder="Введите название песни"
                                       value={values.name}
                                       onBlur={handleBlur}
                                       onChange={handleChange}
                                />
                                {errors.name && touched.name && <p className="form__error_text">{errors.name}</p>}

                                <label htmlFor="artistId">Исполнитель</label> <br/>
                                <select className={`form__input`}
                                        name='artistId'
                                        id='artistId'
                                        value={values.artistId}
                                        onChange={handleChange}>
                                    <option value="" disabled>Выберите исполнителя</option>
                                    {artists && artists.map(artist => (
                                        <option key={artist._id} value={artist._id}>{artist.name}</option>
                                    ))}
                                </select>
                                {errors.artistId && touched.artistId &&
                                    <p className="form__error_text">{errors.artistId}</p>}

                                <label htmlFor="cover">Обложка песни</label> <br/>
                                <Input name='cover'
                                       className={`form__input form__input_upload`}
                                       id="cover"
                                       type="file"
                                       autoComplete='off'
                                       placeholder="Загрузите обложку для песни"
                                       onBlur={handleBlur}
                                       onChange={(e) => setFieldValue('cover', e.target.files && e.target.files[0])}
                                />
                                {errors.cover && touched.cover && <p className="form__error_text">{errors.cover}</p>}

                                <label htmlFor="song">Песня</label> <br/>
                                <Input name='song'
                                       className={`form__input`}
                                       id="song"
                                       type="file"
                                       autoComplete='off'
                                       placeholder="Загрузите песню"
                                       onBlur={handleBlur}
                                       onChange={(e) => setFieldValue('song', e.target.files && e.target.files[0])}
                                />
                                {errors.song && touched.song && <p className="form__error_text">{errors.song}</p>}

                                <label htmlFor="genre">Жанр</label> <br/>
                                <select className={`form__input`}
                                        name='genre'
                                        id='genre'
                                        value={values.genre}
                                        onChange={handleChange}>
                                    <option value="" disabled>Выберите жанр</option>
                                    {genres && genres.map(genre => (
                                        <option key={genre._id} value={genre._id}>{genre.name}</option>
                                    ))}
                                </select>
                                {errors.genre && touched.genre && <p className="form__error_text">{errors.genre}</p>}

                                <button type="submit" disabled={isSubmit}
                                        className="form__button"
                                >{isSubmit ? 'Загрузка' : 'Создать'}
                                </button>
                            </form>
                        }}
                    </Formik>
                </div>
            }
        </>
    );
};

export default AdminSongForm;
