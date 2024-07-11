import React, { useEffect, useState } from "react";
import MainHeader from "../../../components/Commons/MainHeader";
import Search from "../../../components/Commons/Search";
import ApiUser from "../../../services/ApiUser";
import { toast } from "react-toastify";
import Loading from "../../../components/Commons/Loading";
import ErrorDenied from "../../../components/Commons/ErrorDenied";
import Pagination from "../../../components/Commons/Pagination";

import ModalDelete from "../../../components/Commons/Modals/Delete";
import AnotacaoCard from "../../../components/Commons/Anotacao/Card";
import AnotacaoTable from "../../../components/Commons/Anotacao/Table";
import useViewMode from "../../../hooks/ViewMode";

export default function AnotacaoUserPage(params) {
    const [anotacoes, setAnotacoes] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [searchNome, setSearchNome] = useState("");
    const [searchDateInicio, setSearchDateInicio] = useState("");
    const [searchDateFim, setSearchDateFim] = useState("");
    const [searchStatus, setSearchStatus] = useState("");
    const [searchComunidade, setSearchComunidade] = useState("");
    const [searchDisciplina, setSearchDisciplina] = useState("");
    const [searchCategoria, setSearchCategoria] = useState("");

    const [loading, setLoading] = useState(false);
    const [viewMode, setViewMode] = useViewMode();

    const [deleteAnotacao, setDeleteAnotacao] = useState(false);

    const searchParams = {
        searchNome, setSearchNome,
        searchDateInicio, setSearchDateInicio,
        searchDateFim, setSearchDateFim,
        searchStatus, setSearchStatus,
        searchComunidade, setSearchComunidade,
        searchDisciplina, setSearchDisciplina,
        searchCategoria, setSearchCategoria,
        disciplinas, categorias,
    };

    const receiveAnotacoes = async (page = 1) => {
        setLoading(true);
        try {
            const { data } = await ApiUser.get(`/anotacao`, {
                params: {
                    page: page,
                    nome: searchNome,
                    data_inicio: searchDateInicio,
                    data_fim: searchDateFim,
                    status: searchStatus,
                    comunidade: searchComunidade,
                    categoria: searchCategoria,
                    disciplina: searchDisciplina
                }
            });
            setPagination(data.anotacoes);
            setAnotacoes(data.anotacoes.data);
            setDisciplinas(data.disciplinas);
            setCategorias(data.categorias);
        } catch (error) {
            console.error("Erro ao receber anotacões:", error);
        }
        setLoading(false);
    };

    const renderModalDelete = () => {
        const anotacao = anotacoes.find((anotacao) => anotacao.id === deleteAnotacao);
        return anotacao ? (
            <ModalDelete item={anotacao} delete={() => confirmDelete(anotacao.id)} cancel={() => setDeleteUser(null)} />
        ) : null;
    };

    const confirmDelete = async (anotacao) => {
        try {
            await ApiUser.delete(`/anotacao/${anotacao}`);
            receiveAnotacoes();
            setDeleteAnotacao(null);
            toast.success("Anotação excluída.", { theme: 'colored' });
        } catch (error) {
            console.log(error);
        }
    };

    const restoreAnotacoes = async (anotacao) => {
        try {
            await ApiUser.post(`/anotacao/restore/${anotacao}`)
            receiveAnotacoes();
            toast.success("Anotação restaurada.", { theme: 'colored' });
        } catch (error) {
            console.log(error)
        }
    }

    const handlePaginationClick = (newPage) => {
        receiveAnotacoes(newPage);
    };

    useEffect(() => {
        receiveAnotacoes();
    }, []);

    return (
        <div className="page-content">
            <MainHeader
                page='Anotações'
                text='Uma lista das suas anotações.'
                adicionar='/anotacoes/addedit/'
            />
            <Search
                searchParams={searchParams}
                viewMode={viewMode}
                setViewMode={setViewMode}
                buscar={receiveAnotacoes}
            />
            {loading ? (
                <Loading />
            ) : (
                <div className="conteudo-content">
                    {anotacoes.length === 0 ? (
                        <ErrorDenied />
                    ) : (
                        <>
                            {viewMode === 'card' && (
                                <div className="content-cards">
                                    {anotacoes.map((anotacao, i) => (
                                        <AnotacaoCard key={i} type='anotacoes' item={anotacao} delete={setDeleteAnotacao} restore={restoreAnotacoes} />
                                    ))}
                                </div>
                            )}
                            {viewMode === 'list' && (
                                <AnotacaoTable items={anotacoes} delete={setDeleteAnotacao} restore={restoreAnotacoes} />
                            )}
                        </>
                    )}
                    {pagination && (
                        <Pagination
                            pagination={pagination}
                            setPage={handlePaginationClick}
                        />
                    )}
                    {renderModalDelete()}
                </div>
            )}
        </div>
    )
}