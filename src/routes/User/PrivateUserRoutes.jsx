import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomeUserPage from "../../pages/User/Home";

export default function PrivateRoutesUser(params) {
    return (
        <Routes>
            <Route path="*" element={<Navigate to='/home' />} />
            <Route path="/home" element={<HomeUserPage />} />
        </Routes>
    )
}