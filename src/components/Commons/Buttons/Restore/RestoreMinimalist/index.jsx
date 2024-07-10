import React from "react";
import { ClockClockwise } from "@phosphor-icons/react";

export default function RestoreMinimalist({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="btn-restore-minimize"
            title="Restaurar"
        >
            <ClockClockwise size={16} />
        </button>
    )
}