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
import Card from "../../../components/Commons/Card";
import Table from "../../../components/Commons/Table";

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
    const [viewMode, setViewMode] = useViewMode();

    const [deleteAdmin, setDeleteAdmin] = useState();

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
        setDeleteAdmin(admin);
    };

    const renderModalDelete = () => {
        const admin = admins.find(admin => admin.id === deleteAdmin);
        if (!admin) return null;

        return (
            <ModalDelete item={admin} delete={() => confirmDelete(admin.id)} cancel={() => setDeleteAdmin()} />
        );
    };

    const confirmDelete = async (admin) => {
        try {
            await ApiAdmin.delete(`/admin/${admin}`);
            receiveAdmins();
            setDeleteAdmin()
            toast.success("Administrador excluído.", { theme: 'colored' });
        } catch (error) {
            console.log(error);
        }
    };

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
                viewMode={viewMode}
                setViewMode={setViewMode}
                limpar={limparSearch}
                buscar={receiveAdmins}
            />
            {loading ? (
                <Loading />
            ) : (
                <div className="conteudo-content">
                    {admins.length === 0 ? (
                        <ErrorDenied />
                    ) : (
                        <>
                            {viewMode === 'card' && (
                                <div>
                                    {admins.map((admin, i) => (
                                        <Card key={i} type='admins' item={admin} delete={deleteAdmins} />
                                    ))}
                                </div>
                            )}
                            {viewMode === 'list' && (
                                <Table type="admins" items={admins} delete={deleteAdmins} restore={restoreAdmins} />
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