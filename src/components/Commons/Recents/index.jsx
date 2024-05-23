import React from "react";
import CardAnotacaoRecent from "../Anotacao/CardRecent";
import { Link } from "react-router-dom";

export default function Recents(params) {
    return (
        <div className="w-full flex flex-col">
            {/* <p className="font-medium dark:text-neutro-100">Recentes</p> */}
            <div className="w-full flex flex-wrap gap-2">
                {params.recentes.length > 0 ?
                    params.recentes.map((anotacao, index) => (
                        <CardAnotacaoRecent key={index} anotacao={anotacao} />
                    ))
                    :
                    <span>
                        {/* <p>Parece que você ainda fez nenhuma anotação, que tal começarmos?.</p>
                        <Link to="/anotacoes/addedit" className="text-blue-500">Nova Anotação</Link> */}
                    </span>
                }
            </div>
        </div>
    )
}