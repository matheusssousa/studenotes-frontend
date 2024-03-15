import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// PAGINAS USUÁRIO
import InicioUserPage from "../../pages/User/Auth/Inicio";
import LoginUserPage from "../../pages/User/Auth/Login";
import RegisterUserPage from "../../pages/User/Auth/Register";
import ForgotPasswordUserPage from "../../pages/User/Auth/ForgotPassword";
import ResetPasswordUserPage from "../../pages/User/Auth/ResetPassword";

// PAGINAS ADMINISTRADOR
import LoginAdminPage from "../../pages/Admin/Auth/Login";
import ForgotPasswordAdminPage from "../../pages/Admin/Auth/ForgotPassword";
import ResetPasswordAdminPage from "../../pages/Admin/Auth/ResetPassword";

export default function PublicRoutes() {
    return (
        <Routes>
            <Route path="*" element={<Navigate to='/' />} />
            <Route path="/" element={<InicioUserPage />} />
            <Route path="/login" element={<LoginUserPage />} />
            <Route path="/register" element={<RegisterUserPage />} />
            <Route path="/forgotpassword" element={<ForgotPasswordUserPage />} />
            <Route path="/resetpassword/:token" element={<ResetPasswordUserPage />} />
            {/* ROTAS PUBLICAS PARA ADMINISTRADOR */}
            <Route path="/admin" element={<LoginAdminPage />} />
            <Route path="/admin/forgotpassword" element={<ForgotPasswordAdminPage />} />
            <Route path="/admin/resetpassword/:token" element={<ResetPasswordAdminPage />} />
        </Routes>
    )
} 