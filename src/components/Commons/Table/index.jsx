import React from "react";
import { ArrowClockwise, PencilSimple, TrashSimple } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

const Table = (params) => {
    const headers = {
        categorias: [
            { label: "ID", width: "10%" },
            { label: "Cor", width: "10%" },
            { label: "Nome", width: "40%" },
            { label: "Status", width: "20%" },
            { label: "Ações", width: "10%" },
        ],
        disciplinas: [
            { label: "ID", width: "10%" },
            { label: "Nome", width: "40%" },
            { label: "Status", width: "20%" },
            { label: "Ações", width: "30%" },
        ],
        usuarios: [
            { label: "ID", width: "10%" },
            { label: "Nome", width: "40%" },
            { label: "Email", width: "30%", hideOnMobile: true },
            { label: "Email Verificado", width: "20%", hideOnMobile: true },
            { label: "Status", width: "20%", hideOnMobile: true },
            { label: "Ações", width: "10%" },
        ],
        admins: [
            { label: "ID", width: "10%" },
            { label: "Nome", width: "40%" },
            { label: "Email", width: "30%", hideOnMobile: true },
            { label: "Email Verificado", width: "20%", hideOnMobile: true },
            { label: "Status", width: "20%", hideOnMobile: true },
            { label: "Ações", width: "10%" },
        ],
    };

    const renderHeaders = () => {
        return headers[params.type].map((header, index) => (
            <th key={index} className={`sticky ${index === 0 ? "rounded-tl-lg" : ""} ${index === headers[params.type].length - 1 ? "rounded-tr-lg" : ""}`} style={{ width: header.width }}>
                {header.label}
            </th>
        ));
    };

    return (
        <table>
            <thead>
                <tr className="table-row-header">
                    {renderHeaders()}
                </tr>
            </thead>
            <tbody>
                {params.items.map((item, i) => (
                    <tr key={i} className="table-row-body">
                        <td className="w-[10%]">{item.id}</td>
                        {item.cor && (<td className="w-[10%]"><div className="w-5 h-5 rounded-full" style={{ backgroundColor: `${item.cor}` }} /></td>)}
                        {item.nome && (<td className={`${(params.type === 'disciplinas' || params.type === 'categorias') && 'w-full'} w-[40%]`}>{item.nome}</td>)}
                        {item.name && (<td className="w-[40%]">{item.name}</td>)}
                        {item.email && (<td className="w-[30%]">{item.email}</td>)}
                        {!item.email_verified_at ?
                            (item.email_verified_at === null &&
                                <td className="w-[20%] hidden md:table-cell">
                                    <div className="inactive-email-card">
                                        Não verificado
                                    </div>
                                </td>
                            )
                            :
                            (item.email_verified_at &&
                                <td className="w-[20%] hidden md:table-cell">
                                    <div className="active-email-card">
                                        Verificado
                                    </div>
                                </td>
                            )
                        }
                        {item.deleted_at === null ?
                            <td className="w-[10%]">
                                <div className="active-card">
                                    Ativo
                                </div>
                            </td>
                            :
                            <td className="w-[10%]">
                                <div className="inactive-card">
                                    Excluído
                                </div>
                            </td>
                        }
                        <td className="w-[20%]">
                            {item.deleted_at === null ?
                                <div className="content-buttons-action">
                                    <Link to={`${params.admin ? `/admin` : ``}/${params.type}/addedit/${item.id}`} className="edit-action-btn" title="Editar"><PencilSimple size={20} /></Link>
                                    <button type="button" className="delete-action-btn" title="Excluir" onClick={() => params.delete(item.id)}><TrashSimple size={20} /></button>
                                </div>
                                :
                                <div>
                                    <button type="button" className="restore-action-btn" title="Restaurar" onClick={() => params.restore(item.id)} id="restore-button"><ArrowClockwise size={20} /></button>
                                </div>
                            }
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
