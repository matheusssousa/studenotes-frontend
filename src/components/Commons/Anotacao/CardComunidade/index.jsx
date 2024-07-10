import React from "react";
import { ChatTeardrop, ExclamationMark } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../context/Authenticate/AuthContext";

import "./style.css";
import LikeButton from "../../Buttons/Like";

const CardComunidade = React.forwardRef(({ anotacao }, ref) => {
    const { user, admin } = useAuth();

    return (
        <div className="card-comunidade" ref={ref}>
            <div className="card-content-header">
                <div className="flex flex-col items-start ">
                    <p className="text-sm font-semibold dark:text-neutro-100">{anotacao.nome}</p>
                    {anotacao.disciplina && <small className="text-xs text-neutro-300">{anotacao.disciplina.nome}</small>}
                </div>
                <small className="text-xs w-[20%] text-neutro-300">
                    {anotacao.user.name}
                </small>
            </div>
            <div className="content-texto-card-anotacao break-all whitespace-pre-wrap items-center">
                {anotacao.texto && (anotacao.texto.length > 450 ? anotacao.texto.substring(0, 450) + '...' : anotacao.texto)}
            </div>
            <div className="card-content-footer">
                <div className="flex gap-1 dark:text-neutro-100">
                    {(user && user.id != anotacao.user_id) && (
                        <LikeButton id={anotacao.id} liked={anotacao.curtida} />
                    )}
                    {/* <button type="button" className="comment-btn"><ChatTeardrop size={16} /></button> */}
                    {/* <button type="button" className="exclamation-btn"><ExclamationMark size={16}/></button> */}
                </div>
                <Link to={`view/${anotacao.id}`} className="button-visualizar-anotacao">
                    Ver mais
                </Link>
            </div>
        </div>
    );
});

export default CardComunidade;