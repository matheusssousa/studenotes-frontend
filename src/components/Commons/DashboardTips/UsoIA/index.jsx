import React from "react";
import { motion } from "framer-motion";

export default function DashboardUsoIATip({ information_uso_ia }) {
    return (
        <motion.div
            className="dashboard-tip-card-high bg-rosa-100 w-full h-fit"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.2 } }}
            whileHover={{ scale: 1.02 }}
        >
            <p className="dashboard-tip-title">Uso IA</p>
            <div className="line-horizontal-dashboad" />
            <div className="row">
                <div className="dashboard-tip-content">
                    <p className="dashboard-tip-number">{information_uso_ia.total}</p>
                    <p className="dashboard-tip-text">Total usado</p>
                </div>
                <div className="dashboard-tip-content">
                    <p className="dashboard-tip-number">{information_uso_ia.resumo}</p>
                    <p className="dashboard-tip-text">Resumo</p>
                </div>
                <div className="dashboard-tip-content">
                    <p className="dashboard-tip-number">{information_uso_ia.perguntas}</p>
                    <p className="dashboard-tip-text">Perguntas</p>
                </div>
                <div className="dashboard-tip-content">
                    <p className="dashboard-tip-number">{information_uso_ia.sugestao_titulo}</p>
                    <p className="dashboard-tip-text">Sugestao Titulo</p>
                </div>
                <div className="dashboard-tip-content">
                    <p className="dashboard-tip-number">{information_uso_ia.sugestao_disciplina}</p>
                    <p className="dashboard-tip-text">Sugestao Disciplina</p>
                </div>
            </div>
            <div className="row">

            </div>
        </motion.div>
    )
}