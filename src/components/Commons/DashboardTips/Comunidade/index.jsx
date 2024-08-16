import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import moment from "moment";
import { Sparkle } from "@phosphor-icons/react";

export default function DashboardComunidadeTip({ informations_comentarios, informations_curtidas, informations_anotacao }) {
    return (
        <div className="flex flex-col gap-2">
            <p className="dashboard-tip-title text-neutro-600 dark:text-neutro-100">Comunidade</p>
            <div className="dashboard-tip-card-neutro">
                <div className="dashboard-tip-content">
                    <p className="dashboard-tip-number">{informations_anotacao[0]}</p>
                    <p className="dashboard-tip-text">Anotações</p>
                </div>
                <div className="dashboard-line-vertical" />
                <div className="dashboard-tip-content">
                    <p className="dashboard-tip-number">{informations_anotacao[2]}</p>
                    <p className="dashboard-tip-text">Uso IA</p>
                </div>
                <div className="dashboard-line-vertical" />
                <div className="dashboard-tip-content">
                    <p className="dashboard-tip-number">{informations_curtidas.total}</p>
                    <p className="dashboard-tip-text">Curtidas</p>
                </div>
            </div>
            <div className="dashboard-tip-card-simple-grey dark:text-neutro-100">
                <p className="title text-neutro-600 dark:text-neutro-100">Compartilhadas recentemente</p>
                <div className="flex justify-between w-full">
                    {informations_anotacao[1].map((anotacao, index) => (
                        <Link to={`/admin/comunidade/view/${anotacao.id}`} key={index} className="dashboard-tip-content items-center flex justify-between w-full flex-col">
                            <p className="text-xs flex items-start">{anotacao.nome} {anotacao.use_gpt && <Sparkle size={16} className="text-azul-200" weight="fill" />}</p>
                            <small className="text-neutro-300">{moment(anotacao.updated_at).format('D/M/Y HH:mm')}</small>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="line-horizontal" />
            <div className="bg-white dark:bg-neutro-500 p-3 rounded-md flex flex-col gap-2">
                <p className="title text-neutro-600 dark:text-neutro-100">Comentários</p>
                <div className="flex justify-between w-full">
                    <div className="dashboard-tip-content">
                        <p className="dashboard-tip-number">{informations_comentarios.total}</p>
                        <p className="dashboard-tip-text">Total</p>
                    </div>
                    <div className="dashboard-line-vertical" />
                    <div className="dashboard-tip-content">
                        <p className="dashboard-tip-number">{informations_comentarios.deletados}</p>
                        <p className="dashboard-tip-text">Deletados</p>
                    </div>
                    <div className="dashboard-line-vertical" />
                    <div className="dashboard-tip-content">
                        <p className="dashboard-tip-number">{informations_comentarios.respostas}</p>
                        <p className="dashboard-tip-text">Respostas</p>
                    </div>
                </div>
                <div className="line-horizontal" />
                <p className="title text-neutro-600 dark:text-neutro-100">Comentários recentes</p>
                <div className="flex justify-between w-full">
                    {informations_comentarios.recentes.map((comentario, index) => (
                        <Link to={`/admin/comunidade/view/${comentario.anotacao_id}`} key={index} className="dashboard-tip-content items-center flex justify-between w-full flex-col">
                            <p className="text-xs text-neutro-300">{comentario.conteudo > 50 ? comentario.conteudo.substring(0, 50) : comentario.conteudo}</p>
                            <small className="text-neutro-250">{moment(comentario.created_at).format('D/M/Y HH:mm')}</small>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}