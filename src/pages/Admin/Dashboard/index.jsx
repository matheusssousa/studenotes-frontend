import React from "react";
import MainHeader from "../../../components/Commons/MainHeader";

export default function DashboardAdminPage(params) {
    return (
        <div className="page-content">
            <MainHeader
                page='Dashboard'
                text='O dashboard principal do sistema.'
            />
        </div>
    )
}