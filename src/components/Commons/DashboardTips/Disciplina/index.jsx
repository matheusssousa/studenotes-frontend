import React from "react";
import { motion } from "framer-motion";

export default function DashboardDisciplinaTip({ informations_disciplina }) {
    return (
        <motion.div
            className="dashboard-tip-card-high bg-azul-100 h-full w-full"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.2 } }}
            whileHover={{ scale: 1.02 }}
        >
            <p className="dashboard-tip-title">Disciplinas</p>
            <div className="line-horizontal-dashboad" />
            <div className="row">
                <div className="dashboard-tip-content">
                    <p className="dashboard-tip-number">{informations_disciplina.total}</p>
                    <p className="dashboard-tip-text">Total</p>
                </div>
                <div className="dashboard-tip-content">
                    <p className="dashboard-tip-number">{informations_disciplina.deletadas}</p>
                    <p className="dashboard-tip-text">Deletados</p>
                </div>
            </div>
            <div className="dashboard-tip-content-high flex-col">
                <p className="title">Disciplinas mais usadas</p>
                <div className="flex flex-wrap justify-between w-full gap-2">
                    {informations_disciplina.mais_anotacoes.map((disciplina, index) => (
                        <div key={index} className="dashboard-tip-content items-center flex justify-between w-full">
                            <p className="dashboard-tip-text-name w-[50%]">{disciplina.nome}</p>
                            <p className="dashboard-tip-text-email">{disciplina.anotacoes_count}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="dashboard-tip-content-high flex-col">
                <p className="title">Disciplinas mais usadas comunidade</p>
                <div className="flex flex-wrap justify-between w-full gap-2">
                    {informations_disciplina.mais_usadas_comunidade.map((disciplina, index) => (
                        <div key={index} className="dashboard-tip-content items-center flex justify-between w-full">
                            <p className="dashboard-tip-text-name w-[50%]">{disciplina.nome}</p>
                            <p className="dashboard-tip-text-email">{disciplina.anotacoes_count}</p>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}