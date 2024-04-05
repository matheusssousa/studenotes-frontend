import React from "react";
import { Link } from "react-router-dom";
import { ArrowClockwise, PencilSimple, SealCheck, SealWarning, TrashSimple } from "@phosphor-icons/react";

import './style.css';

function darkColor(hex, percent) {
    // Convertendo a cor hexadecimal para RGB
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);

    // Diminuindo os valores RGB para escurecer a cor
    r = Math.floor(r * (1 - percent / 100));
    g = Math.floor(g * (1 - percent / 100));
    b = Math.floor(b * (1 - percent / 100));

    // Garantindo que os valores RGB estejam dentro do intervalo [0, 255]
    r = r < 0 ? 0 : r > 255 ? 255 : r;
    g = g < 0 ? 0 : g > 255 ? 255 : g;
    b = b < 0 ? 0 : b > 255 ? 255 : b;

    // Convertendo os valores RGB de volta para hexadecimal
    const newHex = `#${(r * 0x10000 + g * 0x100 + b).toString(16).padStart(6, '0')}`;

    return newHex;
}

export default function Card(params) {
    const darkenColor = params.type === 'categorias' ? darkColor(params.item.cor, 40) : params.item.cor;

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