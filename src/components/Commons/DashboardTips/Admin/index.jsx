import React from "react";
import { motion } from "framer-motion";

export default function DashboardAdminTip({ informations_admin }) {
    return (
        <div className="flex flex-col gap-2">
            <p className="dashboard-tip-title text-laranja-100">Administradores</p>
            <div className="dashboard-tip-card-laranja">
                <div className="dashboard-tip-content">
                    <p className="dashboard-tip-number">{informations_admin.total}</p>
                    <p className="dashboard-tip-text">Total</p>
                </div>
                <div className="dashboard-line-vertical" />
                <div className="dashboard-tip-content">
                    <p className="dashboard-tip-number">{informations_admin.deletados}</p>
                    <p className="dashboard-tip-text">Deletados</p>
                </div>
            </div>
        </div>
    )
}