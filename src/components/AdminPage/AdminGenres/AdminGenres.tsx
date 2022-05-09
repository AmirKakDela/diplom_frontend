import React, {useEffect, useState} from 'react';
import GenreAPI from "../../../API/GenreAPI";
import {GenreType} from "../../../config/types";
import {Link} from "react-router-dom";
import {Popconfirm, Skeleton} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";

const AdminGenres: React.FC = () => {
    const [genres, setGenres] = useState<GenreType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        GenreAPI.getAllGenre().then(data => {
            setGenres(data)
            setIsLoading(false);
        })
    }, [])

    return (
        <>
            {isLoading ? <Skeleton active/> :
                <div className="info__main">
                    <h2 className="main__title">Жанры</h2>
                    <Link to="/admin/genre/create">
                        <button className="form__button admin__button admin__button_main">Добавить новый жанр</button>
                    </Link>

                    {genres && genres.map((genre, index) => (
                        <div className="admin-item__wrap" key={genre._id}>
                            <div className="admin-genre genre" style={{backgroundColor: genre.color}}>
                                <h1 className="admin-genre__title">{index + 1}. &nbsp;</h1>
                                <h1 className="admin-genre__title">{genre.name}</h1>
                            </div>
                            <Popconfirm
                                title="Вы действительно хотите удалить данный жанр?"
                                // onConfirm={() => deleteSong(genre._id)}
                                okText="Да"
                                cancelText="Нет"
                            >
                                <button className="form__button admin-item__action">
                                    <DeleteOutlined style={{fontSize: 20, color: 'white', cursor: "pointer"}}/>
                                </button>
                            </Popconfirm>
                            <Link to={`/admin/genre/${genre._id}`}>
                                <button className="form__button admin-item__action">
                                    <EditOutlined style={{fontSize: 20, color: 'white', cursor: "pointer"}}/>
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            }
        </>
    );
};

export default AdminGenres;
