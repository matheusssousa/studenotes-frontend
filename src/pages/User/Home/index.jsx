import React from "react";
import MainHeader from "../../../components/Commons/MainHeader";

export default function HomeUserPage(params) {
    return (
        <div className="page-content">
            <MainHeader
                page='Home'
                text='A sua página inicial.'
            />
        </div>
    )
}