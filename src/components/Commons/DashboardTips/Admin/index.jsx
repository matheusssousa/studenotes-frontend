import React from "react";
import { motion } from "framer-motion";

export default function DashboardAdminTip({ informations_admin }) {
    return (
        <motion.div
            className="dashboard-tip-card-high bg-laranja-100 h-1/3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.2 } }}
            whileHover={{ scale: 1.02 }}
        >
            <p className="dashboard-tip-title">Administradores</p>
            <div className="line-horizontal-dashboad" />
            <div className="row">
                <div className="dashboard-tip-content">
                    <p className="dashboard-tip-number">{informations_admin.total}</p>
                    <p className="dashboard-tip-text">Total</p>
                </div>
                <div className="dashboard-tip-content">
                    <p className="dashboard-tip-number">{informations_admin.deletados}</p>
                    <p className="dashboard-tip-text">Deletados</p>
                </div>
            </div>
        </motion.div>
    )
}