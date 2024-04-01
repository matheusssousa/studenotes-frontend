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

    const receiveUsers = async (page = 1) => {
        setLoading(true);
        try {
            const response = await ApiAdmin.get(`/user`, {
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
            console.log(response)
            setUsuarios(response.data.data);
            setPagination(response.data);
        } catch (error) {
            console.error("Erro ao receber usuários:", error);
        }
        setLoading(false);
    };

    const deleteUsers = async (usuario) => {
        setDeleteUser(usuario);
    };

    const renderModalDelete = () => {
        const usuario = usuarios.find(usuario => usuario.id === deleteUser);
        if (!usuario) return null;

        return (
            <ModalDelete item={usuario} delete={() => confirmDelete(usuario.id)} cancel={() => setDeleteUser()} />
        );
    };

    const confirmDelete = async (usuario) => {
        try {
            await ApiAdmin.delete(`/user/${usuario}`);
            receiveUsers();
            setDeleteUser();
            toast.success("Usuário excluído.", { theme: 'colored' });
        } catch (error) {
            console.log(error);
        }
    };

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
        setSearchVerifyEmail("");
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
                verifyemail={searchVerifyEmail}
                setSearchVerifyEmail={setSearchVerifyEmail}
                data_inicio={searchDateInicio}
                setSearchDateInicio={setSearchDateInicio}
                data_fim={searchDateFim}
                setSearchDateFim={setSearchDateFim}
                status={searchStatus}
                setSearchStatus={setSearchStatus}
                viewMode={viewMode}
                setViewMode={setViewMode}
                limpar={limparSearch}
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
                                        <Card key={i} type='usuarios' item={usuario} delete={deleteUsers} restore={restoreUsers}/>
                                    ))}
                                </div>
                            )}
                            {viewMode === 'list' && (
                                <Table type="usuarios" items={usuarios} delete={deleteUsers} restore={restoreUsers} />
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