import React, { useEffect, useState } from "react";
import ApiAdmin from "../../../services/ApiAdmin";
import Pagination from "../../../components/Commons/Pagination";
import Search from "../../../components/Commons/Search";
import MainHeader from "../../../components/Commons/MainHeader";

export default function DisciplinaAdminPage(params) {
    const [disciplinas, setDisciplinas] = useState(null);
    const [page, setPage] = useState("");
    const [pagination, setPagination] = useState("");
    const [searchNome, setSearchNome] = useState("");
    const [searchDateInicio, setSearchDateInicio] = useState("");
    const [searchDateFim, setSearchDateFim] = useState("");

    const receiveDisciplinas = async () => {
        try {
            const response = await ApiAdmin.get(`/disciplina`, {
                params: {
                    page: page,
                    nome: searchNome,
                    data_inicio: searchDateInicio,
                    data_fim: searchDateFim
                }
            });
            console.log(response.data);
            setDisciplinas(response.data.data);
            const { data, ...paginationData } = response.data;
            setPagination(paginationData);
            setPage(pagination.current_page);
        } catch (error) {
            console.error("Erro ao receber disciplinas:", error);
        }
    };

    const limparSearch = () => {
        setSearchNome("");
        setSearchDateFim("");
        setSearchDateInicio("");
    };


    useEffect(() => {
        receiveDisciplinas();
    }, []);

    const handlePaginationClick = async (newPage) => {
        setPage(newPage);
        receiveDisciplinas();
    };

    return (
        <div className="page-body">
            <MainHeader page='Disciplinas' />
            <form onSubmit={receiveDisciplinas}>
                <Search
                    type="disciplinas"
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
                <Pagination pagination={pagination} setPage={handlePaginationClick} />
            </div>
        </div>
    )
}