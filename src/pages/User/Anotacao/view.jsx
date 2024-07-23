import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ApiUser from "../../../services/ApiUser";
import HeaderAnotacao from "../../../components/Commons/Anotacao/Header";
import Loading from "../../../components/Commons/Loading";
import ModalDelete from "../../../components/Commons/Modals/Delete";
import Arquivos from "../../../components/Commons/Arquivos";

const AnotacaoContent = ({ anotacao, setDeleteAnotacao, restoreAnotacao }) => {
    const anotacaoInfo = useMemo(() => ({
        id: anotacao?.id,
        nome: anotacao?.nome,
        disciplina: anotacao?.disciplina,
        data_prazo: anotacao?.data_prazo,
        categorias: anotacao?.categorias,
        comunidade: anotacao?.comunidade,
        username: anotacao?.user,
        use_gpt: anotacao?.use_gpt,
    }), [anotacao]);

    return (
        <div className="flex flex-col h-full items-center gap-5">
            <HeaderAnotacao
                params={anotacaoInfo}
                voltar="/anotacoes"
                onDelete={setDeleteAnotacao}
                restore={anotacao.deleted_at && restoreAnotacao}
            />
            <div className="w-full text-sm rounded-lg min-h-[60%] bg-neutro-200 dark:bg-neutro-500 dark:text-neutro-100 p-1 md:p-5 text-justify break-all whitespace-pre-wrap">
                <p>{anotacao.texto}</p>
            </div>
            <Arquivos arquivos={anotacao.arquivos} />
        </div>
    )
};

export default function ViewAnotacaoUserPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [anotacao, setAnotacao] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleteAnotacao, setDeleteAnotacao] = useState(false);

    useEffect(() => {
        if (id) {
            receiveDados();
        }
    }, [id]);

    const receiveDados = async () => {
        setLoading(true);
        try {
            const response = await ApiUser.get(`/anotacao/${id}`);
            setAnotacao(response.data);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const restoreAnotacao = async () => {
        try {
            await ApiUser.post(`/anotacao/restore/${anotacao.id}`);
            receiveDados();
            toast.success("Anotação restaurada.", { theme: 'colored' });
        } catch (error) {
            console.error(error);
        }
    };

    const confirmDelete = async () => {
        try {
            await ApiUser.delete(`/anotacao/${anotacao.id}`);
            navigate('/anotacoes');
            toast.success("Anotação excluída.", { theme: 'colored' });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="page-content">
            {loading ? (
                <Loading />
            ) : (
                <AnotacaoContent
                    anotacao={anotacao}
                    setDeleteAnotacao={setDeleteAnotacao}
                    restoreAnotacao={restoreAnotacao}
                />
            )}
            {deleteAnotacao && (
                <ModalDelete
                    item={anotacao}
                    delete={confirmDelete}
                    cancel={() => setDeleteAnotacao(false)}
                />
            )}
        </div>
    );
}
