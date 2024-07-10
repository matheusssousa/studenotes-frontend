import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomeAdminPage from "../../pages/Admin/Home";
import DisciplinaAdminPage from "../../pages/Admin/Disciplina";
import AddOrEditDisciplinaAdminPage from "../../pages/Admin/Disciplina/addoredit";
import UserAdminPage from "../../pages/Admin/User";
import AddOrEditUserAdminPage from "../../pages/Admin/User/addoredit";
import AdminsAdminPage from "../../pages/Admin/Admins";
import AddOrEditAdminsAdminPage from "../../pages/Admin/Admins/addoredit";
import LogsAdminPage from "../../pages/Admin/Log";
import ViewLogAdminPage from "../../pages/Admin/Log/view";
import DashboardAdminPage from "../../pages/Admin/Dashboard";
import ComunidadeAdminPage from "../../pages/Admin/Comunidade";
import ViewComunidadeAdminPage from "../../pages/Admin/Comunidade/view";

export default function PrivateRoutesAdmin(params) {
    return (
        <Routes>
            <Route path="*" element={<Navigate to='/admin/home' />} />
            <Route path="/admin/home" element={<HomeAdminPage />} />
            <Route path="/admin/dashboard" element={<DashboardAdminPage />} />
            <Route path="/admin/comunidade" element={<ComunidadeAdminPage />} />
            <Route path="/admin/comunidade/view/:id?" element={<ViewComunidadeAdminPage />} />
            <Route path="/admin/disciplinas" element={<DisciplinaAdminPage />} />
            <Route path="/admin/disciplinas/addedit/:id?" element={<AddOrEditDisciplinaAdminPage />} />
            <Route path="/admin/usuarios" element={<UserAdminPage />} />
            <Route path="/admin/usuarios/addedit/:id?" element={<AddOrEditUserAdminPage />} />
            <Route path="/admin/admins" element={<AdminsAdminPage />} />
            <Route path="/admin/admins/addedit/:id?" element={<AddOrEditAdminsAdminPage />} />
            <Route path="/admin/logs" element={<LogsAdminPage />} />
            <Route path="/admin/logs/view/:id?" element={<ViewLogAdminPage />} />
        </Routes>
    )
}
