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
import DashboardUsoIATip from "../../../components/Commons/DashboardTips/UsoIA";

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
                <div className="conteudo-content">
                    <div className="row h-1/2 items-start">
                        <div className="w-full md:w-1/2 flex flex-col md:flex-row gap-2 h-full">
                            <div className="w-full flex flex-col gap-2 h-full">
                                <DashboardUsuarioTip informations_usuario={informations.usuarios} />
                                <DashboardAdminTip informations_admin={informations.admins} />
                            </div>
                            <DashboardDisciplinaTip informations_disciplina={informations.disciplinas} />
                        </div>
                        <div className="w-full md:w-1/2 flex flex-col md:flex-row gap-2 h-full">
                            <DashboardCategoriaTip informations_categoria={informations.categorias} />
                            <div className="w-full flex-col flex h-full gap-2">
                                <DashboardAnotacaoTip informations_anotacao={informations.anotacoes} />
                                <DashboardUsoIATip information_uso_ia={informations.uso_gpt} />
                            </div>
                        </div>
                    </div>
                    <div className="row h-1/2 items-start">
                        <DashboardComunidadeTip informations_comentarios={informations.comentarios} informations_curtidas={informations.curtidas} informations_anotacao={[informations.anotacoes.compartilhadas, informations.anotacoes.recentes_compartilhadas, informations.anotacoes.compartilhadas_uso_gpt]} />
                    </div>
                </div>
            )}
        </div>
    )
}