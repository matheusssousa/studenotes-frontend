import { SmileyXEyes } from "@phosphor-icons/react";
import React from "react";

export default function ErrorDenied(params) {
    return (
        <div className="w-full h-full items-center flex justify-center flex-col text-neutro-300 dark:text-neutro-150 drop-shadow-md select-none opacity-50">
            <SmileyXEyes size={50} />
            <p className="text-xs text-center w-1/3 md:w-full">Sinto muito! Não encontramos nada por aqui.</p>
        </div>
    )
}