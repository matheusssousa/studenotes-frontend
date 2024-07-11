import React, { useState } from "react";
import { motion } from "framer-motion";
import { ClockClockwise, Files, PencilSimple, Share, ShareFat, TrashSimple, X } from "@phosphor-icons/react";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import ApiUser from "../../../../services/ApiUser";
import { toast } from "react-toastify";

import './style.css';
import ViewCategorias from "../../Categoria/ViewCategorias";
import EditMinimalist from "../../Buttons/Edit/EditMinimalist";
import ShareMinimalist from "../../Buttons/Share/ShareMinimalist";

export default function ModalAnotacao({ item, setSelectedAnotacao }) {
    const confirmDelete = async (anotacao) => {
        try {
            await ApiUser.delete(`/anotacao/${anotacao}`);
            setSelectedAnotacao(null);
            window.location.reload();
            toast.success("Anotação excluída.", { theme: 'colored' });
        } catch (error) {
            console.error("Erro ao excluir anotação:", error);
        }
    };

    const renderAnotacaoText = (text, limit) => (
        text && (text.length > limit ? `${text.substring(0, limit)}...` : text)
    );

    return (
        <div className="flex items-center justify-center w-full h-full absolute top-0 left-0">
            <motion.div
                className="overlay-anotacao"
                onClick={() => setSelectedAnotacao(null)}
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
                        <p className="font-medium dark:text-neutro-100 text-center">{item.nome}</p>
                        <span className="flex gap-2">
                            {item.disciplina && <p className="text-xs text-neutro-300">{item.disciplina.nome}</p>}
                            {item.data_prazo && <p className="text-xs text-neutro-300">{moment(item.data_prazo).format('DD-MM-YYYY')}</p>}
                        </span>
                        {item.categorias.length > 0 && <ViewCategorias categorias={item.categorias} />}
                    </div>
                    <div className="w-[10%] sm:w-[5%] flex justify-end">
                        <button onClick={() => setSelectedAnotacao(null)} className="button-close-modal-anotacao">
                            <X size={16} weight="bold" />
                        </button>
                    </div>
                </div>
                <div className="content-conteudo-modal-anotacao whitespace-pre-wrap">
                    {renderAnotacaoText(item.texto, 1000)}
                </div>
                <div className="content-conteudo-modal-anotacao-mobile whitespace-pre-wrap">
                    {renderAnotacaoText(item.texto, 500)}
                </div>
                <div className="line-horizontal" />
                <div className="content-footer-modal-anotacao">
                    <span className="flex gap-1 text-neutro-300 items-center">
                        {item.arquivos.length > 0 && (
                            <>
                                <Files size={16} /> Contém arquivos
                            </>
                        )}
                    </span>
                    <span className="flex items-center">
                        <div className="flex">
                            {item.deleted_at ? (
                                <button
                                    onClick={() => restoreAnotacao(item.id)}
                                    className="btn-restore-minimize"
                                    title="Restaurar"
                                >
                                    <ClockClockwise size={16} />
                                </button>
                            ) : (
                                <>
                                    <EditMinimalist edit={`/anotacoes/addedit/${item.id}`} />
                                    <button
                                        onClick={() => confirmDelete(item.id)}
                                        className="btn-delete-minimize"
                                        title="Excluir"
                                    >
                                        <TrashSimple size={16} />
                                    </button>
                                </>
                            )}
                        </div>
                        <ShareMinimalist id={item.id} anotacao_comunidade={item.comunidade} />
                        <Link to={`/anotacoes/view/${item.id}`} className="button-visualizar-anotacao">
                            Ver mais
                        </Link>
                    </span>
                </div>
            </motion.div>
        </div>
    );
}
