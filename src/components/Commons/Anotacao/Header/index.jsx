import React from "react";
import moment from "moment";
import { useAuth } from "../../../../context/Authenticate/AuthContext";
import "./style.css";
import ViewCategorias from "../../Categoria/ViewCategorias";
import BackButton from "../../Buttons/Back";
import DeleteMinimalist from "../../Buttons/Delete/DeleteMinimalist";
import EditMinimalist from "../../Buttons/Edit/EditMinimalist";
import ShareMinimalist from "../../Buttons/Share/ShareMinimalist";
import LikeButton from "../../Buttons/Like";
import RestoreMinimalist from "../../Buttons/Restore/RestoreMinimalist";
import DenunciaButton from "../../Buttons/Denuncia";
import { Sparkle } from "@phosphor-icons/react";

const ActionButtons = ({ onDelete, id, user }) => (
    <>
        {user && <EditMinimalist edit={`/anotacoes/addedit/${id}`} />}
        {onDelete && (
            <DeleteMinimalist onClick={() => onDelete(id)} />
        )}
    </>
);

export default function HeaderAnotacao({ params, voltar, restore, onDelete }) {
    const { user, admin } = useAuth();
    const { id, nome, disciplina, data_prazo, categorias, username, use_gpt } = params;
    const adminUser = !!((username && username?.id === user?.id) || admin);

    return (
        <div className="content-header-anotacao">
            <div className="w-[5%] flex justify-start">
                {voltar && <BackButton voltar={voltar} />}
                {adminUser ?
                    <div className="py-2">
                        <ShareMinimalist id={id} anotacao_comunidade={params.comunidade} />
                    </div>
                    :
                    <div className="py-2">
                        <DenunciaButton denunciado_id={id} denunciado_type="Anotacao" />
                    </div>
                }
            </div>
            <span className="flex justify-center flex-col items-center">
                <p className="font-medium dark:text-neutro-100 flex gap-1">{nome} {use_gpt && <Sparkle size={16} className="text-azul-200" weight="fill"/>}</p>
                {(disciplina || data_prazo || username) && (
                    <span className="flex gap-2">
                        {disciplina && <p className="text-xs text-neutro-300">{disciplina.nome}</p>}
                        {data_prazo && <p className="text-xs text-neutro-300">{moment(data_prazo).format('DD-MM-YYYY')}</p>}
                        {username && voltar === '/comunidade' && <p className="text-xs text-neutro-300">{username.name}</p>}
                    </span>
                )}
                {categorias && (
                    <ViewCategorias categorias={categorias} />
                )}
            </span>
            <div className="w-[5%] flex justify-end py-2">
                {adminUser ? (
                    <div className="content-buttons-action flex-col md:flex-row">
                        {restore ? (
                            <RestoreMinimalist onClick={() => restore(id)} />
                        ) : (
                            <ActionButtons onDelete={onDelete} id={id} user={user} />
                        )}
                    </div>
                ) : (
                    <LikeButton id={id} liked={params.curtida} />
                )}
            </div>
        </div>
    );
}
