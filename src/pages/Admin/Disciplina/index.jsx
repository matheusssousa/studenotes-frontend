import React, { useEffect, useState } from "react";
import ApiAdmin from "../../../services/ApiAdmin";
import Pagination from "../../../components/Commons/Pagination";
import Search from "../../../components/Commons/Search";
import MainHeader from "../../../components/Commons/MainHeader";
import Loading from "../../../components/Commons/Loading";

export default function DisciplinaAdminPage(params) {
    const [disciplinas, setDisciplinas] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [searchNome, setSearchNome] = useState("");
    const [searchDateInicio, setSearchDateInicio] = useState("");
    const [searchDateFim, setSearchDateFim] = useState("");

    const [cadastrarDisciplina, setCadastrarDisciplina] = useState(false);

    const receiveDisciplinas = async (page = 1) => {
        try {
            const response = await ApiAdmin.get(`/disciplina`, {
                params: {
                    page: page,
                    nome: searchNome,
                    data_inicio: searchDateInicio,
                    data_fim: searchDateFim
                }
            });
            setDisciplinas(response.data.data);
            setPagination(response.data);
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

    const handlePaginationClick = (newPage) => {
        receiveDisciplinas(newPage);
    };

    return (
        <div className="page-content">
            <MainHeader
                page='Disciplinas'
                text='Uma lista das disciplinas cadastradas incluindo id, nome e status.'
                setFunction={setCadastrarDisciplina}
            />
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
            <div className="conteudo-content pt-5">
                {/* <div className="header-content">
                    <p>Uma lista de todas as disciplinas cadastradas, incluindo o id e o nome.</p>
                    <button className="btn-add">Adicionar Disciplina</button>
                </div> */}
            </div>
            <div>
                {pagination && (
                    <Pagination
                        pagination={pagination}
                        setPage={handlePaginationClick}
                    />
                )}
            </div>
        </div>
    )
}