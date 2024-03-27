import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomeUserPage from "../../pages/User/Home";
import CategoriaUserPage from "../../pages/User/Categoria";
import AddOrEditCategoriaUserPage from "../../pages/User/Categoria/addOrEdit.jsx";

export default function PrivateRoutesUser(params) {
    return (
        <Routes>
            <Route path="*" element={<Navigate to='/home' />} />
            <Route path="/home" element={<HomeUserPage />} />
            <Route path="/categorias" element={<CategoriaUserPage />} />
            <Route path="/categorias/addedit/:id?" element={<AddOrEditCategoriaUserPage />} />
        </Routes>
    )
}