import { ShareFat } from "@phosphor-icons/react";
import React, { useState } from "react";
import ApiUser from "../../../../../services/ApiUser";

export default function ShareMinimalist({ id, anotacao_comunidade }) {
    const [comunidade, setComunidade] = useState(anotacao_comunidade);

    const handleShare = async () => {
        try {
            const newComunidade = comunidade === 0 ? 1 : 0;
            setComunidade(newComunidade);
            await ApiUser.post(`/anotacao/comunidade/${id}`, {
                comunidade: newComunidade
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <button
            onClick={handleShare}
            className={`btn-share-minimize ${comunidade === 1 ? 'text-azul-200 hover:text-neutro-300' : 'text-neutro-300 hover:text-azul-200'}`}
            title="Compartilhar"
        >
            <ShareFat size={16} />
        </button>
    )
}