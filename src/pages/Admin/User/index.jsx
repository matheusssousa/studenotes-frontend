import React, { useEffect, useState } from "react";
import MainHeader from "../../../components/Commons/MainHeader";
import ApiAdmin from "../../../services/ApiAdmin";
import { toast } from "react-toastify";
import Search from "../../../components/Commons/Search";
import Loading from "../../../components/Commons/Loading";
import ModalDelete from "../../../components/Commons/Modals/Delete";
import Pagination from "../../../components/Commons/Pagination";
import ErrorDenied from "../../../components/Commons/ErrorDenied";
import useViewMode from "../../../hooks/ViewMode";
import Table from "../../../components/Commons/Table";
import Card from "../../../components/Commons/Card";

export default function UserAdminPage(params) {
    const [usuarios, setUsuarios] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [searchNome, setSearchNome] = useState("");
    const [searchDateInicio, setSearchDateInicio] = useState("");
    const [searchDateFim, setSearchDateFim] = useState("");
    const [searchStatus, setSearchStatus] = useState("");
    const [searchEmail, setSearchEmail] = useState("");
    const [searchVerifyEmail, setSearchVerifyEmail] = useState("");

    const [loading, setLoading] = useState(false);
    const [viewMode, setViewMode] = useViewMode();

    const [deleteUser, setDeleteUser] = useState();

    const searchParams = {
        searchNome, setSearchNome,
        searchDateInicio, setSearchDateInicio,
        searchDateFim, setSearchDateFim,
        searchStatus, setSearchStatus,
        searchEmail, setSearchEmail,
        searchVerifyEmail, setSearchVerifyEmail
    };

    const receiveUsers = async (page = 1) => {
        setLoading(true);
        try {
            const { data } = await ApiAdmin.get(`/user`, {
                params: {
                    page: page,
                    name: searchNome,
                    email: searchEmail,
                    emailverify: searchVerifyEmail,
                    created_at_inicio: searchDateInicio,
                    created_at_fim: searchDateFim,
                    delete: searchStatus
                }
            });
            setUsuarios(data.data);
            setPagination(data);
        } catch (error) {
            console.error("Erro ao receber usuários:", error);
        }
        setLoading(false);
    };

    const renderModalDelete = () => {
        const usuario = usuarios.find((usuario) => usuario.id === deleteUser);
        return usuario ? (
            <ModalDelete item={usuario} delete={() => confirmDelete(usuario.id)} cancel={() => setDeleteUser(null)} />
        ) : null;
    };

    const confirmDelete = async (usuario) => {
        try {
            await ApiAdmin.delete(`/user/${usuario}`);
            receiveUsers();
            setDeleteUser(null);
            toast.success("Usuário excluído com sucesso.", { theme: 'colored' });
        } catch (error) {
            console.error(error);
        }
    };

    const restoreUsers = async (user) => {
        try {
            await ApiAdmin.post(`/user/restore/${user}`)
            receiveUsers();
            toast.success("Usuário restaurado.", { theme: 'colored' });
        } catch (error) {
            console.log(error)
        }
    }

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
                text='Uma lista dos usuários cadastrados incluindo id, nome, email e status.'
            />
            <Search
                searchParams={searchParams}
                viewMode={viewMode}
                setViewMode={setViewMode}
                buscar={receiveUsers}
            />
            {loading ? (
                <Loading />
            ) : (
                <div className="conteudo-content">
                    {usuarios.length === 0 ? (
                        <ErrorDenied />
                    ) : (
                        <>
                            {viewMode === 'card' && (
                                <div className="content-cards">
                                    {usuarios.map((usuario, i) => (
                                        <Card key={i} type='usuarios' admin={true} item={usuario} delete={setDeleteUser} restore={restoreUsers} />
                                    ))}
                                </div>
                            )}
                            {viewMode === 'list' && (
                                <Table type="usuarios" admin={true} items={usuarios} delete={setDeleteUser} restore={restoreUsers} />
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
