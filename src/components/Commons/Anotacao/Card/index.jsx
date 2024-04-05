import React from "react";
import {Bookmark} from '@phosphor-icons/react';

import './style.css';

export default function AnotacaoCard(params) {
    console.log(params);
    return (
        <div className="card-anotacao">
            <div className="content-header-card-anotacao">
                <span>
                    <p>{params.item.nome}</p>
                    <small>{params.item.disciplina.nome}</small>
                </span>
                <span>
                    {params.item.categorias.map((categoria, i) => (
                        <div key={i} style={{color: `${categoria.cor}`}}>
                            <Bookmark size={32} weight="fill" className="drop-shadow"/>  
                        </div>
                    ))}
                </span>
            </div>
        </div>
    )
}