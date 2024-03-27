import React, { useEffect, useState } from "react";
import MainHeader from "../../../components/Commons/MainHeader";
import ApiAdmin from "../../../services/ApiAdmin";
import Pagination from "../../../components/Commons/Pagination";
import Loading from "../../../components/Commons/Loading";
import { Eye } from "@phosphor-icons/react";
import Search from "../../../components/Commons/Search";
import { Link } from "react-router-dom";
import ErrorDenied from "../../../components/Commons/ErrorDenied";

export default function LogsAdminPage(params) {
    const [logs, setLogs] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [searchNome, setSearchNome] = useState("");
    const [searchDateInicio, setSearchDateInicio] = useState("");
    const [searchDateFim, setSearchDateFim] = useState("");
    const [searchStatus, setSearchStatus] = useState("");

    const [loading, setLoading] = useState(false);

    const receiveLogs = async (page = 1) => {
        setLoading(true);
        try {
            const response = await ApiAdmin.get(`/log`, {
                params: {
                    page: page,
                    nome: searchNome,
                    status: searchStatus,
                    created_at_inicio: searchDateInicio,
                    created_at_fim: searchDateFim,
                }
            });
            console.log(response)
            setLogs(response.data.data);
            setPagination(response.data);
        } catch (error) {
            console.error("Erro ao receber logs:", error);
        }
        setLoading(false);
    };

    const limparSearch = () => {
        setSearchNome("");
        setSearchDateFim("");
        setSearchDateInicio("");
        setSearchStatus("");
        receiveLogs();
    };

    const handlePaginationClick = (newPage) => {
        receiveLogs(newPage);
    };

    useEffect(() => {
        receiveLogs();
    }, []);

    return (
        <div className="page-content">
            <MainHeader
                page='Logs'
                text='Uma lista dos logs do sistema.'
            />
            <Search
                type="logs"
                nome={searchNome}
                setSearchNome={setSearchNome}
                data_inicio={searchDateInicio}
                setSearchDateInicio={setSearchDateInicio}
                data_fim={searchDateFim}
                setSearchDateFim={setSearchDateFim}
                status={searchStatus}
                setSearchStatus={setSearchStatus}
                limpar={limparSearch}
                buscar={receiveLogs}
            />
            {loading ? (
                <Loading />
            ) : (
                <>
                    {logs.length === 0 ? (
                        <ErrorDenied />
                    ) : (
                        <div className="conteudo-content">
                            <table>
                                <thead>
                                    <tr className="table-row-header">
                                        <th className="sticky w-[10%] rounded-tl-lg">ID</th>
                                        <th className="sticky w-[40%]">Nome</th>
                                        <th className="sticky w-[40%] hidden md:table-cell">Ator</th>
                                        <th className="sticky w-[40%]">Status</th>
                                        <th className="sticky w-[20%] rounded-tr-lg">Ação</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {logs.map((log, i) => (
                                        <tr key={i} className="table-row-body">
                                            <td className="w-[10%] font-medium">{log.id}</td>
                                            <td className="w-[40%]">{log.log_name}</td>
                                            <td className="w-[40%] hidden md:table-cell">{log.log_name}</td>
                                            <td className="w-[40%] capitalize">{log.description}</td>
                                            <td className="w-[20%]">
                                                <div className="content-buttons-action">
                                                    <Link to={`/admin/logs/view/${log.id}`} className="view-action-btn" title="Visualizar"><Eye size={20} /></Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    <div>
                        {pagination && (
                            <Pagination
                                pagination={pagination}
                                setPage={handlePaginationClick}
                            />
                        )}
                    </div>
                </>
            )}
        </div>
    )
}