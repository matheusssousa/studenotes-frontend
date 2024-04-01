import React from "react";
import MainHeader from "../../../components/Commons/MainHeader";

export default function AnotacaoUserPage(params) {
    return (
        <div className="page-content">
            <MainHeader
                page='Anotações'
                text='Uma lista das suas anotações.'
                adicionar='/anotacoes/addedit/'
            />
        </div>
    )
}