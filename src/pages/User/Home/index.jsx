import React, { useEffect, useState } from "react";
import MainHeader from "../../../components/Commons/MainHeader";
import ApiUser from "../../../services/ApiUser";
import Recents from "../../../components/Commons/Recents";
import Calendar from "../../../components/Commons/Calendar";

import './style.css';

export default function HomeUserPage(params) {
    const [recentes, setRecentes] = useState([]);
    const [anotacoesDataProximas, setAnotacoesDataProximas] = useState([]);
    const [dataInicio, setDataInicio] = useState('');
    const [dataFinal, setDataFinal] = useState('');

    const [loading, setLoading] = useState(true);

    const getDadosHome = async () => {
        try {
            const response = await ApiUser.get('/home', {
                params: {
                    data_inicio: dataInicio,
                    data_fim: dataFinal,
                }
            });
            setRecentes(response.data.anotacoes);
            setAnotacoesDataProximas(response.data.anotacoes_datas_proximas);
        } catch (error) {
            console.log(error)
        }
        setLoading(false);
    }

    useEffect(() => {
        getDadosHome();
    }, [])

        useEffect(() => {
        getDadosHome();
    }, [dataFinal, dataInicio])

    return (
        <div className="page-content">
            <MainHeader
                page='Home'
                text='A sua página inicial.'
            />
            <div className="row h-full">
                <div className="page-home-content-left">
                    <Recents recentes={recentes} loading={loading} />
                    <Calendar anotacoes={anotacoesDataProximas} setDataInicio={setDataInicio} setDataFinal={setDataFinal} loading={loading} />
                </div>
                <div className="page-home-content-right">

                </div>
            </div>
        </div>
    )
}