import { Plus } from "@phosphor-icons/react";
import React from "react";
import { Link } from "react-router-dom";

export default function MainHeader({ page, text, adicionar }) {
    return (
        <div className="w-full pt-1 select-none flex flex-col items-center">
            <div className="w-full flex items-center justify-between">
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