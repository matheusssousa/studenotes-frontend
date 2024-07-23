import React from "react";
import { Plus } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import BackButton from "../Buttons/Back";

export default function MainHeader({ voltar, page, text, adicionar }) {
    return (
        <div className="w-full pt-1 select-none flex flex-col items-center justify-center">
            <div className="w-full flex items-center justify-between gap-2 sm:gap-0">
                {voltar && (
                    <BackButton voltar={voltar} />
                )}
                <span>
                    <p className="text-lg font-medium dark:text-neutro-100">{page}</p>
                    <p className="text-xs text-neutro-300">{text}</p>
                </span>
                {adicionar &&
                    <Link
                        to={adicionar}
                        type="button"
                        className="flex gap-1 rounded-lg bg-azul-200 px-2 py-1 text-sm items-center justify-center hover:bg-azul-300 hover:text-neutro-100 duration-200">
                        <Plus size={16} />
                        Cadastrar
                    </Link>
                }
            </div>
        </div>
    )
}