import React from "react";

import '../modal.css';

export default function ModalDelete(params) {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <p className="title-modal">Excluir {params.item.nome}</p>
                <p className="text-modal">Tem certeza que deseja excluir {params.item.nome}?</p>
                <div className="container-action-buttons">
                    <button type="button" title="Confirmar" className="confirm-button-modal" onClick={() => params.delete(params.item.id)}>Confirmar</button>
                    <button type="button" title="Cancelar" className="cancel-button-modal" onClick={() => params.cancel(false)}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}