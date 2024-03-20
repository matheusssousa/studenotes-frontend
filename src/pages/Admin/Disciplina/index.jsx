import React, { useEffect, useState } from "react";
import ApiAdmin from "../../../services/ApiAdmin";
import Pagination from "../../../components/Commons/Pagination";
import Search from "../../../components/Commons/Search";
import MainHeader from "../../../components/Commons/MainHeader";
import Loading from "../../../components/Commons/Loading";
import { ArrowClockwise, PencilSimple, TrashSimple } from "@phosphor-icons/react";

export default function DisciplinaAdminPage(params) {
    const [disciplinas, setDisciplinas] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [searchNome, setSearchNome] = useState("");
    const [searchDateInicio, setSearchDateInicio] = useState("");
    const [searchDateFim, setSearchDateFim] = useState("");
    const [searchStatus, setSearchStatus] = useState("");

    const [cadastrarDisciplina, setCadastrarDisciplina] = useState(false);

    const receiveDisciplinas = async (page = 1) => {
        try {
            const response = await ApiAdmin.get(`/disciplina`, {
                params: {
                    page: page,
                    nome: searchNome,
                    data_inicio: searchDateInicio,
                    data_fim: searchDateFim,
                    delete: searchStatus
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
        setSearchStatus("");
        receiveDisciplinas();
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
                <table className="w-full bg-white rounded-lg text-sm table-auto relative">
                    <thead>
                        <tr className="table-row-header">
                            <th className="sticky w-[20%] rounded-tl-lg">ID</th>
                            <th className="sticky w-[40%]">Nome</th>
                            <th className="sticky w-[20%]">Status</th>
                            <th className="sticky w-[20%] rounded-tr-lg">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {disciplinas.map((disciplina, i) => (
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
                                            <button type="button" className="edit-action-btn" title="Editar"><PencilSimple size={20} /></button>
                                            <button type="button" className="delete-action-btn" title="Excluir"><TrashSimple size={20} /></button>
                                        </div>
                                        :
                                        <div>
                                            <button type="button" className="restore-action-btn" title="Restaurar"><ArrowClockwise size={20} /></button>
                                        </div>
                                    }
                                </td>
                            </tr>
                        ))}
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