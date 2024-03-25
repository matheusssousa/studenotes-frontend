import React, { useEffect, useState } from "react";
import MainHeader from "../../../components/Commons/MainHeader";
import ApiAdmin from "../../../services/ApiAdmin";
import { toast } from "react-toastify";
import Search from "../../../components/Commons/Search";
import Loading from "../../../components/Commons/Loading";
import { Link } from "react-router-dom";
import { ArrowClockwise, PencilSimple, TrashSimple } from "@phosphor-icons/react";
import ModalDelete from "../../../components/Commons/Modals/Delete";
import Pagination from "../../../components/Commons/Pagination";

export default function AdminsAdminPage(params) {
    const [admins, setAdmins] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [searchNome, setSearchNome] = useState("");
    const [searchDateInicio, setSearchDateInicio] = useState("");
    const [searchDateFim, setSearchDateFim] = useState("");
    const [searchStatus, setSearchStatus] = useState("");
    const [searchEmail, setSearchEmail] = useState("");
    const [searchId, setSearchId] = useState("");

    const [loading, setLoading] = useState(false);

    const [deleteAdmin, setDeleteAdmin] = useState(false);

    const receiveAdmins = async (page = 1) => {
        setLoading(true);
        try {
            const response = await ApiAdmin.get(`/admin`, {
                params: {
                    page: page,
                    name: searchNome,
                    id: searchId,
                    email: searchEmail,
                    created_at_inicio: searchDateInicio,
                    created_at_fim: searchDateFim,
                    delete: searchStatus
                }
            });
            console.log(response)
            setAdmins(response.data.data);
            setPagination(response.data);
        } catch (error) {
            console.error("Erro ao receber administradores:", error);
        }
        setLoading(false);
    };

    const deleteAdmins = async (admin) => {
        try {
            await ApiAdmin.delete(`/admin/${admin}`)
            setDeleteAdmin(false);
            receiveAdmins();
            toast.success("Administrador excluído.", {
                theme: 'colored',
            });
        } catch (error) {
            console.log(error);
        }
    }

    const restoreAdmins = async (admin) => {
        try {
            await ApiAdmin.post(`/admin/restore/${admin}`)
            receiveAdmins();
            toast.success("Administrador restaurado.", {
                theme: 'colored',
            });
        } catch (error) {
            console.log(error)
        }
    }

    const limparSearch = () => {
        setSearchNome("");
        setSearchEmail("");
        setSearchId("");
        setSearchDateFim("");
        setSearchDateInicio("");
        setSearchStatus("");
        receiveAdmins();
    };

    const handlePaginationClick = (newPage) => {
        receiveAdmins(newPage);
    };

    useEffect(() => {
        receiveAdmins();
    }, []);

    return (
        <div className="page-content">
            <MainHeader
                page='Administradores'
                text='Uma lista dos administradores cadastrados incluindo id, nome, email e status.'
                adicionar='/admin/admins/addedit/'
            />
            <Search
                type="administradores"
                nome={searchNome}
                setSearchNome={setSearchNome}
                email={searchEmail}
                setSearchEmail={setSearchEmail}
                id={searchId}
                setSearchId={setSearchId}
                data_inicio={searchDateInicio}
                setSearchDateInicio={setSearchDateInicio}
                data_fim={searchDateFim}
                setSearchDateFim={setSearchDateFim}
                status={searchStatus}
                setSearchStatus={setSearchStatus}
                limpar={limparSearch}
                buscar={receiveAdmins}
            />
            <div className="conteudo-content">
                <table>
                    <thead>
                        <tr className="table-row-header">
                            <th className="sticky w-[10%] rounded-tl-lg">ID</th>
                            <th className="sticky w-[40%]">Nome</th>
                            <th className="sticky w-[40%]">Email</th>
                            <th className="sticky w-[20%]">Status</th>
                            <th className="sticky w-[20%] rounded-tr-lg">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? <Loading /> :
                            (admins.map((admin, i) => (
                                <tr key={i} className="table-row-body">
                                    <td className="w-[10%] font-medium">{admin.id}</td>
                                    <td className="w-[40%]">{admin.name}</td>
                                    <td className="w-[40%]">{admin.email}</td>
                                    {admin.deleted_at === null ?
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
                                        {admin.deleted_at === null ?
                                            <div className="content-buttons-action">
                                                <Link to={`/admin/admins/addedit/${admin.id}`} className="edit-action-btn" title="Editar"><PencilSimple size={20} /></Link>
                                                <button type="button" className="delete-action-btn" title="Excluir" onClick={() => setDeleteAdmin(admin.id)}><TrashSimple size={20} /></button>
                                            </div>
                                            :
                                            <div>
                                                <button type="button" className="restore-action-btn" title="Restaurar" onClick={() => restoreAdmins(admin.id)} id="restore-button"><ArrowClockwise size={20} /></button>
                                            </div>
                                        }
                                    </td>
                                    {deleteAdmin === admin.id && <ModalDelete item={admin} delete={deleteAdmins} cancel={setDeleteAdmin} />}
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