import React, { useEffect, useState } from "react";
import moment from "moment";

import "./style.css";

export default function CardAnotacaoCalendar(params) {
    const [cardLong, setCardLong] = useState(false);

    const defineCard = () => {
        if (moment(params.anotacao.data_prazo).format('YYYY-MM-DD') == new moment(Date()).format('YYYY-MM-DD')) {
            setCardLong(true);
        } else {
            setCardLong(false);
        }
    }

    useEffect(() => {
        defineCard();
    }, [params.anotacao]);

    return (
        <div className={`card-anotacao-calendar-${cardLong ? 'long' : 'short'}`}>
            <p className="text-sm dark:text-neutro-100 text-neutro-400">{cardLong ? (params.anotacao.nome) : (params.anotacao.nome.length > 25 ? params.anotacao.nome.substring(0, 25) + '...' : params.anotacao.nome)}</p>
            <div className="text-xs text-neutro-300 flex items-center gap-5">
                {cardLong && (params.anotacao.disciplina && <small>{params.anotacao.disciplina.nome}</small>)}
                <small>{moment(params.anotacao.data_prazo).format('DD-MM-YYYY')}</small>
            </div>
        </div>
    )
}