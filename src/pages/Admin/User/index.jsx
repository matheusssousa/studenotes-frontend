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

export default function UserAdminPage(params) {
    const [usuarios, setUsuarios] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [searchNome, setSearchNome] = useState("");
    const [searchDateInicio, setSearchDateInicio] = useState("");
    const [searchDateFim, setSearchDateFim] = useState("");
    const [searchStatus, setSearchStatus] = useState("");
    const [searchEmail, setSearchEmail] = useState("");
    const [searchId, setSearchId] = useState("");

    const [loading, setLoading] = useState(false);

    const [deleteUser, setDeleteUser] = useState(false);

    const receiveUsers = async (page = 1) => {
        setLoading(true);
        try {
            const response = await ApiAdmin.get(`/user`, {
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
            setUsuarios(response.data.data);
            setPagination(response.data);
        } catch (error) {
            console.error("Erro ao receber usuários:", error);
        }
        setLoading(false);
    };

    const deleteUsers = async (user) => {
        try {
            await ApiAdmin.delete(`/user/${user}`)
            setDeleteUser(false);
            receiveUsers();
            toast.success("Usuário excluído.", {
                theme: 'colored',
            });
        } catch (error) {
            console.log(error);
        }
    }

    const restoreUsers = async (user) => {
        try {
            await ApiAdmin.post(`/user/restore/${user}`)
            receiveUsers();
            toast.success("Usuário restaurada.", {
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
        receiveUsers();
    };

    const handlePaginationClick = (newPage) => {
        receiveUsers(newPage);
    };

    useEffect(() => {
        receiveUsers();
    }, []);

    return (
        <div className="page-content">
            <MainHeader
                page='Usuários'
                text='Uma lista das usuários cadastrados incluindo id, nome, email e status.'
            />
            <Search
                type="usuários"
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
                buscar={receiveUsers}
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
                            (usuarios.map((usuario, i) => (
                                <tr key={i} className="table-row-body">
                                    <td className="w-[10%] font-medium">{usuario.id}</td>
                                    <td className="w-[40%]">{usuario.name}</td>
                                    <td className="w-[40%]">{usuario.email}</td>
                                    {usuario.deleted_at === null ?
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
                                        {usuario.deleted_at === null ?
                                            <div className="content-buttons-action">
                                                <Link to={`/admin/usuarios/addedit/${usuario.id}`} className="edit-action-btn" title="Editar"><PencilSimple size={20} /></Link>
                                                <button type="button" className="delete-action-btn" title="Excluir" onClick={() => setDeleteUser(usuario.id)}><TrashSimple size={20} /></button>
                                            </div>
                                            :
                                            <div>
                                                <button type="button" className="restore-action-btn" title="Restaurar" onClick={() => restoreUsers(usuario.id)} id="restore-button"><ArrowClockwise size={20} /></button>
                                            </div>
                                        }
                                    </td>
                                    {deleteUser === usuario.id && <ModalDelete item={usuario} delete={deleteUsers} cancel={setDeleteUser} />}
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