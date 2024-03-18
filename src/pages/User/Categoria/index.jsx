import React, { useState } from "react";
import ApiUser from "../../../services/ApiUser";
import MainHeader from "../../../components/Commons/MainHeader";
import Search from "../../../components/Commons/Search";

export default function CategoriaUserPage() {
    const [searchNome, setSearchNome] = useState("");
    const [searchDateInicio, setSearchDateInicio] = useState("");
    const [searchDateFim, setSearchDateFim] = useState("");

    const receiveCategorias = async (event) => {
        event.preventDefault();
        try {
            const response = await ApiUser.get(`/categoria`, {
                params: {
                    nome: searchNome,
                    data_inicio: searchDateInicio,
                    data_fim: searchDateFim
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error("Erro ao receber categorias:", error);
        }
    };

    return (
        <div className="page-body">
            <MainHeader page='Categorias' />
            <form onSubmit={receiveCategorias}>
                <Search
                    type="categorias"
                    setSearchNome={setSearchNome}
                    setSearchDateInicio={setSearchDateInicio}
                    setSearchDateFim={setSearchDateFim}
                />
            </form>
        </div>
    );
}
