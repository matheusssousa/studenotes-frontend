import React, { useEffect, useState } from "react";
import ApiAdmin from "../../../services/ApiAdmin";
import Pagination from "../../../components/Commons/Pagination";
import Search from "../../../components/Commons/Search";
import MainHeader from "../../../components/Commons/MainHeader";
import ModalDelete from "../../../components/Commons/Modals/Delete";
import { toast } from "react-toastify";
import Loading from "../../../components/Commons/Loading";
import ErrorDenied from "../../../components/Commons/ErrorDenied";
import Card from "../../../components/Commons/Card";
import Table from "../../../components/Commons/Table";
import useViewMode from "../../../hooks/ViewMode";

export default function DisciplinaAdminPage(params) {
    const [disciplinas, setDisciplinas] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [searchNome, setSearchNome] = useState("");
    const [searchDateInicio, setSearchDateInicio] = useState("");
    const [searchDateFim, setSearchDateFim] = useState("");
    const [searchStatus, setSearchStatus] = useState("");

    const [loading, setLoading] = useState(false);
    const [viewMode, setViewMode] = useViewMode();

    const [deleteDisciplina, setDeleteDisciplina] = useState();

    const receiveDisciplinas = async (page = 1) => {
        setLoading(true);
        try {
            const response = await ApiAdmin.get(`/disciplina`, {
                params: {
                    page: page,
                    nome: searchNome,
                    created_at_inicio: searchDateInicio,
                    created_at_fim: searchDateFim,
                    delete: searchStatus
                }
            });
            console.log(response)
            setDisciplinas(response.data.data);
            setPagination(response.data);
        } catch (error) {
            console.error("Erro ao receber disciplinas:", error);
        }
        setLoading(false);
    };

    const deleteDisciplinas = async (disciplina) => {
        setDeleteDisciplina(disciplina);
        console.log(deleteDisciplina);
    };

    const renderModalDelete = () => {
        const disciplina = disciplinas.find(disciplina => disciplina.id === deleteDisciplina);
        if (!disciplina) return null;

        return (
            <ModalDelete item={disciplina} delete={() => confirmDelete(disciplina.id)} cancel={() => setDeleteDisciplina()} />
        );
    };

    const confirmDelete = async (disciplinaId) => {
        try {
            await ApiAdmin.delete(`/disciplina/${disciplinaId}`);
            receiveDisciplinas();
            setDeleteDisciplina();
            toast.success("Disciplina excluída.", { theme: 'colored' });
        } catch (error) {
            console.log(error);
        }
    };

    const restoreDisciplinas = async (disciplina) => {
        try {
            await ApiAdmin.post(`/disciplina/restore/${disciplina}`)
            receiveDisciplinas();
            toast.success("Disciplina restaurada.", {
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
        receiveDisciplinas();
    };

    const handlePaginationClick = (newPage) => {
        receiveDisciplinas(newPage);
    };

    useEffect(() => {
        receiveDisciplinas();
    }, []);


    return (
        <div className="page-content">
            <MainHeader
                page='Disciplinas'
                text='Uma lista das disciplinas cadastradas incluindo id, nome e status.'
                adicionar='/admin/disciplinas/addedit/'
            />
            <Search
                type="disciplinas"
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
                limpar={limparSearch}
                buscar={receiveDisciplinas}
            />
            {loading ? (
                <Loading />
            ) : (
                <div className="conteudo-content">
                    {disciplinas.length === 0 ? (
                        <ErrorDenied />
                    ) : (
                        <>
                            {viewMode === 'card' && (
                                <div className="content-cards">
                                    {disciplinas.map((disciplina, i) => (
                                        <Card key={i} type='disciplinas' item={disciplina} delete={deleteDisciplinas} />
                                    ))}
                                </div>
                            )}
                            {viewMode === 'list' && (
                                <Table type="disciplinas" items={disciplinas} delete={deleteDisciplinas} restore={restoreDisciplinas} />
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