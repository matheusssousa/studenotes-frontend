import React from "react";
import { motion } from "framer-motion";

export default function DashboardDisciplinaTip({ informations_disciplina }) {
    return (
        <div className="flex flex-col gap-2">
            <p className="dashboard-tip-title text-verde-100">Disciplinas</p>
            <div className="dashboard-tip-card-verde">
                <div className="dashboard-tip-content">
                    <p className="dashboard-tip-number">{informations_disciplina.total}</p>
                    <p className="dashboard-tip-text">Total</p>
                </div>
                <div className="dashboard-line-vertical" />
                <div className="dashboard-tip-content">
                    <p className="dashboard-tip-number">{informations_disciplina.deletadas}</p>
                    <p className="dashboard-tip-text">Deletados</p>
                </div>
            </div>
            <div className="dashboard-tip-card-simple-grey dark:text-neutro-100">
                <p className="title text-verde-100">Mais usadas</p>
                <div className="flex justify-between w-full">
                    {informations_disciplina.mais_anotacoes.map((disciplina, index) => (
                        <div key={index} className="flex flex-col w-full text-xs items-center justify-center">
                            <p>{disciplina.nome}</p>
                            <p className="text-neutro-300">{disciplina.anotacoes_count}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="dashboard-tip-card-simple-grey dark:text-neutro-100">
                <p className="title text-verde-100">Mais usadas na comunidade</p>
                <div className="flex justify-between w-full">
                    {informations_disciplina.mais_usadas_comunidade.map((disciplina, index) => (
                        <div key={index} className="flex flex-col w-full text-xs items-center justify-center">
                            <p>{disciplina.nome}</p>
                            <p className="text-neutro-300">{disciplina.anotacoes_count}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}