import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// PAGINAS USUÁRIO
import InicioUserPage from "../../pages/User/Auth/Inicio";
import LoginUserPage from "../../pages/User/Auth/Login";
import RegisterUserPage from "../../pages/User/Auth/Register";

// PAGINAS ADMINISTRADOR
import LoginAdminPage from "../../pages/Admin/Auth/Login";

export default function PublicRoutes() {
    return (
        <Routes>
            <Route path="*" element={<Navigate to='/' />} />
            <Route path="/" element={<InicioUserPage />} />
            <Route path="/login" element={<LoginUserPage />} />
            <Route path="/register" element={<RegisterUserPage />} />
            {/* ROTAS PUBLICAS PARA ADMINISTRADOR */}
            <Route path="/admin" element={<LoginAdminPage />} />
        </Routes>
    )
} 