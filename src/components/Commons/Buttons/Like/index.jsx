import React, { useState } from "react";
import ApiUser from "../../../../services/ApiUser";
import { Heart } from "@phosphor-icons/react";

export default function LikeButton({ id, liked }) {
    const [curtido, setCurtido] = useState(liked);
    
    const handleCurtir = async () => {
        try {
            await ApiUser.post(`/comunidade/curtir`, { anotacao_id: id });
            setCurtido(!curtido);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <button
            type="button"
            onClick={handleCurtir}
            className={curtido ? 'like-btn-curtido' : 'like-btn-descurtido'}
        >
            <Heart size={16} weight={curtido ? 'fill' : 'regular'} />
        </button>
    );
}