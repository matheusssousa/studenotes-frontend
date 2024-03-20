import React from "react";

export default function ModalDelete(param) {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <p>{param.title}</p>
                <p>Tem certeza que deseja excluir {param.item}?</p>
                <div className="container-action-buttons">
                    <button type="button" title="Confirmar" className="confirm-button-modal" onClick={() => param.delete()}>Confirmar</button>
                    <button type="button" title="Cancelar" className="cancel-button-modal" onClick={() => param.cancel(false)}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}