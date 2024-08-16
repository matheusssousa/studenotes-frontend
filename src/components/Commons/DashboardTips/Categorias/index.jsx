import React from "react";
import { motion } from "framer-motion";

export default function DashboardCategoriaTip({ informations_categoria }) {
    return (
        <div className="flex flex-col gap-2">
            <p className="dashboard-tip-title text-vermelho-200">Categorias</p>
            <div className="dashboard-tip-card-vermelho">
                <div className="dashboard-tip-content">
                    <p className="dashboard-tip-number">{informations_categoria.total}</p>
                    <p className="dashboard-tip-text ">Total</p>
                </div>
                <div className="dashboard-line-vertical" />
                <div className="dashboard-tip-content">
                    <p className="dashboard-tip-number">{informations_categoria.deletadas}</p>
                    <p className="dashboard-tip-text">Deletados</p>
                </div>
            </div>
        </div>
    )
}