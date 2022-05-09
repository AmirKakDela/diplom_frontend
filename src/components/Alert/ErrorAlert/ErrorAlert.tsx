import React from 'react';
import {Alert} from "antd";
import './errorAlert.scss';
import {useDispatch} from "react-redux";
import {removeError} from "../../../redux/Actions/errorAction";

type PropsType = {
    error: string
}


const ErrorAlert: React.FC<PropsType> = (props) => {
    const dispatch = useDispatch();
    const onClose = () => {
        setTimeout(() => {
            dispatch(removeError());
        }, 500)
    }

    return (
        <Alert
            message={props.error}
            type="error"
            closable
            showIcon
            onClose={onClose}
        />
    );
};

export default ErrorAlert;
