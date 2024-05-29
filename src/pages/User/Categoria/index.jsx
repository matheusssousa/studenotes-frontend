import React, { useEffect, useState } from "react";
import ApiUser from "../../../services/ApiUser";
import MainHeader from "../../../components/Commons/MainHeader";
import Search from "../../../components/Commons/Search";
import Pagination from "../../../components/Commons/Pagination";
import { toast } from "react-toastify";
import ErrorDenied from "../../../components/Commons/ErrorDenied";
import Loading from "../../../components/Commons/Loading";

import Card from "../../../components/Commons/Card";
import Table from "../../../components/Commons/Table";
import ModalDelete from "../../../components/Commons/Modals/Delete";
import useViewMode from "../../../hooks/ViewMode";

export default function CategoriaUserPage() {
    const [categorias, setCategorias] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [searchNome, setSearchNome] = useState("");
    const [searchDateInicio, setSearchDateInicio] = useState("");
    const [searchDateFim, setSearchDateFim] = useState("");
    const [searchStatus, setSearchStatus] = useState("");

    const [loading, setLoading] = useState(false);
    const [viewMode, setViewMode] = useViewMode();

    const [deleteCategoria, setDeleteCategoria] = useState(false);

    const receiveCategorias = async (page = 1) => {
        setLoading(true);
        try {
            const response = await ApiUser.get(`/categoria`, {
                params: {
                    page: page,
                    nome: searchNome,
                    data_inicio: searchDateInicio,
                    data_fim: searchDateFim,
                    status: searchStatus
                }
            });
            setCategorias(response.data.data);
            setPagination(response.data);
        } catch (error) {
            console.error("Erro ao receber categorias:", error);
        }
        setLoading(false);
    };

    const deleteCategorias = async (categoria) => {
        setDeleteCategoria(categoria);
    };

    const renderModalDelete = () => {
        const categoria = categorias.find(categoria => categoria.id === deleteCategoria);
        if (!categoria) return null;

        return (
            <ModalDelete item={categoria} delete={() => confirmDelete(categoria.id)} cancel={() => setDeleteCategoria()} />
        );
    };

    const confirmDelete = async (categoria) => {
        try {
            await ApiUser.delete(`/categoria/${categoria}`);
            receiveCategorias();
            setDeleteCategoria();
            toast.success("Categoria excluída.", { theme: 'colored' });
        } catch (error) {
            console.log(error);
        }
    };

    const restoreCategorias = async (categoria) => {
        try {
            await ApiUser.post(`/categoria/restore/${categoria}`)
            receiveCategorias();
            toast.success("Categoria restaurada.", {
                theme: 'colored',
            });
        } catch (error) {
            console.log(error)
        }
    }

    const limparSearch = () => {
        setSearchNome("");
        setSearchDateFim("");
        setSearchDateInicio("");
        setSearchStatus("");
        receiveCategorias();
    };

    const handlePaginationClick = (newPage) => {
        receiveCategorias(newPage);
    };

    useEffect(() => {
        receiveCategorias();
    }, []);

    return (
        <div className="page-content">
            <MainHeader
                page='Categorias'
                text='Uma lista das suas categorias.'
                adicionar='/categorias/addedit/'
            />
            <Search
                type="categorias"
                nome={searchNome}
                setSearchNome={setSearchNome}
                data_inicio={searchDateInicio}
                setSearchDateInicio={setSearchDateInicio}
                data_fim={searchDateFim}
                setSearchDateFim={setSearchDateFim}
                status={searchStatus}
                setSearchStatus={setSearchStatus}
                viewMode={viewMode}
                setViewMode={setViewMode}
                limpar={limparSearch}
                buscar={receiveCategorias}
            />
            {loading ? (
                <Loading />
            ) : (
                <div className="conteudo-content">
                    {categorias.length === 0 ? (
                        <ErrorDenied />
                    ) : (
                        <>
                            {viewMode === 'card' && (
                                <div className="content-cards">
                                    {categorias.map((categoria, i) => (
                                        <Card key={i} type='categorias' item={categoria} delete={deleteCategorias} restore={restoreCategorias}/>
                                    ))}
                                </div>
                            )}
                            {viewMode === 'list' && (
                                <Table type="categorias" items={categorias} delete={deleteCategorias} restore={restoreCategorias} />
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
        </div >
    );
}
