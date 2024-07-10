import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiUser from "../../../services/ApiUser";
import Loading from "../../../components/Commons/Loading";
import HeaderAnotacao from "../../../components/Commons/Anotacao/Header";
import Comentarios from "../../../components/Commons/Comentario/Comentarios";
import Arquivos from "../../../components/Commons/Arquivos";

export default function ViewComunidadeUserPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [anotacao, setAnotacao] = useState(null);
    const [loading, setLoading] = useState(true);

    const receiveDados = async () => {
        setLoading(true);
        try {
            const response = await ApiUser.get(`/comunidade/${id}`);
            setAnotacao(response.data);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const anotacaoInfo = useMemo(() => ({
        id: anotacao?.id,
        nome: anotacao?.nome,
        disciplina: anotacao?.disciplina,
        data_prazo: anotacao?.data_prazo,
        categorias: anotacao?.categorias,
        comunidade: anotacao?.comunidade,
        username: anotacao?.user,
        curtida: anotacao?.curtida,
    }), [anotacao]);

    useEffect(() => {
        if (id) {
            receiveDados();
        }
    }, [id]);

    return (
        <div className="page-content">
            {loading ? (
                <Loading />
            ) : (
                <div className="flex flex-col h-full items-center gap-5">
                    <HeaderAnotacao
                        params={anotacaoInfo}
                        voltar="/comunidade"
                    />
                    <div className="w-full text-sm rounded-lg min-h-[60%] bg-neutro-200 dark:bg-neutro-500 dark:text-neutro-100 p-1 md:p-5 text-justify break-all whitespace-pre-wrap">
                        <p>{anotacao.texto}</p>
                    </div>
                    <Arquivos arquivos={anotacao.arquivos} />
                    <Comentarios comentarios={anotacao.comentarios} anotacao={anotacao.id}/>
                </div>
            )}
        </div>
    );
}
