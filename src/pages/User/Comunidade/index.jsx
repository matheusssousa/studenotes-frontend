import React, { useEffect, useState } from "react";
import MainHeader from "../../../components/Commons/MainHeader";
import Search from "../../../components/Commons/Search";
import ApiUser from "../../../services/ApiUser";

import "./style.css";

export default function ComunidadeUserPage(params) {
    const [anotacoes, setAnotacoes] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);
    const [pagination, setPagination] = useState(null);

    const [searchNome, setSearchNome] = useState("");

    const [compartilhar, setCompartilhar] = useState(false);

    const [loading, setLoading] = useState(false);

    const receiveAnotacoes = async (page = 1) => {
        setLoading(true);
        try {
            const response = await ApiUser.get(`/comunidade`, {
                params: {
                    page: page,
                    nome: searchNome,
                }
            });
            setPagination(response.data.anotacoes);
            setAnotacoes(response.data.anotacoes);
            setDisciplinas(response.data.disciplinas);
        } catch (error) {
            console.error("Erro ao receber anotacões:", error);
        }
        setLoading(false);
    }

    const limparSearch = () => {
        setSearchNome("");
        receiveAnotacoes();
    }

    useEffect(() => {
        receiveAnotacoes();
    }, []);


    return (
        <div className="page-content">
            <div className="page-content-header">
                <MainHeader
                    page='Comunidade'
                    text='Bem-vindo a comunidade do StudeNotes.'
                />
                <button type="button">

                </button>
            </div>
            <Search
                type="anotações"
                limparSearch={limparSearch}
            />
            <div className="page-content-comunidade">
                <div>

                </div>
                <div>

                </div>
            </div>
        </div>
    )
}