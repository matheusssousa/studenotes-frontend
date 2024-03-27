import React from "react";
import { Cards, ListDashes } from "@phosphor-icons/react";

import "./style.css";

export default function ViewMode(params) {
    return (
        <div className="content-view-buttons">
            <button type="button" onClick={() => params.setViewMode('card')} title="Visualização em Cards" className={`${params.viewMode === 'card' ? 'active':''} button-view-mode`}><Cards size={20} /></button>
            <button type="button" onClick={() => params.setViewMode('list')} title="Visualização em Lista" className={`${params.viewMode === 'list' ? 'active':''} button-view-mode`}><ListDashes size={20} /></button>
        </div>
    )
}