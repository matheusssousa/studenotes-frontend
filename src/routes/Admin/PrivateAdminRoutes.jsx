import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomeAdminPage from "../../pages/Admin/Home";
import DisciplinaAdminPage from "../../pages/Admin/Disciplina";

export default function PrivateRoutesAdmin(params) {
    return (
        <Routes>
            <Route path="*" element={<Navigate to='/admin/home' />} />
            <Route path="/admin/home" element={<HomeAdminPage />} />
            <Route path="/admin/disciplinas" element={<DisciplinaAdminPage />} />
        </Routes>
    )
}