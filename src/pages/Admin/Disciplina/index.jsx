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

    const searchParams = {
        searchNome, setSearchNome,
        searchDateInicio, setSearchDateInicio,
        searchDateFim, setSearchDateFim,
        searchStatus, setSearchStatus,
    };

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
            setDisciplinas(response.data.data);
            setPagination(response.data);
        } catch (error) {
            console.error("Erro ao receber disciplinas:", error);
        }
        setLoading(false);
    };

    const renderModalDelete = () => {
        const disciplina = disciplinas.find(disciplina => disciplina.id === deleteDisciplina);
        return disciplina ? (
            <ModalDelete item={disciplina} delete={() => confirmDelete(disciplina.id)} cancel={() => setDeleteDisciplina(null)} />
        ) : null;
    };

    const confirmDelete = async (disciplinaId) => {
        try {
            await ApiAdmin.delete(`/disciplina/${disciplinaId}`);
            receiveDisciplinas();
            setDeleteDisciplina(null);
            toast.success("Disciplina excluída com sucesso.", { theme: 'colored' });
        } catch (error) {
            console.log(error);
        }
    };

    const restoreDisciplinas = async (disciplina) => {
        try {
            await ApiAdmin.post(`/disciplina/restore/${disciplina}`)
            receiveDisciplinas();
            toast.success("Disciplina restaurada.", { theme: 'colored', });
        } catch (error) {
            console.log(error)
        }
    }

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
                searchParams={searchParams}
                viewMode={viewMode}
                setViewMode={setViewMode}
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
                                        <Card key={i} type='disciplinas' admin={true} item={disciplina} delete={setDeleteDisciplina} restore={restoreDisciplinas} />
                                    ))}
                                </div>
                            )}
                            {viewMode === 'list' && (
                                <Table type="disciplinas" admin={true} items={disciplinas} delete={setDeleteDisciplina} restore={restoreDisciplinas} />
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