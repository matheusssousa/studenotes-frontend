import React from "react";
import { motion } from "framer-motion";

export default function DashboardCategoriaTip({ informations_categoria }) {
    return (
        <motion.div
            className="dashboard-tip-card-high bg-vermelho-200 w-1/5"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.2 } }}
            whileHover={{ scale: 1.02 }}
        >
            <p className="dashboard-tip-title">Categorias</p>
            <div className="line-horizontal-dashboad" />
            <div className="dashboard-tip-content">
                <p className="dashboard-tip-number">{informations_categoria.total}</p>
                <p className="dashboard-tip-text">Total</p>
            </div>
            <div className="dashboard-tip-content">
                <p className="dashboard-tip-number">{informations_categoria.deletadas}</p>
                <p className="dashboard-tip-text">Deletadas</p>
            </div>
        </motion.div>
    )
}