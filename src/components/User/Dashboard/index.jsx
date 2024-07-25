import React, { useEffect, useState } from "react";
import ApiUser from "../../../services/ApiUser";
import { ChatTeardropText, Heart } from "@phosphor-icons/react";

export default function UserDashboard(params) {
    const [infoAnotacoes, setInfoAnotacoes] = useState([]);
    const [infoDisciplinas, setInfoDisciplinas] = useState([]);
    const [infoCategoria, setInfoCategoria] = useState([]);
    const [infoNotificacoes, setInfoNotificacoes] = useState([]);

    const [loading, setLoading] = useState(true);

    const getInfoDashboard = async () => {
        try {
            const { data } = await ApiUser.get('/dashboard');
            setInfoAnotacoes(data.anotacoes);
            setInfoDisciplinas(data.disciplina);
            setInfoCategoria(data.categorias);
            // setInfoNotificacoes(data.notificacoes);
        } catch (error) {
            console.log(error)
        }
        setLoading(false);
    }

    useEffect(() => {
        getInfoDashboard();
    }, []);

    return (
        <div className="w-full flex flex-col h-full gap-3 justify-center items-center">
            {loading ? '' : (
                <>
                    <div className="h-2/3 w-full flex flex-col gap-2">
                        <div className="flex gap-2 h-1/3 w-full">
                            <div className="w-1/3 h-full bg-azul-200 rounded-xl flex flex-col items-center justify-center text-neutro-100">
                                <p className="text-4xl">{infoAnotacoes.total}</p>
                                <p className="text-xs">Anotações</p>
                            </div>
                            <div className="w-2/3 h-full bg-neutro-100 dark:bg-neutro-400 rounded-xl flex flex-col px-3 py-2 text-neutro-600 dark:text-neutro-200">
                                <p className="text-xs">Disciplina mais usada</p>
                                <div className="flex w-full h-full items-center justify-around">
                                    <p className="font-medium w-1/2 text-center">{infoDisciplinas.nome}</p>
                                    <div className="w-px h-[80%] bg-white" />
                                    <p className="font-medium text-4xl w-1/2 text-center">{infoDisciplinas.anotacoes_count}</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full rounded-xl h-1/3 flex flex-col border border-neutro-100 px-3 py-2 dark:border-neutro-400 dark:text-neutro-200">
                            <p className="text-xs">Anotações</p>
                            <div className="flex w-full h-full items-center justify-center">
                                <div className="w-1/2 flex items-center justify-center gap-2 h-full text-sm" title="Anotação mais curtida">
                                    <Heart size={18} />
                                    <p className="font-medium">{infoAnotacoes.curtida.nome}</p>
                                </div>
                                <div className="w-px h-[80%] bg-neutro-100 dark:bg-neutro-400" />
                                <div className="w-1/2 flex items-center justify-center gap-2 h-full text-sm" title="Anotação mais comentada">
                                    <ChatTeardropText size={18} />
                                    <p className="font-medium">{infoAnotacoes.comentada.nome}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 h-1/3 w-full">
                            <div className="w-2/3 h-full bg-neutro-100 dark:bg-neutro-400 rounded-xl flex flex-col px-3 py-2 text-neutro-600 dark:text-neutro-200">
                                <p className="text-xs">Categoria mais usada</p>
                                <div className="flex w-full h-full items-center justify-around">
                                    <p className="font-medium w-1/2 text-center">{infoCategoria.mais_usada.nome}</p>
                                    <div className="w-px h-[80%] bg-white" />
                                    <p className="font-medium text-4xl w-1/2 text-center">{infoCategoria.mais_usada.anotacoes_count}</p>
                                </div>
                            </div>
                            <div className="w-1/3 h-full bg-verde-100 rounded-xl flex flex-col items-center justify-center text-neutro-100">
                                <p className="text-4xl">{infoCategoria.total}</p>
                                <p className="text-xs">Categorias</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-[90%] h-px bg-neutro-250 dark:bg-neutro-400" />
                    <div className="h-1/2 w-full">
                        {/* NOTIFICACOES */}
                    </div>
                </>
            )}
        </div>
    )
}