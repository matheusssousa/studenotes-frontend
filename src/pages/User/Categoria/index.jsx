import React, { useEffect, useState } from "react";
import ApiUser from "../../../services/ApiUser";
import MainHeader from "../../../components/Commons/MainHeader";
import Search from "../../../components/Commons/Search";
import Pagination from "../../../components/Commons/Pagination";

export default function CategoriaUserPage() {
    const [categorias, setCategorias] = useState(null);
    const [pagination, setPagination] = useState("");
    const [searchNome, setSearchNome] = useState("");
    const [searchDateInicio, setSearchDateInicio] = useState("");
    const [searchDateFim, setSearchDateFim] = useState("");

    const receiveCategorias = async () => {
        try {
            const response = await ApiUser.get(`/categoria`, {
                params: {
                    page: pagination.current_page,
                    nome: searchNome,
                    data_inicio: searchDateInicio,
                    data_fim: searchDateFim
                }
            });
            setCategorias(response.data.data);
            const { data, ...paginationData } = response.data;
            setPagination(paginationData);
        } catch (error) {
            console.error("Erro ao receber categorias:", error);
        }
    };

    const limparSearch = () => {
        setSearchNome("");
        setSearchDateFim("");
        setSearchDateInicio("");
    };

    useEffect(() => {
        receiveCategorias();
    }, []);

    return (
        <div className="page-body">
            <MainHeader page='Categorias' />
            <form onSubmit={receiveCategorias}>
                <Search
                    type="categorias"
                    nome={searchNome}
                    setSearchNome={setSearchNome}
                    data_inicio={searchDateInicio}
                    setSearchDateInicio={setSearchDateInicio}
                    data_fim={searchDateFim}
                    setSearchDateFim={setSearchDateFim}
                    limpar={limparSearch}
                />
            </form>
            <div>
                <form onSubmit={receiveCategorias}>
                    <Pagination pagination={pagination} />
                </form>
            </div>
        </div>
    );
}
