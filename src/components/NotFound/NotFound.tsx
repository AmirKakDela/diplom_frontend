import React from 'react';
import {useNavigate} from "react-router-dom";
import {Button} from "antd";

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div>
            NOT FOUND PAGE
            <Button type='primary'
                    onClick={() => navigate(-1)}
            >Назад</Button>
        </div>
    );
};

export default NotFound;