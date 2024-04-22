import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ApiUser from "../../../services/ApiUser";
import HeaderAnotacao from "../../../components/Commons/Anotacao/Header";
import Loading from "../../../components/Commons/Loading";
import ModalDelete from "../../../components/Commons/Modals/Delete";

export default function ViewAnotacaoUserPage() {
    const params = useParams();
    const navigate = useNavigate();
    const [anotacao, setAnotacao] = useState();

    const [loading, setLoading] = useState(true);
    const [deleteAnotacao, setDeleteAnotacao] = useState(false);

    const receiveDados = async () => {
        try {
            const response = await ApiUser.get(`/anotacao/${params.id}`);
            setAnotacao(response.data);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    const confirmDelete = async (anotacao) => {
        try {
            await ApiUser.delete(`/anotacao/${anotacao}`);
            receiveAnotacoes();
            setDeleteAnotacao();
            toast.success("Anotação excluída.", { theme: 'colored' });
        } catch (error) {
            console.log(error);
        }
    };

    const restoreAnotacao = async (anotacao) => {
        try {
            await ApiUser.post(`/anotacao/restore/${anotacao}`)
            receiveDados();
            toast.success("Anotação restaurada.", { theme: 'colored' });
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (params.id) {
            receiveDados();
        }
    }, [params.id])

    return (
        <div className="page-content">
            {loading ? (
                <Loading />
            ) : (
                <div className="flex flex-col h-full items-center gap-5">
                    <HeaderAnotacao
                        anotacao={anotacao.id}
                        title={anotacao.nome}
                        disciplina={anotacao.disciplina && anotacao.disciplina.nome}
                        data={anotacao.data_prazo && anotacao.data_prazo}
                        categorias={anotacao.categorias && anotacao.categorias}
                        voltar="/anotacoes"
                        edit={`/anotacoes/addedit/${anotacao.id}`}
                        delete={setDeleteAnotacao}
                        restore={anotacao.deleted_at && restoreAnotacao}
                    />
                    <div className="w-full text-sm dark:text-neutro-100 text-justify break-all">
                        <p>{anotacao.texto}</p>
                    </div>

                    {/* USAR O REACT FILE VIEWER  */}

                    {anotacao.arquivos &&
                        <div className="flex flex-col gap-2">
                            {anotacao.arquivos.map((arquivo, index) => (
                                <a key={index} href={arquivo.arquivo} target="_blank" rel="noreferrer" className="text-sm dark:text-neutro-100 text-center underline">{arquivo.nome}</a>
                            ))}
                        </div>
                    }
                </div>
            )}
            {deleteAnotacao && <ModalDelete item={anotacao} delete={() => confirmDelete(anotacao.id)} cancel={() => setDeleteAnotacao(false)} />}
        </div>
    )
}