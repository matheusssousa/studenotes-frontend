import React, { useState } from "react";
import moment from "moment";
import adjustColor from "../../../../hooks/AdjustColor";
import { motion, AnimatePresence } from "framer-motion";
import ModalAnotacao from "../Modal";

import './style.css';
import { Sparkle } from "@phosphor-icons/react";

export default function AnotacaoCard(params) {
    const [selectedAnotacao, setSelectedAnotacao] = useState(null);

    const darkenColor = (hex, percent) => {
        const dark = adjustColor(hex, percent);
        return dark;
    };

    return (
        <>
            <motion.div
                className="card-anotacao"
                onClick={() => setSelectedAnotacao(params.item.id)}
                whileTap={{ scale: 0.95 }}
            >
                <motion.div className="content-header-card-anotacao">
                    <span className="flex items-start justify-center flex-col w-full">
                        <div className="flex gap-2 items-end w-full justify-between">
                            <p className="text-base font-medium text-center flex gap-1">{params.item.nome} {params.item.use_gpt && <Sparkle size={16} className="text-azul-200" weight="fill"/>}</p>
                            {params.item.deleted_at && <small className=" text-vermelho-300 text-xs">Excluído</small>}
                        </div>
                        <div className="flex gap-3 -translate-y-1">
                            {params.item.disciplina && <small className="text-neutro-300">{params.item.disciplina.nome}</small>}
                            {params.item.data_prazo && <small className="text-neutro-300">{moment(params.item.data_prazo).format('DD-MM-YYYY')}</small>}
                        </div>
                    </span>
                    <span className="flex gap-1 flex-wrap items-start justify-center">
                        {params.item.categorias.map((categoria, i) => (
                            <div key={i} style={{ backgroundColor: `${categoria.cor}`, borderColor: darkenColor(categoria.cor, 40) }} className="w-6 h-2 rounded-full border" />
                        ))}
                    </span>
                </motion.div>
                <motion.div className="content-texto-card-anotacao break-all whitespace-pre-wrap">
                    {params.item.texto && (params.item.texto.length > 250 ? params.item.texto.substring(0, 250) + '...' : params.item.texto)}
                </motion.div>
                <motion.div className="content-texto-card-anotacao-mobile whitespace-pre-wrap">
                    {params.item.texto && (params.item.texto.length > 70 ? params.item.texto.substring(0, 70) + '...' : params.item.texto)}
                </motion.div>
            </motion.div>

            <AnimatePresence>
                {selectedAnotacao && (
                    <ModalAnotacao item={params.item} setSelectedAnotacao={setSelectedAnotacao} />
                )}
            </AnimatePresence>
        </>
    )
}