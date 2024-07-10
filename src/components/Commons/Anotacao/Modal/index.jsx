import React, { useState } from "react";
import { motion } from "framer-motion";
import { ClockClockwise, Files, PencilSimple, Share, ShareFat, TrashSimple, X } from "@phosphor-icons/react";
import moment from "moment";
import { Link } from "react-router-dom";
import ApiUser from "../../../../services/ApiUser";
import { toast } from "react-toastify";

import './style.css';
import ViewCategorias from "../../Categoria/ViewCategorias";
import EditMinimalist from "../../Buttons/Edit/EditMinimalist";
import ShareMinimalist from "../../Buttons/Share/ShareMinimalist";

export default function ModalAnotacao(params) {
    const [comunidade, setComunidade] = useState(params.item.comunidade);

    const comunidadeAnotacao = async (anotacao) => {
        try {
            setComunidade(comunidade === 0 ? 1 : 0);
            await ApiUser.post(`/anotacao/comunidade/${anotacao}`, {
                comunidade: comunidade
            });
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

    return (
        <div className="flex items-center justify-center w-full h-full absolute top-0 left-0">
            <motion.div
                className="overlay-anotacao"
                onClick={() => params.setSelectedAnotacao(null)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                transition={{ duration: 0.2, delay: 0.15 }}
                style={{ pointerEvents: "auto" }}
            />
            <motion.div
                className="modal-anotacao"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
            >
                <div className="content-header-modal-anotacao">
                    <div className="w-[10%] sm:w-[5%]" />
                    <div className="flex justify-center flex-col items-center">
                        <p className="font-medium dark:text-neutro-100 text-center">{params.item.nome}</p>
                        <span className="flex gap-2">
                            {params.item.disciplina && <p className="text-xs text-neutro-300">{params.item.disciplina.nome}</p>}
                            {params.item.data_prazo && <p className="text-xs text-neutro-300">{moment(params.item.data_prazo).format('DD-MM-YYYY')}</p>}
                        </span>
                        {params.item.categorias.length > 0 &&
                            <ViewCategorias categorias={params.item.categorias} />
                        }
                    </div>
                    <div className="w-[10%] sm:w-[5%] flex justify-end">
                        <button onClick={() => params.setSelectedAnotacao(null)} className="button-close-modal-anotacao"><X size={16} weight="bold" /></button>
                    </div>
                </div>
                <div className="content-conteudo-modal-anotacao whitespace-pre-wrap">
                    {params.item.texto && (params.item.texto.length > 1000 ? params.item.texto.substring(0, 1000) + '...' : params.item.texto)}
                </div>
                <div className="content-conteudo-modal-anotacao-mobile whitespace-pre-wrap">
                    {params.item.texto && (params.item.texto.length > 500 ? params.item.texto.substring(0, 500) + '...' : params.item.texto)}
                </div>
                <div className="line-horizontal" />
                <div className="content-footer-modal-anotacao">
                    <span className="flex gap-1 text-neutro-300 items-center">
                        {params.item.arquivos.length > 0 && (<>
                            <Files size={16} /> Contém arquivos
                        </>
                        )}
                    </span>
                    <span className="flex items-center">
                        <div className="flex">
                            {params.item.deleted_at ? (
                                <button
                                    onClick={() => restoreAnotacao(params.anotacao)}
                                    className="btn-restore-minimize"
                                    title="Restaurar">
                                    <ClockClockwise size={16} />
                                </button>
                            ) : (
                                <>
                                    <EditMinimalist edit={`/anotacoes/addedit/${params.item.id}`} />
                                    <button
                                        onClick={() => confirmDelete(true)}
                                        className="btn-delete-minimize"
                                        title="Excluir">
                                        <TrashSimple size={16} />
                                    </button>
                                </>
                            )}
                        </div>
                        <ShareMinimalist id={params.item.id} anotacao_comunidade={params.item.comunidade} />
                        <Link to={`/anotacoes/view/${params.item.id}`} className="button-visualizar-anotacao">
                            Ver mais
                        </Link>
                    </span>
                </div>
            </motion.div>
        </div>
    )
}