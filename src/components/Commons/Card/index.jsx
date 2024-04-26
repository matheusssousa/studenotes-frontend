import React from "react";
import { Link } from "react-router-dom";
import { ArrowClockwise, PencilSimple, SealCheck, SealWarning, TrashSimple } from "@phosphor-icons/react";
import adjustColor from "../../../hooks/AdjustColor";

import './style.css';

export default function Card(params) {
    const darkenColor = params.type === 'categorias' ? adjustColor(params.item.cor, 40) : params.item.cor;

    return (
        <div className={params.type === 'categorias' ? 'card-categoria' : 'card'} style={params.type === 'categorias' ? { backgroundColor: params.item.cor, border: 2, borderColor: darkenColor, borderStyle: 'solid' } : {}}>
            <div className="content-header-card">
                {params.item.name && (<p className="title-name-card">{params.item.name}
                    {!params.item.email_verified_at ?
                        (params.item.email_verified_at === null &&
                            <div className="text-neutro-300">
                                <SealWarning size={20} weight="fill" />
                            </div>
                        )
                        :
                        (params.item.email_verified_at &&
                            <div className="text-azul-200">
                                <SealCheck size={20} weight="fill" />
                            </div>
                        )
                    }
                </p>)
                }
                {params.item.nome && (<p className="title-card" style={params.type === 'categorias' ? { color: darkenColor } : {}}>{params.item.nome}</p>)}
                {params.item.email && (<p className="email-card">{params.item.email}</p>)}
            </div>
            <div className="content-footer-card">
                {params.item.deleted_at === null ?
                    (params.type === 'categorias' ? '' :
                        <div className="active-card">
                            Ativo
                        </div>)
                    :
                    <div className="inactive-card">
                        Excluído
                    </div>
                }
                {params.item.deleted_at === null ?
                    <div className="content-buttons-action">
                        <Link to={`${params.admin ? `/admin` : ``}/${params.type}/addedit/${params.item.id}`} className={params.type === 'categorias' ? "edit-action-btn-categoria" : "edit-action-btn"} style={params.type === 'categorias' ? { color: darkenColor } : {}} title="Editar"><PencilSimple size={20} /></Link>
                        <button type="button" className={params.type === 'categorias' ? "delete-action-btn-categoria" : "delete-action-btn"} style={params.type === 'categorias' ? { color: darkenColor } : {}} title="Excluir" onClick={() => params.delete(params.item.id)}><TrashSimple size={20} /></button>
                    </div>
                    :
                    <div>
                        <button type="button" className={params.type === 'categorias' ? "restore-action-btn-categoria" : "restore-action-btn"} style={params.type === 'categorias' ? { color: darkenColor } : {}} title="Restaurar" onClick={() => params.restore(params.item.id)} id="restore-button"><ArrowClockwise size={20} /></button>
                    </div>
                }
            </div>
        </div>
    )
}