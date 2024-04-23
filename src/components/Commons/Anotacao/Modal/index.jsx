import React from "react";
import { motion } from "framer-motion";
import { Eye, Files, Share, X } from "@phosphor-icons/react";
import moment from "moment";
import darkColor from "../../../../hooks/DarkColor";

import './style.css';
import { Link } from "react-router-dom";

export default function ModalAnotacao(params) {
    const darkenColor = (hex, percent) => {
        const dark = darkColor(hex, percent);
        return dark;
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
                    <div className="w-[5%]" />
                    <div className="flex justify-center flex-col items-center">
                        <p className="font-medium dark:text-neutro-100">{params.item.nome}</p>
                        <span className="flex gap-2">
                            {params.item.disciplina && <p className="text-xs text-neutro-300">{params.item.disciplina.nome}</p>}
                            {params.item.data_prazo && <p className="text-xs text-neutro-300">{moment(params.item.data_prazo).format('DD-MM-YYYY')}</p>}
                        </span>
                        {params.item.categorias.length > 0 &&
                            <span className="flex gap-1 mt-2">
                                {params.item.categorias.map((categoria, i) => (
                                    <span key={i} className="px-1 text-xs font-semibold flex gap-2 border-2 rounded-md"
                                        style={{
                                            backgroundColor: `${categoria.cor}`,
                                            color: darkenColor(categoria.cor, 40),
                                            borderColor: darkenColor(categoria.cor, 40)
                                        }}>
                                        {categoria.nome}
                                    </span>
                                ))}
                            </span>
                        }
                    </div>
                    <div className="w-[5%] flex justify-end">
                        <button onClick={() => params.setSelectedAnotacao(null)} className="button-close-modal-anotacao"><X size={15} weight="bold" /></button>
                    </div>
                </div>
                <div className="content-conteudo-modal-anotacao">
                    {params.item.texto.length > 1300 ? params.item.texto.substring(0, 1300) + '...' : params.item.texto}
                </div>
                <div className="line-horizontal" />
                <div className="content-footer-modal-anotacao">
                    <span className="flex gap-1 text-neutro-300 items-center">
                        {params.item.arquivos.length > 0 && (<>
                            <Files size={20} /> Contém arquivos
                        </>
                        )}
                    </span>
                    <span className="flex items-center gap-4">
                        <button className={`button-compartilhar-anotacao${params.item.comunidade === 0 ? '-false' : '-true'}`} title="Compartilhar">
                            <Share size={20} weight="fill"/>
                        </button>
                        <Link to={`/anotacoes/view/${params.item.id}`} className="button-visualizar-anotacao">
                            Ver mais
                        </Link>
                    </span>
                </div>
            </motion.div>
        </div>
    )
}