import React, { useEffect, useState } from "react";
import Search from "../../../components/Commons/Search";
import MainHeader from "../../../components/Commons/MainHeader";
import Loading from "../../../components/Commons/Loading";
import ErrorDenied from "../../../components/Commons/ErrorDenied";
import Table from "../../../components/Commons/Table";
import Pagination from "../../../components/Commons/Pagination";
import ApiAdmin from "../../../services/ApiAdmin";
import moment from "moment";
import { Link } from "react-router-dom";
import { Eye } from "@phosphor-icons/react";

export default function DenunciaAdminPage(params) {
    const [denuncias, setDenuncias] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [searchNome, setSearchNome] = useState("");
    const [searchDateInicio, setSearchDateInicio] = useState("");
    const [searchDateFim, setSearchDateFim] = useState("");
    const [searchStatusDenuncia, setSearchStatusDenuncia] = useState("pendente");
    const [searchType, setSearchType] = useState("");
    // const [searchUser, setSearchUser] = useState("");

    const [loading, setLoading] = useState(false);

    const searchParams = {
        searchNome, setSearchNome,
        searchDateInicio, setSearchDateInicio,
        searchDateFim, setSearchDateFim,
        searchStatusDenuncia, setSearchStatusDenuncia,
        searchType, setSearchType,
        // searchUser, setSearchUser,
    };

    const receiveDenuncias = async (page = 1) => {
        setLoading(true);
        try {
            const {data} = await ApiAdmin.get(`/denuncia`, {
                params: {
                    page: page,
                    observacao: searchNome,
                    created_at_inicio: searchDateInicio,
                    created_at_fim: searchDateFim,
                    status: searchStatusDenuncia,
                    denunciado_type: searchType,
                }
            });
            setDenuncias(data.data);
            setPagination(data);
        } catch (error) {
            console.error("Erro ao receber disciplinas:", error);
        }
        setLoading(false);
    };

    const handlePaginationClick = (newPage) => {
        receiveDenuncias(newPage);
    };

    useEffect(() => {
        receiveDenuncias();
    }, []);

    return (
        <div className="page-content">
            <MainHeader
                page='Denúncias'
                text='Uma lista das denúncias cadastradas incluindo id, nome e status.'
            />
            <Search
                searchParams={searchParams}
                buscar={receiveDenuncias}
            />
            {loading ? (
                <Loading />
            ) : (
                <div className="conteudo-content">
                    {denuncias.length === 0 ? (
                        <ErrorDenied />
                    ) : (
                        <table>
                            <thead>
                                <tr className="table-row-header">
                                    <th className="sticky w-[5%] rounded-tl-lg">ID</th>
                                    <th className="sticky w-[10%]">Tipo</th>
                                    <th className="sticky w-[40%]">Motivo</th>
                                    <th className="sticky w-[20%]">Status</th>
                                    <th className="sticky w-[20%]">Dia/Horário</th>
                                    <th className="sticky w-[20%] rounded-tr-lg">Visualizar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {denuncias.map((denuncia, i) => (
                                    <tr key={i} className="table-row-body">
                                        <td className="w-[5%] font-medium">{denuncia.id}</td>
                                        <td className="w-[10%]">{denuncia.denunciado_type}</td>
                                        <td className="w-[40%]">{denuncia.motivo.map((motivo, i) => (
                                            <p key={i}>{motivo}</p>
                                        ))}</td>
                                        <td className="w-[20%] capitalize">{denuncia.status}</td>
                                        <td className="w-[20%]">{moment(denuncia.created_at).format('DD-MM-YYYY HH:mm')}</td>
                                        <td className="w-[20%]">
                                            <div className="content-buttons-action">
                                                <Link to={`/admin/denuncias/view/${denuncia.id}`} className="view-action-btn" title="Visualizar"><Eye size={20} /></Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    {pagination && (
                        <Pagination
                            pagination={pagination}
                            setPage={handlePaginationClick}
                        />
                    )}
                </div>
            )}
        </div>
    )
}