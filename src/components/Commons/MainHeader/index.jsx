import { CaretLeft, Plus } from "@phosphor-icons/react";
import React from "react";
import { Link } from "react-router-dom";

export default function MainHeader({ voltar, page, text, adicionar }) {
    return (
        <div className="w-full pt-1 select-none flex flex-col items-center">
            <div className="w-full flex items-center justify-between gap-2 sm:gap-0">
                {voltar && (
                    <Link className="sm:absolute sm:left-14 bg-azul-200 py-2 px-2 sm:px-0 rounded-md sm:rounded-l-none sm:rounded-r-md hover:drop-shadow-md duration-200 ease-in hover:text-neutro-100" to={voltar}>
                        <CaretLeft size={15} />
                    </Link>
                )}
                <span>
                    <p className="font-medium dark:text-neutro-100">{page}</p>
                    <p className="text-xs text-neutro-300">{text}</p>
                </span>
                {adicionar &&
                    <Link
                        to={adicionar}
                        type="button"
                        className="flex gap-1 rounded-lg bg-azul-200 px-2 py-1 text-sm items-center justify-center hover:bg-azul-300 hover:text-neutro-100 duration-200">
                        <Plus size={15} />
                        Cadastrar
                    </Link>
                }
            </div>
        </div>
    )
}