import React from "react";
import { TrashSimple } from "@phosphor-icons/react";

export default function DeleteMinimalist({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="btn-delete-minimize"
            title="Excluir"
        >
            <TrashSimple size={16} />
        </button>
    );
}