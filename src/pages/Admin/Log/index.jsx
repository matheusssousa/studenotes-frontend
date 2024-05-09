import React, { useEffect, useState } from "react";
import MainHeader from "../../../components/Commons/MainHeader";
import ApiAdmin from "../../../services/ApiAdmin";
import Pagination from "../../../components/Commons/Pagination";
import Loading from "../../../components/Commons/Loading";
import { Eye } from "@phosphor-icons/react";
import Search from "../../../components/Commons/Search";
import { Link } from "react-router-dom";
import ErrorDenied from "../../../components/Commons/ErrorDenied";
import moment from "moment";

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
                <div className="conteudo-content">
                    {logs.length === 0 ? (
                        <ErrorDenied />
                    ) : (
                        <table>
                            <thead>
                                <tr className="table-row-header">
                                    <th className="sticky w-[5%] rounded-tl-lg">ID</th>
                                    <th className="sticky w-[10%]">ID do Objeto</th>
                                    <th className="sticky w-[10%]">ID do Autor</th>
                                    <th className="sticky w-[10%]">Modelo</th>
                                    <th className="sticky w-[40%]">Ação</th>
                                    <th className="sticky w-[20%]">Dia/Horário</th>
                                    <th className="sticky w-[20%] rounded-tr-lg">Visualizar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {logs.map((log, i) => (
                                    <tr key={i} className="table-row-body">
                                        <td className="w-[5%] font-medium">{log.id}</td>
                                        <td className="w-[10%]">{log.subject_id}</td>
                                        <td className="w-[10%]">{log.causer_id}</td>
                                        <td className="w-[10%]">{log.log_name}</td>
                                        <td className="w-[40%]">{log.description}</td>
                                        <td className="w-[20%]">{moment(log.created_at).format('DD-MM-YYYY HH:mm')}</td>
                                        <td className="w-[20%]">
                                            <div className="content-buttons-action">
                                                <Link to={`/admin/logs/view/${log.id}`} className="view-action-btn" title="Visualizar"><Eye size={20} /></Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    <div>
                        {pagination && (
                            <Pagination
                                pagination={pagination}
                                setPage={handlePaginationClick}
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}