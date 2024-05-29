import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ApiUser from "../../../services/ApiUser";
import HeaderAnotacao from "../../../components/Commons/Anotacao/Header";
import Loading from "../../../components/Commons/Loading";
import ModalDelete from "../../../components/Commons/Modals/Delete";
import { FileDoc, FileJpg, FilePdf, FilePng } from "@phosphor-icons/react";

export default function ViewAnotacaoUserPage() {
    const params = useParams();
    const navigate = useNavigate();
    const [anotacao, setAnotacao] = useState();

    const [loading, setLoading] = useState(true);
    const [deleteAnotacao, setDeleteAnotacao] = useState(false);

    const receiveDados = async () => {
        setLoading(true);
        try {
            const response = await ApiUser.get(`/anotacao/${params.id}`);
            setAnotacao(response.data);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    const restoreAnotacao = async (anotacao) => {
        try {
            await ApiUser.post(`/anotacao/restore/${anotacao}`)
            receiveDados();
            toast.success("Anotação restaurada.", { theme: 'colored' });
        } catch (error) {
            console.log(error)
        }
    }

    const confirmDelete = async (anotacao) => {
        try {
            await ApiUser.delete(`/anotacao/${anotacao}`);
            navigate('/anotacoes');
            toast.success("Anotação excluída.", { theme: 'colored' });
        } catch (error) {
            console.log(error);
        }
    };

    const tipoArquivo = (type) => {
        switch (type) {
            case 'pdf':
                return <FilePdf size={25}/>;
            case 'doc' || 'docx':
                return <FileDoc size={25}/>;
            case 'jpg' || 'jpeg':
                return <FileJpg size={25}/>;
            case 'png':
                return <FilePng size={25}/>;
            default:
                break;
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
                    <div className="w-full text-sm rounded-lg min-h-[60%] bg-neutro-200 dark:bg-neutro-500 dark:text-neutro-100 p-1 md:p-5 text-justify break-all whitespace-pre-wrap">
                        <p>{anotacao.texto}</p>
                    </div>

                    {anotacao.arquivos.length > 0 &&
                        <div className="w-full text-sm rounded-lg bg-neutro-200 dark:bg-neutro-500 dark:text-neutro-100 p-1 md:p-5 flex gap-2">
                            {anotacao.arquivos.map((arquivo, index) => (
                                <a key={index} href={`http://localhost:8000/storage/${arquivo.arquivo}`} target="_blank" rel="noreferrer" className="rounded-md bg-neutro-100 dark:bg-neutro-600 dark:text-neutro-100 p-2 hover:bg-neutro-150 dark:hover:bg-neutro-400 duration-200 ease-in flex gap-1 items-center">
                                    <span>{tipoArquivo(arquivo.tipo)}</span>
                                    <p>{arquivo.nome}</p>
                                </a>
                            ))}
                        </div>
                    }
                </div>
            )}
            {deleteAnotacao && <ModalDelete item={anotacao} delete={() => confirmDelete(anotacao.id)} cancel={() => setDeleteAnotacao(false)} />}
        </div>
    )
}