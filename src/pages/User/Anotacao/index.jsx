import React, { useEffect, useState } from "react";
import MainHeader from "../../../components/Commons/MainHeader";
import Search from "../../../components/Commons/Search";
import ApiUser from "../../../services/ApiUser";
import { toast } from "react-toastify";
import Loading from "../../../components/Commons/Loading";
import ErrorDenied from "../../../components/Commons/ErrorDenied";
import Pagination from "../../../components/Commons/Pagination";

import Table from "../../../components/Commons/Table";
import ModalDelete from "../../../components/Commons/Modals/Delete";
import AnotacaoCard from "../../../components/Commons/Anotacao/Card";

export default function AnotacaoUserPage(params) {
    const [anotacoes, setAnotacoes] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [searchNome, setSearchNome] = useState("");
    const [searchDateInicio, setSearchDateInicio] = useState("");
    const [searchDateFim, setSearchDateFim] = useState("");
    const [searchStatus, setSearchStatus] = useState("");

    const [loading, setLoading] = useState(false);
    const [viewMode, setViewMode] = useState('card');

    const [deleteAnotacao, setDeleteAnotacao] = useState(false);

    const receiveAnotacoes = async (page = 1) => {
        setLoading(true);
        try {
            const response = await ApiUser.get(`/anotacao`, {
                params: {
                    page: page,
                    nome: searchNome,
                    data_inicio: searchDateInicio,
                    data_fim: searchDateFim,
                    status: searchStatus
                }
            });
            setAnotacoes(response.data.anotacoes.data);
            setDisciplinas(response.data.disciplinas);
            setCategorias(response.data.categorias);
        } catch (error) {
            console.error("Erro ao receber anotacões:", error);
        }
        setLoading(false);
    };

    const deleteAnotacoes = async (anotacao) => {
        setDeleteAnotacao(anotacao);
    };

    const renderModalDelete = () => {
        const anotacao = anotacoes.find(anotacao => anotacao.id === deleteAnotacao);
        if (!anotacao) return null;

        return (
            <ModalDelete item={anotacao} delete={() => confirmDelete(anotacao.id)} cancel={() => setDeleteAnotacao()} />
        );
    };

    const confirmDelete = async (anotacao) => {
        try {
            await ApiUser.delete(`/anotacao/${anotacao}`);
            receiveAnotacoes();
            setDeleteAnotacao();
            toast.success("Anotação excluída.", { theme: 'colored' });
        } catch (error) {
            console.log(error);
        }
    };

    const restoreAnotacoes = async (anotacao) => {
        try {
            await ApiUser.post(`/anotacao/restore/${anotacao}`)
            receiveAnotacoes();
            toast.success("Anotação restaurada.", {
                theme: 'colored',
            });
        } catch (error) {
            console.log(error)
        }
    }

    const limparSearch = () => {
        setSearchNome("");
        setSearchDateFim("");
        setSearchDateInicio("");
        setSearchStatus("");
        receiveAnotacoes();
    };

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
                type="anotações"
                nome={searchNome}
                setSearchNome={setSearchNome}
                data_inicio={searchDateInicio}
                setSearchDateInicio={setSearchDateInicio}
                data_fim={searchDateFim}
                setSearchDateFim={setSearchDateFim}
                status={searchStatus}
                setSearchStatus={setSearchStatus}
                viewMode={viewMode}
                setViewMode={setViewMode}
                disciplinas={disciplinas}
                categorias={categorias}
                limpar={limparSearch}
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
                                        <AnotacaoCard key={i} type='anotacoes' item={anotacao} delete={deleteAnotacoes} restore={restoreAnotacoes} />
                                    ))}
                                </div>
                            )}
                            {viewMode === 'list' && (
                                <Table type="anotacoes" items={anotacoes} delete={deleteAnotacoes} restore={restoreAnotacoes} />
                            )}
                        </>
                    )}
                    <div>
                        {pagination && (
                            <Pagination
                                pagination={pagination}
                                setPage={handlePaginationClick}
                            />
                        )}
                    </div>
                    {renderModalDelete()}
                </div>
            )}
        </div>
    )
}