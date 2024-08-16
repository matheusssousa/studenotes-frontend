import React, { useEffect, useState } from "react";
import MainHeader from "../../../components/Commons/MainHeader";
import ApiAdmin from "../../../services/ApiAdmin";
import { toast } from "react-toastify";
import Loading from "../../../components/Commons/Loading";
import DashboardAnotacaoTip from "../../../components/Commons/DashboardTips/Anotacao";
import DashboardUsuarioTip from "../../../components/Commons/DashboardTips/Usuario";
import DashboardAdminTip from "../../../components/Commons/DashboardTips/Admin";
import DashboardDisciplinaTip from "../../../components/Commons/DashboardTips/Disciplina";
import DashboardCategoriaTip from "../../../components/Commons/DashboardTips/Categorias";
import DashboardComunidadeTip from "../../../components/Commons/DashboardTips/Comunidade";

export default function DashboardAdminPage(params) {
    const [informations, setInformations] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchInformations = async () => {
        setLoading(true);
        try {
            const { data } = await ApiAdmin.get('/dashboard');
            setInformations(data);
        } catch (error) {
            console.log(error);
            toast.error(error || 'Erro ao buscar informações');
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchInformations();
    }, []);
    return (
        <div className="page-content">
            <MainHeader
                page='Dashboard'
                text='O dashboard principal do sistema.'
            />
            {loading ? <Loading /> : (
                <div className="flex flex-col md:flex-row gap-2">
                    <div className="w-full md:w-1/4 md:h-full flex flex-col p-3 bg-white dark:bg-neutro-500 rounded-lg">
                        <DashboardUsuarioTip informations_usuario={informations.usuarios} />
                        <div className="line-horizontal" />
                        <DashboardAdminTip informations_admin={informations.admins} />
                        <div className="line-horizontal" />
                        <DashboardDisciplinaTip informations_disciplina={informations.disciplinas} />
                    </div>
                    <div className="w-full md:w-1/4 md:h-full flex flex-col p-3 rounded-lg">
                        <DashboardCategoriaTip informations_categoria={informations.categorias} />
                        <div className="line-horizontal" />
                        <DashboardAnotacaoTip informations_anotacao={informations.anotacoes} informations_ia={informations.uso_gpt} />
                    </div>
                    <div className="w-full md:w-1/2 md:h-full flex flex-col p-3 rounded-lg">
                        <DashboardComunidadeTip informations_comentarios={informations.comentarios} informations_curtidas={informations.curtidas} informations_anotacao={[informations.anotacoes.compartilhadas, informations.anotacoes.recentes_compartilhadas, informations.anotacoes.compartilhadas_uso_gpt]} />
                    </div>
                </div>
            )}
        </div>
    )
}