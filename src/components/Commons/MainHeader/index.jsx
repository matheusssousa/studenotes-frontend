import { Plus } from "@phosphor-icons/react";
import React from "react";

export default function MainHeader({ page, text, setFunction }) {
    console.log(setFunction);
    return (
        <div className="w-full py-1 select-none flex flex-col items-center">
            <div className="w-full flex items-center justify-between">
                <span>
                    <p className="font-medium">{page}</p>
                    <p className="text-xs text-neutro-300">{text}</p>
                </span>
                {setFunction &&
                    <button
                        type="button"
                        onClick={() => setFunction(true)}
                        className="flex gap-1 rounded-lg bg-azul-200 px-2 py-1 text-sm items-center justify-center hover:bg-azul-300 hover:text-neutro-100 duration-200">
                        <Plus size={15} />
                        Cadastrar
                    </button>
                }
            </div>
        </div>
    )
}