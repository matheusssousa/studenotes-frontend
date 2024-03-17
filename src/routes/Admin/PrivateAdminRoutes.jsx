import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomeAdminPage from "../../pages/Admin/Home";

export default function PrivateRoutesAdmin(params) {
    return (
        <Routes>
            <Route path="*" element={<Navigate to='/admin/home' />} />
            <Route path="/admin/home" element={<HomeAdminPage />} />
        </Routes>
    )
}