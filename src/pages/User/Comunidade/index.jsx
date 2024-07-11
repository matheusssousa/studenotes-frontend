import React, { useEffect, useState, useRef, useCallback } from "react";
import MainHeader from "../../../components/Commons/MainHeader";
import Search from "../../../components/Commons/Search";
import ApiUser from "../../../services/ApiUser";
import { Share } from "@phosphor-icons/react";
import CardComunidade from "../../../components/Commons/Anotacao/CardComunidade";
import TopsComunity from "../../../components/Commons/TopsComunity";
import LoadingMini from "../../../components/Commons/LoadingMini";
import ErrorDenied from "../../../components/Commons/ErrorDenied";

import "./style.css";

export default function ComunidadeUserPage() {
    const [anotacoes, setAnotacoes] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);
    const [page, setPage] = useState(1);
    const [searchNome, setSearchNome] = useState("");
    const [searchDisciplina, setSearchDisciplina] = useState("");
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const observer = useRef();

    const searchParams = {
        searchNome, setSearchNome,
        searchDisciplina, setSearchDisciplina,
        disciplinas,
    }

    const fetchAnotacoes = async (params) => {
        setLoading(true);
        try {
            const { data } = await ApiUser.get('/comunidade/', { params });
            return data;
        } catch (error) {
            console.error(error);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const updateAnotacoes = async (params, reset = false) => {
        const data = await fetchAnotacoes(params);
        if (data) {
            setAnotacoes(prevAnotacoes => reset ? data.anotacoes.data : [...prevAnotacoes, ...data.anotacoes.data]);
            setDisciplinas(data.disciplinas);
            setHasMore(params.page < data.anotacoes.last_page);
        }
    };

    useEffect(() => {
        updateAnotacoes({ page, nome: searchNome, disciplina: searchDisciplina }, page === 1);
    }, [page, searchNome, searchDisciplina]);

    const handleSearch = ({ nome, disciplina }) => {
        setSearchNome(nome);
        setSearchDisciplina(disciplina);
        setPage(1);
        setAnotacoes([]);
        setHasMore(true);
    };

    const handleDisciplinaSearch = (disciplina) => {
        setSearchDisciplina(disciplina);
        setPage(1);
        setAnotacoes([]);
        setHasMore(true);
    };

    const lastAnotacaoRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    return (
        <div className="page-content">
            <div className="page-content-header">
                <MainHeader
                    page='Comunidade'
                    text='Bem-vindo a comunidade do StudeNotes.'
                />
                <button type="button" className="btn-compartilhar">
                    <Share size={16} />
                    Compartilhar
                </button>
            </div>
            <Search
                searchParams={searchParams}
                onSearch={handleSearch}
            />
            <div className="page-content-comunidade">
                <div className="content-anotacoes-comunidade">
                    {anotacoes.length === 0 ? (
                        !loading && <ErrorDenied />
                    ) : (
                        anotacoes.map((anotacao, index) => (
                            <CardComunidade
                                ref={index === anotacoes.length - 1 ? lastAnotacaoRef : null}
                                key={anotacao.id}
                                anotacao={anotacao}
                            />
                        ))
                    )}
                    {loading && <LoadingMini />}
                </div>
                <div className="content-tops-comunidade">
                    <TopsComunity setSearchDisciplina={handleDisciplinaSearch} searchDisciplina={searchDisciplina} />
                </div>
            </div>
        </div>
    );
}
