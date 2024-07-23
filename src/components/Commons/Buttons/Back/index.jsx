import { CaretLeft } from "@phosphor-icons/react";
import React from "react";
import { Link } from "react-router-dom";

export default function BackButton({ voltar }) {
    return (
        <Link to={voltar} className="btn-back" title="Voltar">
            <CaretLeft size={16} />
        </Link>
    )
}