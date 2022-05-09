import React from 'react';
import {Navigate} from "react-router-dom";

type PropsType = {
    isAuth: boolean,
    isAdmin: boolean
    children: JSX.Element
}

const AdminRoute: React.FC<PropsType> = ({children, isAuth, isAdmin}) => {
    if (!isAuth || !isAdmin) {
        return <Navigate to='/'/>
    }
    return children;
};

export default AdminRoute;