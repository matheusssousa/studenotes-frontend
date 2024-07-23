import { PencilSimple } from "@phosphor-icons/react";
import React from "react";
import { Link } from "react-router-dom";

export default function EditMinimalist({ edit }) {
    return (
        <Link
            to={edit}
            className="btn-edit-minimize"
            title="Editar"
        >
            <PencilSimple size={16} />
        </Link>
    )
}