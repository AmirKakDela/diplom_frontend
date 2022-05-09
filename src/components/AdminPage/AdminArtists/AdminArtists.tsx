import React, {useEffect, useState} from 'react';
import {ArtistType} from "../../../config/types";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {Popconfirm, Skeleton} from "antd";
import ArtistAPI from "../../../API/ArtistAPI";
import './AdminArtists.scss';
import artistDefault from "../../../assets/imgs/avatar.svg";

const AdminArtists: React.FC = () => {
    const [artists, setArtists] = useState<ArtistType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const deleteArtist = (id: string) => {
        ArtistAPI.deleteArtist(id).then(() => {
            const resultArtist = artists.filter(artist => {
                return artist._id !== id
            })
            setArtists(resultArtist);
        })
    }

    useEffect(() => {
        ArtistAPI.getAllArtists().then(data => {
            setArtists(data);
            setIsLoading(false);
        })
    }, []);


    return (
        <div className="admin">
            {isLoading ? <Skeleton active/> :
                <>
                    <Link to="/admin/artist/create">
                        <button className="admin__button form__button">Создать нового артиста</button>
                    </Link>
                    {artists && artists.map((artist) => {
                        return <div className="admin__artist__wrap" key={artist._id}>
                            <img src={artist.image || artistDefault}
                                 alt=""
                                 className="admin__artist__img"
                                 />
                            <div className="admin__artist__name song__artist ">{artist.name}</div>
                            <div className="admin__artist__buttons">
                                <Popconfirm
                                    title="Вы действительно хотите удалить данного артиста?"
                                    onConfirm={() => deleteArtist(artist._id)}
                                    okText="Да"
                                    cancelText="Нет"
                                >
                                    <button className="form__button admin__artist__action">
                                        <DeleteOutlined style={{fontSize: 20, color: 'white', cursor: "pointer"}}/>
                                    </button>
                                </Popconfirm>
                                <Link to={`/admin/artist/${artist._id}`}>
                                    <button className="form__button admin__artist__action">
                                        <EditOutlined style={{fontSize: 20, color: 'white', cursor: "pointer"}}/>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    })}
                </>
            }
        </div>
    );
};

export default AdminArtists;
