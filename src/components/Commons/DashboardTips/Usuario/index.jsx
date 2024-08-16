import React from "react";
import { SealCheck } from "@phosphor-icons/react"
import moment from "moment";

export default function DashboardUsuarioTip({ informations_usuario }) {
    return (
        <div className="flex flex-col gap-2">
            <p className="dashboard-tip-title text-azul-200">Usuários</p>
            <div className="dashboard-tip-card-azul">
                <div className="dashboard-tip-content">
                    <p className="dashboard-tip-number">{informations_usuario.total}</p>
                    <p className="dashboard-tip-text ">Total</p>
                </div>
                <div className="dashboard-line-vertical" />
                <div className="dashboard-tip-content">
                    <p className="dashboard-tip-number">{informations_usuario.email_verificado}</p>
                    <p className="dashboard-tip-text">Verificados</p>
                </div>
                <div className="dashboard-line-vertical" />
                <div className="dashboard-tip-content">
                    <p className="dashboard-tip-number">{informations_usuario.deletados}</p>
                    <p className="dashboard-tip-text">Deletados</p>
                </div>
            </div>
            <div className="dashboard-tip-card-simple-grey dark:text-neutro-100">
                <p className="title text-azul-200">Recentes</p>
                <div className="flex justify-center w-full gap-2">
                    {informations_usuario.recentes.map((usuario, index) => (
                        <>
                            <div key={index} className="flex flex-col w-1/2 text-xs">
                                <p className="flex">{usuario.name}{usuario.email_verified_at && <SealCheck size={16} weight="fill" className="text-azul-200" />}</p>
                                <p className="text-neutro-300">{moment(usuario.created_at).calendar()}</p>
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </div>
    )
}