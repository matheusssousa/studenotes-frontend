import React from "react";
import { CaretDoubleLeft, CaretDoubleRight, CaretLeft, CaretRight } from "@phosphor-icons/react";

import "./style.css";

export default function Pagination({ pagination, setPage }) {
    const { from, to, current_page, per_page, total, prev_page_url, next_page_url } = pagination;

    return (
        <nav className='pagination'>
            {/* <p>Mostrando<span className='font-medium'> {from} </span>ao<span className='font-medium'> {to} </span>de<span className='font-medium'> {total} </span>resultados</p> */}

            <ul className="inline-flex items-center -space-x-px gap-2">
                <button className="relative inline-flex items-center hover:text-azul-300 disabled:text-neutro-300 disabled:hover:text-neutro-300"
                    onClick={() => setPage(1)} disabled={!prev_page_url}>
                    <CaretDoubleLeft size={16}/>
                </button>

                <button className="relative inline-flex items-center hover:text-azul-300 disabled:text-neutro-300 disabled:hover:text-neutro-300"
                    onClick={() => setPage(current_page - 1)} disabled={!prev_page_url}>
                    <CaretLeft size={16}/>
                </button>

                <button className="relative inline-flex items-center text-sm font-medium px-3 py-1 rounded bg-azul-200 shadow"
                    onClick={() => setPage(current_page)} disabled>{current_page}</button>

                <button className="relative inline-flex items-center hover:text-azul-300 disabled:text-neutro-300 disabled:hover:text-neutro-300"
                    onClick={() => setPage(current_page + 1)} disabled={!next_page_url}>
                    <CaretRight size={16}/>
                </button>

                <button className="relative inline-flex items-center hover:text-azul-300 disabled:text-neutro-300 disabled:hover:text-neutro-300"
                    onClick={() => setPage(Math.ceil(total / per_page))} disabled={!next_page_url}>
                    <CaretDoubleRight size={16}/>
                </button>
            </ul>
        </nav>
    )
}