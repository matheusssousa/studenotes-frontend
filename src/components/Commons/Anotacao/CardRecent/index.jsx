import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import adjustColor from "../../../../hooks/AdjustColor";
import ModalAnotacao from "../Modal";

import './style.css';
import moment from "moment";

export default function CardAnotacaoRecent(params) {
    const [selectedAnotacao, setSelectedAnotacao] = useState(null);

    const darkenColor = (hex, percent) => {
        const dark = adjustColor(hex, percent);
        return dark;
    };
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedAnotacao(params.anotacao.id)}
                className="card-anotacao-recent">
                <div className="content-header-card-anotacao-recent">
                    <p className="text-sm font-medium dark:text-neutro-100 text-neutro-400">{params.anotacao.nome}</p>
                    <span className="flex gap-1 flex-wrap items-start justify-center">
                        {params.anotacao.categorias.map((categoria, i) => (
                            <div key={i} style={{ backgroundColor: `${categoria.cor}`, borderColor: darkenColor(categoria.cor, 40) }} className="w-6 h-2 rounded-full border" />
                        ))}
                    </span>
                    <div className="flex gap-3 -translate-y-1">
                        {params.anotacao.disciplina && <small className="text-neutro-300 text-xs">{params.anotacao.disciplina.nome}</small>}
                        {params.anotacao.data_prazo && <small className="text-neutro-300 text-xs">{moment(params.anotacao.data_prazo).format('DD-MM-YYYY')}</small>}
                    </div>
                </div>
                <motion.div className="content-texto-card-anotacao break-all whitespace-pre-wrap">
                    {params.anotacao.texto && (params.anotacao.texto.length > 400 ? params.anotacao.texto.substring(0, 400) + '...' : params.anotacao.texto)}
                </motion.div>
                <motion.div className="content-texto-card-anotacao-mobile whitespace-pre-wrap">
                    {params.anotacao.texto && (params.anotacao.texto.length > 70 ? params.anotacao.texto.substring(0, 70) + '...' : params.anotacao.texto)}
                </motion.div>
            </motion.div>

            <AnimatePresence>
                {selectedAnotacao && (
                    <ModalAnotacao item={params.anotacao} setSelectedAnotacao={setSelectedAnotacao} />
                )}
            </AnimatePresence>
        </>
    )
}