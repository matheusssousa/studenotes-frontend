import React from "react";
import { Link } from "react-router-dom";
import { Files, File } from "@phosphor-icons/react";
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
                <span>
                    <p className="text-base font-medium">{params.item.nome}</p>
                    {/* <small className="text-neutro-300">{params.item.disciplina.nome}</small> */}
                </span>
                <span className="flex gap-2 flex-wrap">
                    {params.item.categorias.map((categoria, i) => (
                        <div key={i} style={{ backgroundColor: `${categoria.cor}`, borderColor: darkenColor(categoria.cor, 40) }} className="w-7 h-3 rounded-full border" />
                    ))}
                </span>
            </div>
            <div className="content-texto-card-anotacao">
                {params.item.texto > 150 ? params.item.texto.substring(0, 100) + '...' : params.item.texto}
            </div>
            <div className="content-options-card-anotacao">
                <div>
                    {params.item.arquivos > 1 ?
                        <span className="flex gap-1 text-neutro-300 items-center font-semibold rounded-md"><Files size={12} /> <small>Arquivos</small></span>
                        :
                        <span className="flex gap-1 text-neutro-300 items-center font-semibold rounded-md"><File size={12} /> <small>Arquivo</small></span>
                    }
                </div>
                <div>

                </div>
            </div>
        </Link>
    )
}