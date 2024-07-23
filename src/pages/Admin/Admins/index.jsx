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
    const [searchVerifyEmail, setSearchVerifyEmail] = useState("");

    const [loading, setLoading] = useState(false);
    const [viewMode, setViewMode] = useViewMode();

    const [deleteAdmin, setDeleteAdmin] = useState();

    const searchParams = {
        searchNome, setSearchNome,
        searchDateInicio, setSearchDateInicio,
        searchDateFim, setSearchDateFim,
        searchStatus, setSearchStatus,
        searchEmail, setSearchEmail,
        searchVerifyEmail, setSearchVerifyEmail
    };

    const receiveAdmins = async (page = 1) => {
        setLoading(true);
        try {
            const { data } = await ApiAdmin.get(`/admin`, {
                params: {
                    page: page,
                    name: searchNome,
                    emailverify: searchVerifyEmail,
                    email: searchEmail,
                    created_at_inicio: searchDateInicio,
                    created_at_fim: searchDateFim,
                    delete: searchStatus
                }
            });
            setAdmins(data.data);
            setPagination(data);
        } catch (error) {
            console.error("Erro ao receber administradores:", error);
        }
        setLoading(false);
    };

    const renderModalDelete = () => {
        const admin = admins.find((admin) => admin.id === deleteAdmin);
        return admin ? (
            <ModalDelete item={admin} delete={() => confirmDelete(admin.id)} cancel={() => setDeleteUser(null)} />
        ) : null;
    };

    const confirmDelete = async (admin) => {
        try {
            await ApiAdmin.delete(`/admin/${admin}`);
            receiveAdmins();
            setDeleteAdmin(null)
            toast.success("Administrador excluído.", { theme: 'colored' });
        } catch (error) {
            console.log(error);
        }
    };

    const restoreAdmins = async (admin) => {
        try {
            await ApiAdmin.post(`/admin/restore/${admin}`)
            receiveAdmins();
            toast.success("Administrador restaurado.", { theme: 'colored', });
        } catch (error) {
            console.log(error)
        }
    }

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
                searchParams={searchParams}
                viewMode={viewMode}
                setViewMode={setViewMode}
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
                                <div className="content-cards">
                                    {admins.map((admin, i) => (
                                        <Card key={i} type='admins' admin={true} item={admin} delete={setDeleteAdmin} restore={restoreAdmins} />
                                    ))}
                                </div>
                            )}
                            {viewMode === 'list' && (
                                <Table type="admins" admin={true} items={admins} delete={setDeleteAdmin} restore={restoreAdmins} />
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