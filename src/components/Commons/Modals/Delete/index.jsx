import React from "react";

import '../modal.css';

export default function ModalDelete(param) {
    console.log(param);
    return (
        <div className="modal-overlay">
            <div className="modal">
                <p className="title-modal">Excluir {param.item.nome}</p>
                <p className="text-modal">Tem certeza que deseja excluir {param.item.nome}?</p>
                <div className="container-action-buttons">
                    <button type="button" title="Confirmar" className="confirm-button-modal" onClick={() => param.delete(param.item.id)}>Confirmar</button>
                    <button type="button" title="Cancelar" className="cancel-button-modal" onClick={() => param.cancel(false)}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}