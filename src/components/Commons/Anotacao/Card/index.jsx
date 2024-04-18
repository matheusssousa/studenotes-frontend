import React from "react";
import { Link } from "react-router-dom";
import { Files, File } from "@phosphor-icons/react";
import moment from "moment";
import darkColor from "../../../../hooks/DarkColor";

import './style.css';

export default function AnotacaoCard(params) {
    const darkenColor = (hex, percent) => {
        const dark = darkColor(hex, percent);
        return dark;
    };

    return (
        <Link to={`/anotacoes/view/${params.item.id}`} className="card-anotacao">
            <div className="content-header-card-anotacao">
                <div className="w-[15%]" />
                <span className=" w-[80%] md:w-[70%] flex items-center justify-center flex-col">
                    <p className="text-base font-medium text-center">{params.item.nome}</p>
                    <div className="flex gap-3 -translate-y-1">
                        {params.item.disciplina && <small className="text-neutro-300">{params.item.disciplina.nome}</small>}
                        {params.item.data_prazo && <small className="text-neutro-300">{moment(params.item.data_prazo).format('DD-MM-YYYY')}</small>}
                    </div>
                </span>
                <span className="w-[15%] flex gap-1 flex-wrap items-start justify-center">
                    {params.item.categorias.map((categoria, i) => (
                        <div key={i} style={{ backgroundColor: `${categoria.cor}`, borderColor: darkenColor(categoria.cor, 40) }} className="w-5 h-2 rounded-full border" />
                    ))}
                </span>
            </div>
            <div className="content-texto-card-anotacao break-all">
                {params.item.texto.length > 400 ? params.item.texto.substring(0, 400) + '...' : params.item.texto}
            </div>
            <div className="content-texto-card-anotacao-mobile">
                {params.item.texto.length > 70 ? params.item.texto.substring(0, 70) + '...' : params.item.texto}
            </div>
            <div className="content-options-card-anotacao">
                <div>
                    {params.item.arquivos.length > 0 ? (
                        params.item.arquivos.length > 1 ? (
                            <span className="flex gap-1 text-neutro-300 items-center font-semibold rounded-md">
                                <Files size={12} /> <small>Arquivos</small>
                            </span>
                        ) : (
                            <span className="flex gap-1 text-neutro-300 items-center font-semibold rounded-md">
                                <File size={12} /> <small>Arquivo</small>
                            </span>
                        )
                    ) : null}
                </div>
            </div>
        </Link>
    )
}