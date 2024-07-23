import { ExclamationMark } from "@phosphor-icons/react";
import React, { useState } from "react";
import ModalDenuncia from "../../Modals/Denuncia";

export default function DenunciaButton({ denunciado_id, denunciado_type }) {
    const [openModalDenuncia, setOpenModalDenuncia] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setOpenModalDenuncia(true)}
                className="btn-denuncia"
                title="Denunciar">
                <ExclamationMark size={16} />
            </button>
            {openModalDenuncia && <ModalDenuncia denunciado_id={denunciado_id} denunciado_type={denunciado_type} close={setOpenModalDenuncia} />}
        </>
    )
}