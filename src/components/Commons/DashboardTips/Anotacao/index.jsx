import React from "react";
import { motion } from "framer-motion";

export default function DashboardAnotacaoTip({ informations_anotacao }) {
    return (
        <motion.div
            className="dashboard-tip-card-high bg-azul-200 w-full h-fit"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.2 } }}
            whileHover={{ scale: 1.02 }}
        >
            <p className="dashboard-tip-title">Anotações</p>
            <div className="line-horizontal-dashboad" />
            <div className="row">
                <div className="dashboard-tip-content">
                    <p className="dashboard-tip-number">{informations_anotacao.total}</p>
                    <p className="dashboard-tip-text">Total</p>
                </div>
                <div className="dashboard-tip-content">
                    <p className="dashboard-tip-number">{informations_anotacao.deletadas}</p>
                    <p className="dashboard-tip-text">Deletadas</p>
                </div>
                <div className="dashboard-tip-content">
                    <p className="dashboard-tip-number">{informations_anotacao.uso_gpt}</p>
                    <p className="dashboard-tip-text">Uso IA</p>
                </div>
                <div className="dashboard-tip-content">
                    <p className="dashboard-tip-number">{informations_anotacao.com_arquivos}</p>
                    <p className="dashboard-tip-text">Com arquivos</p>
                </div>
            </div>
        </motion.div>
    )
}