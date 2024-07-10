import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomeUserPage from "../../pages/User/Home";
import CategoriaUserPage from "../../pages/User/Categoria";
import AddOrEditCategoriaUserPage from "../../pages/User/Categoria/addOrEdit.jsx";
import AnotacaoUserPage from "../../pages/User/Anotacao/index.jsx";
import ComunidadeUserPage from "../../pages/User/Comunidade/index.jsx";
import ViewAnotacaoUserPage from "../../pages/User/Anotacao/view.jsx";
import AddOrEditAnotacaoUserPage from "../../pages/User/Anotacao/addOrEdit.jsx";
import ViewComunidadeUserPage from "../../pages/User/Comunidade/view.jsx";

export default function PrivateRoutesUser(params) {
    return (
        <Routes>
            <Route path="*" element={<Navigate to='/home' />} />
            <Route path="/home" element={<HomeUserPage />} />
            <Route path="/anotacoes" element={<AnotacaoUserPage />} />
            <Route path="/anotacoes/view/:id?" element={<ViewAnotacaoUserPage />} />
            <Route path="/anotacoes/addedit/:id?" element={<AddOrEditAnotacaoUserPage />} />
            <Route path="/categorias" element={<CategoriaUserPage />} />
            <Route path="/categorias/addedit/:id?" element={<AddOrEditCategoriaUserPage />} />
            <Route path="/comunidade" element={<ComunidadeUserPage />} />
            <Route path="/comunidade/view/:id?" element={<ViewComunidadeUserPage />} />
        </Routes>
    )
}