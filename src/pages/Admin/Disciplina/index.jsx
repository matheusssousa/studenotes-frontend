import React, { useEffect, useState } from "react";
import ApiAdmin from "../../../services/ApiAdmin";
import Pagination from "../../../components/Commons/Pagination";
import Search from "../../../components/Commons/Search";
import MainHeader from "../../../components/Commons/MainHeader";
import { ArrowClockwise, PencilSimple, TrashSimple } from "@phosphor-icons/react";
import ModalDelete from "../../../components/Commons/Modals/Delete";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Loading from "../../../components/Commons/Loading";

export default function DisciplinaAdminPage(params) {
    const [disciplinas, setDisciplinas] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [searchNome, setSearchNome] = useState("");
    const [searchDateInicio, setSearchDateInicio] = useState("");
    const [searchDateFim, setSearchDateFim] = useState("");
    const [searchStatus, setSearchStatus] = useState("");

    const [loading, setLoading] = useState(false);

    const [deleteDisciplina, setDeleteDisciplina] = useState(false);

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
        try {
            await ApiAdmin.delete(`/disciplina/${disciplina}`)
            setDeleteDisciplina(false);
            receiveDisciplinas();
            toast.success("Disciplina excluída.", {
                theme: 'colored',
            });
        } catch (error) {
            console.log(error);
        }
    }

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
                limpar={limparSearch}
                buscar={receiveDisciplinas}
            />
            <div className="conteudo-content">
                <table>
                    <thead>
                        <tr className="table-row-header">
                            <th className="sticky w-[20%] rounded-tl-lg">ID</th>
                            <th className="sticky w-[40%]">Nome</th>
                            <th className="sticky w-[20%]">Status</th>
                            <th className="sticky w-[20%] rounded-tr-lg">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? <Loading /> :
                            (disciplinas.map((disciplina, i) => (
                                <tr key={i} className="table-row-body">
                                    <td className="w-[20%] font-medium">{disciplina.id}</td>
                                    <td className="w-[40%]">{disciplina.nome}</td>
                                    {disciplina.deleted_at === null ?
                                        <td className="w-[20%]">
                                            <div className="active-card">
                                                Ativo
                                            </div>
                                        </td>
                                        :
                                        <td className="w-[20%]">
                                            <div className="inactive-card">
                                                Inativo
                                            </div>
                                        </td>
                                    }
                                    <td className="w-[20%]">
                                        {disciplina.deleted_at === null ?
                                            <div className="content-buttons-action">
                                                <Link to={`/admin/disciplinas/addedit/${disciplina.id}`} className="edit-action-btn" title="Editar"><PencilSimple size={20} /></Link>
                                                <button type="button" className="delete-action-btn" title="Excluir" onClick={() => setDeleteDisciplina(disciplina.id)}><TrashSimple size={20} /></button>
                                            </div>
                                            :
                                            <div>
                                                <button type="button" className="restore-action-btn" title="Restaurar" onClick={() => restoreDisciplinas(disciplina.id)} id="restore-button"><ArrowClockwise size={20} /></button>
                                            </div>
                                        }
                                    </td>
                                    {deleteDisciplina === disciplina.id && <ModalDelete item={disciplina} delete={deleteDisciplinas} cancel={setDeleteDisciplina} />}
                                </tr>
                            )))}
                    </tbody>
                </table>
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