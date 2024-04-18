import React from "react";
import { Link } from "react-router-dom";
import { CaretLeft, ClockClockwise, PencilSimple, TrashSimple } from "@phosphor-icons/react";
import moment from "moment";
import darkColor from "../../../../hooks/DarkColor";

export default function HeaderAnotacao(params) {
    const darkenColor = (hex, percent) => {
        const dark = darkColor(hex, percent);
        return dark;
    };

    return (
        <div className="w-full pt-2 flex items-center md:items-start justify-between">
            <div className="w-[5%] flex justify-start">
                {params.voltar &&
                    <Link
                        to={params.voltar}
                        className="flex gap-1 rounded-lg bg-azul-200 px-2 py-1 text-sm items-center justify-center hover:bg-azul-300 hover:text-neutro-100 duration-200"
                        title="Voltar">
                        <CaretLeft size={15} />
                    </Link>
                }
            </div>
            <span className="flex justify-center flex-col items-center">
                <p className="font-medium dark:text-neutro-100">{params.title}</p>
                <span className="flex gap-2">
                    {params.disciplina && <p className="text-xs text-neutro-300">{params.disciplina}</p>}
                    {params.data && <p className="text-xs text-neutro-300">{moment(params.data).format('DD-MM-YYYY')}</p>}
                </span>
                {params.categorias &&
                    <span className="flex gap-1 mt-2">
                        {params.categorias.map((categoria, i) => (
                            <span key={i} className="px-1 text-xs font-semibold flex gap-2 border-2 rounded-md"
                                style={{
                                    backgroundColor: `${categoria.cor}`,
                                    color: darkenColor(categoria.cor, 40),
                                    borderColor: darkenColor(categoria.cor, 40)
                                }}>
                                {categoria.nome}
                            </span>
                        ))}
                    </span>
                }
            </span>
            <div className="w-[5%] flex justify-end">
                {params.restore ?
                    <button
                        onClick={() => params.restore(params.anotacao)}
                        className="flex gap-1 rounded-lg bg-verde-100 px-2 py-1 text-sm items-center justify-center hover:bg-verde-200 hover:text-neutro-100 duration-200"
                        title="Restaurar">
                        <ClockClockwise size={15} />
                    </button>
                    :
                    <div className="content-buttons-action flex-col md:flex-wrap">
                        {params.edit &&
                            <Link
                                to={params.edit}
                                className="flex gap-1 rounded-lg bg-azul-200 px-2 py-1 text-sm items-center justify-center hover:bg-azul-300 hover:text-neutro-100 duration-200"
                                title="Editar">
                                <PencilSimple size={15} />
                            </Link>
                        }
                        {params.delete &&
                            <button
                                onClick={() => params.delete(true)}
                                className="flex gap-1 rounded-lg bg-vermelho-200 px-2 py-1 text-sm items-center justify-center hover:bg-vermelho-300 hover:text-neutro-100 duration-200"
                                title="Excluir">
                                <TrashSimple size={15} />
                            </button>
                        }
                    </div>
                }
            </div>
        </div>
    )
}