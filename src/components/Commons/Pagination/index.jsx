import React from "react";
import { CaretDoubleLeft, CaretDoubleRight, CaretLeft, CaretRight } from "@phosphor-icons/react";

import "./style.css";

export default function Pagination({ pagination, setPage }) {
    // console.log("CURRENT PAGE ",pagination.current_page);
    return (
        <div className="flex gap-7">
            <button type="button" onClick={() => setPage(1)}><CaretDoubleLeft size={20} /></button>
            <button type="button" disabled={!pagination.prev_page_url} onClick={() => setPage(pagination.current_page - 1)}><CaretLeft size={20} /></button>
            <span className="pagination-current">{pagination.current_page}</span>
            <button type="button" disabled={!pagination.next_page_url} onClick={() => setPage(pagination.current_page + 1)}><CaretRight size={20} /></button>
            <button type="button" onClick={() => setPage(pagination.last_page)}><CaretDoubleRight size={20} /></button>
        </div>
    )
}
