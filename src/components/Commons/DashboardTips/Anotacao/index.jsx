import React from "react";
import moment from "moment";

export default function DashboardAnotacaoTip({ informations_anotacao, informations_ia }) {
    return (
        <div className="flex flex-col gap-2">
            <p className="dashboard-tip-title text-rosa-100">Anotações</p>
            <div className="dashboard-tip-card-rose">
                <div className="dashboard-tip-content">
                    <p className="dashboard-tip-number">{informations_anotacao.total || 0}</p>
                    <p className="dashboard-tip-text">Total</p>
                </div>
                <div className="dashboard-line-vertical" />
                <div className="dashboard-tip-content">
                    <p className="dashboard-tip-number">{informations_anotacao.deletadas || 0}</p>
                    <p className="dashboard-tip-text">Deletadas</p>
                </div>
            </div>
            <div className="dashboard-tip-card-rose">
                <div className="dashboard-tip-content">
                    <p className="dashboard-tip-number">{informations_anotacao.uso_gpt || 0}</p>
                    <p className="dashboard-tip-text">Uso IA</p>
                </div>
                <div className="dashboard-line-vertical" />
                <div className="dashboard-tip-content">
                    <p className="dashboard-tip-number">{informations_anotacao.com_arquivos || 0}</p>
                    <p className="dashboard-tip-text">Com arquivos</p>
                </div>
            </div>
            <div className="bg-white dark:bg-neutro-500 p-3 rounded-md flex flex-col gap-2">
                <p className="title text-rosa-100">Uso IA</p>
                <div className="flex justify-between w-full">
                    <div className="dashboard-tip-content">
                        <p className="dashboard-tip-number">{informations_ia.total || 0}</p>
                        <p className="dashboard-tip-text">Total</p>
                    </div>
                    <div className="dashboard-line-vertical" />
                    <div className="dashboard-tip-content">
                        <p className="dashboard-tip-number">{informations_ia.perguntas[0]?.total || 0}</p>
                        <p className="dashboard-tip-text">Perguntas</p>
                    </div>
                    <div className="dashboard-line-vertical" />
                    <div className="dashboard-tip-content">
                        <p className="dashboard-tip-number">{informations_ia.resumo[0]?.total || 0}</p>
                        <p className="dashboard-tip-text">Resumo</p>
                    </div>
                </div>
                <div className="line-horizontal" />
                <div className="flex justify-between w-full">
                    <div className="dashboard-tip-content">
                        <p className="dashboard-tip-number">{informations_ia.sugestao_disciplina[0]?.total || 0}</p>
                        <p className="dashboard-tip-text">Sugestão disciplina</p>
                    </div>
                    <div className="dashboard-line-vertical" />
                    <div className="dashboard-tip-content">
                        <p className="dashboard-tip-number">{informations_ia.sugestao_titulo[0]?.total || 0}</p>
                        <p className="dashboard-tip-text">Sugestão título</p>
                    </div>
                </div>
                <div className="line-horizontal" />
                <small className="bg-rosa-100 text-xs text-neutro-600 p-1 rounded-md">
                    Usado pela última vez há {moment(informations_ia.ultima_vez_usado.updated_at).locale('pt-br').startOf('day').fromNow()}
                </small>
            </div>
        </div>
    );
}