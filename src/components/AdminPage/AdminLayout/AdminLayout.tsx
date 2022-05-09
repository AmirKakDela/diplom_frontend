import React from "react";
import Sidebar from "../../Layout/Sidebar/Sidebar";
import Header from "../../Layout/Header/Header";
import {Outlet} from "react-router-dom";
import {Player} from "../../Layout/Player/Player";
import {adminSidebarItems} from "../admin-sidebar-items";

const AdminLayout = () => {
    return (
        <div className="layout">
            <Sidebar items={adminSidebarItems}/>
            <Header/>
            <div className="main-content">
                <Outlet/>
            </div>
            <Player/>
        </div>
    );
};

export default AdminLayout;
