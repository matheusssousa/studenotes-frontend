import React from "react";
import CardAnotacaoRecent from "../Anotacao/CardRecent";
import { Link } from "react-router-dom";
import ArtHome from "../../../assets/Art/ArtHome.svg";

import './style.css';

export default function Recents(params) {
    return (
        <div className="content-recentes">
            <p className="font-medium dark:text-neutro-100">Recentes</p>
            {!params.loading ? (
                <div className="w-full h-full flex flex-wrap gap-2 rounded-xl">
                    {params.recentes.length > 0 ?
                        params.recentes.map((anotacao, index) => (
                            <CardAnotacaoRecent key={index} anotacao={anotacao} />
                        ))
                        :
                        <div className="flex flex-col items-center justify-center w-full text-xs gap-3">
                            <img src={ArtHome} alt="Sem anotações" className="w-1/4 h-1/2 flex items-center justify-center" />
                            <div className="flex flex-col items-center justify-center gap-2">
                                <p className="dark:text-neutro-100">Parece que você ainda não possui anotações, que tal fazermos uma nova?</p>
                                <Link to="/anotacoes" className="btn-default text-xs">Criar nova anotação</Link>
                            </div>
                        </div>
                    }
                </div>
            ) : (
                <div className={`w-full h-full flex flex-wrap gap-2 animate-pulse bg-white dark:bg-neutro-500 rounded-xl`} />
            )}
        </div>
    );
}