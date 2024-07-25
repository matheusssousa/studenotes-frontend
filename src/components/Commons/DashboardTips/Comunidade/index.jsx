import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import moment from "moment";

export default function DashboardComunidadeTip({ informations_comentarios, informations_curtidas, informations_anotacao }) {
    return (
        <motion.div
            className="dashboard-tip-card-high bg-azul-100 w-1/2 h-full"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.2 } }}
            whileHover={{ scale: 1.02 }}
        >
            <p className="dashboard-tip-title">Comunidade</p>
            <div className="line-horizontal-dashboad" />
            <div className="row">
                <div className="flex flex-col w-1/3 h-full">
                    <div className="row">
                        <div className="dashboard-tip-content">
                            <p className="dashboard-tip-number">{informations_anotacao[0]}</p>
                            <p className="dashboard-tip-text">Anotações</p>
                        </div>
                        <div className="dashboard-tip-content">
                            <p className="dashboard-tip-number">{informations_anotacao[2]}</p>
                            <p className="dashboard-tip-text">Uso IA</p>
                        </div>
                    </div>
                    <div className="dashboard-tip-content-high flex-col h-full">
                        <p className="title">Compartilhadas recentemente</p>
                        <div className="flex flex-wrap justify-between w-full gap-2">
                            {informations_anotacao[1].map((anotacao, index) => (
                                <Link to={`/admin/comunidade/view/${anotacao.id}`} key={index} className="dashboard-tip-content items-center flex justify-between w-full flex-col">
                                    <p className="dashboard-tip-text-name w-[70%]">{anotacao.nome}</p>
                                    <p className="dashboard-tip-text-email">{moment(anotacao.updated_at).format('D/M/Y HH:mm')}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-1/3 h-full flex-wrap">
                    <div className="dashboard-tip-content">
                        <p className="dashboard-tip-number">{informations_comentarios.total}</p>
                        <p className="dashboard-tip-text">Comentários</p>
                    </div>
                    <div className="dashboard-tip-content">
                        <p className="dashboard-tip-number">{informations_comentarios.deletados}</p>
                        <p className="dashboard-tip-text">Comentários deletados</p>
                    </div>
                    <div className="dashboard-tip-content">
                        <p className="dashboard-tip-number">{informations_comentarios.respostas}</p>
                        <p className="dashboard-tip-text">Respostas</p>
                    </div>
                    <div className="dashboard-tip-content">
                        <p className="dashboard-tip-number">{informations_curtidas.total}</p>
                        <p className="dashboard-tip-text">Curtidas</p>
                    </div>
                </div>
                <div className="flex flex-col w-1/3 h-full">
                    <div className="dashboard-tip-content-high flex-col h-full">
                        <p className="title">Comentários recentes</p>
                        <div className="flex flex-wrap justify-between w-full gap-2">
                            {informations_comentarios.recentes.map((comentario, index) => (
                                <Link to={`/admin/comunidade/view/${comentario.anotacao_id}`} key={index} className="dashboard-tip-content items-center flex justify-between w-full flex-col">
                                    <p className="dashboard-tip-text-name w-[70%]">{comentario.conteudo > 50 ? comentario.conteudo.substring(0, 50) : comentario.conteudo}</p>
                                    <p className="dashboard-tip-text-email">{moment(comentario.updated_at).format('D/M/Y HH:mm')}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}