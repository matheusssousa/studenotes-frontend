import React from "react";
import { motion } from "framer-motion";
import { SealCheck } from "@phosphor-icons/react"
import moment from "moment";

export default function DashboardUsuarioTip({ informations_usuario }) {
    return (
        <motion.div
            className="dashboard-tip-card-high bg-verde-100 h-2/3 w-full"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.2 } }}
            whileHover={{ scale: 1.02 }}
        >
            <p className="dashboard-tip-title">Usuários</p>
            <div className="line-horizontal-dashboad" />
            <div className="row">
                <div className="dashboard-tip-content">
                    <p className="dashboard-tip-number">{informations_usuario.total}</p>
                    <p className="dashboard-tip-text">Total</p>
                </div>
                <div className="dashboard-tip-content">
                    <p className="dashboard-tip-number">{informations_usuario.email_verificado}</p>
                    <p className="dashboard-tip-text">E-mail verificado</p>
                </div>
                <div className="dashboard-tip-content">
                    <p className="dashboard-tip-number">{informations_usuario.deletados}</p>
                    <p className="dashboard-tip-text">Deletados</p>
                </div>
            </div>
            <div className="dashboard-tip-content-high flex-col">
                <p className="title">Usuários recentes</p>
                <div className="flex flex-wrap justify-between w-full gap-2">
                    {informations_usuario.recentes.map((usuario, index) => (
                        <div key={index} className="dashboard-tip-content items-center flex justify-between w-full">
                            <p className="dashboard-tip-text-name w-[50%]">{usuario.name}</p>
                            <p className="dashboard-tip-text-email">{usuario.email}{usuario.email_verified_at && <SealCheck size={16} weight="fill" className="text-azul-200" />}</p>
                            <p className="dashboard-tip-text-horario">{moment(usuario.created_at).calendar()}</p>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}