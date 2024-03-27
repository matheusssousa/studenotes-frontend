import React from "react";
import { Link } from "react-router-dom";
import { ArrowClockwise, PencilSimple, SealCheck, SealWarning, TrashSimple } from "@phosphor-icons/react";

import './style.css';

export default function Card(params) {
    return (
        <div className="card">
            <div className="content-header-card">
                {params.item.name && (<p className="title-name-card">{params.item.name}
                    {params.item.email_verified_at &&
                        (params.item.email_verified_at === null ?
                            <div className="text-neutro-300">
                                <SealWarning size={20} weight="fill" />
                            </div>
                            :
                            <div className="text-azul-200">
                                <SealCheck size={20} weight="fill" />
                            </div>
                        )
                    }
                </p>)
                }
                {params.item.nome && (<p className="title-card">{params.item.nome}</p>)}
                {params.item.email && (<p className="email-card">{params.item.email}</p>)}
            </div>
            <div className="content-footer-card">
                {params.item.deleted_at === null ?
                    <div className="active-card">
                        Ativo
                    </div>
                    :
                    <div className="inactive-card">
                        Inativo
                    </div>
                }
                {params.item.deleted_at === null ?
                    <div className="content-buttons-action">
                        <Link to={`${params.admin ? `/admin` : ``}/${params.type}/addedit/${params.item.id}`} className="edit-action-btn" title="Editar"><PencilSimple size={20} /></Link>
                        <button type="button" className="delete-action-btn" title="Excluir" onClick={() => params.delete(item.id)}><TrashSimple size={20} /></button>
                    </div>
                    :
                    <div>
                        <button type="button" className="restore-action-btn" title="Restaurar" onClick={() => params.restore(item.id)} id="restore-button"><ArrowClockwise size={20} /></button>
                    </div>
                }
            </div>
        </div>
    )
}