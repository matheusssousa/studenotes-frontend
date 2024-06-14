import React from "react";
import { ChatTeardrop, ExclamationMark, Heart } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

import "./style.css";

export default function CardComunidade({ anotacao }) {
    return (
        <div className="card-comunidade">
            <div className="card-content-header">
                <span className="text-xs font-semibold w-[20%] dark:text-neutro-100">
                    {anotacao.user.name}
                </span>
                <div className="flex flex-col items-center justify-center">
                    <p className="text-sm font-semibold dark:text-neutro-100">{anotacao.nome}</p>
                    {anotacao.disciplina && <span className="text-xs text-neutro-300">{anotacao.disciplina.nome}</span>}
                </div>
                <div className="w-[20%]"/>
            </div>
            <div className="content-texto-card-anotacao break-all whitespace-pre-wrap items-center">
                {anotacao.texto && (anotacao.texto.length > 250 ? anotacao.texto.substring(0, 250) + '...' : anotacao.texto)}
            </div>
            <div className="card-content-footer">
                <div className="flex gap-1 dark:text-neutro-100">
                    <button type="button" className="like-btn"><Heart size={17} /></button>
                    <button type="button" className="comment-btn"><ChatTeardrop size={17} /></button>
                    <button type="button" className="exclamation-btn"><ExclamationMark size={17}/></button>
                </div>
                <Link to={`/comunidade/view/${anotacao.id}`} className="button-visualizar-anotacao">
                    Ver mais
                </Link>
            </div>
        </div>
    );
}