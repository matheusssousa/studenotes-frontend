import React from "react";
import adjustColor from "../../../../hooks/AdjustColor";
import moment from "moment";
import { ArrowClockwise, Eye, Files, PencilSimple, TrashSimple } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

import "./style.css";

export default function AnotacaoTable(params) {
    const darkenColor = (hex, percent) => {
        const dark = adjustColor(hex, percent);
        return dark;
    };
    return (
        <>
            {params.items.map((item, i) => (
                <div key={i} className="table-row-anotacao">
                    <div className="w-[20%] flex items-center">
                        <span className="w-[70%] flex flex-col">
                            <p className="text-base font-medium text-start dark:text-neutro-100">{item.nome}</p>
                            <div className="flex gap-3 -translate-y-1">
                                {item.disciplina && <small className="text-neutro-300">{item.disciplina.nome}</small>}
                                {item.data_prazo && <small className="text-neutro-300">{moment(item.data_prazo).format('DD-MM-YYYY')}</small>}
                            </div>
                        </span>
                        <span className="w-[30%] flex gap-1 flex-wrap items-start justify-center">
                            {item.categorias.map((categoria, i) => (
                                <div key={i} style={{ backgroundColor: `${categoria.cor}`, borderColor: darkenColor(categoria.cor, 40) }} className="w-7 h-3 rounded-full border" />
                            ))}
                        </span>
                    </div>
                    <div className="content-texto-card-anotacao-table">
                        {item.texto.length > 200 ? item.texto.substring(0, 200) + '...' : item.texto}
                    </div>
                    <div className="content-texto-card-anotacao-mobile-table">
                        {item.texto.length > 70 ? item.texto.substring(0, 70) + '...' : item.texto}
                    </div>
                    <div className="w-[20%] flex items-center justify-center">
                        {item.arquivos.length > 0 ? (
                            item.arquivos.length > 1 ? (
                                <span className="flex gap-1 text-neutro-300 items-center font-semibold rounded-md">
                                    <Files size={15} /> <small>Arquivos</small>
                                </span>
                            ) : (
                                <span className="flex gap-1 text-neutro-300 items-center font-semibold rounded-md">
                                    <File size={15} /> <small>Arquivo</small>
                                </span>
                            )
                        ) : null}
                    </div>
                    <div className="w-[10%] flex items-center justify-end">
                        {item.deleted_at === null ?
                            <div className="content-buttons-action">
                                <Link to={`/anotacoes/view/${item.id}`} className="view-action-btn" title="Visualizar"><Eye size={20} /></Link>
                                <Link to={`/anotacoes/addedit/${item.id}`} className="edit-action-btn" title="Editar"><PencilSimple size={20} /></Link>
                                <button type="button" className="delete-action-btn" title="Excluir" onClick={() => params.delete(item.id)}><TrashSimple size={20} /></button>
                            </div>
                            :
                            <div>
                                <button type="button" className="restore-action-btn" title="Restaurar" onClick={() => params.restore(item.id)} id="restore-button"><ArrowClockwise size={20} /></button>
                            </div>
                        }
                    </div>
                </div>
            ))}
        </>
    )
}