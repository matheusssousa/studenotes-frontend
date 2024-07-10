import React from "react";
import NewComentario from "../AddEdit/index";
import { CaretDown, PencilSimple, SealCheck, TrashSimple } from "@phosphor-icons/react";
import moment from "moment";

const Comentario = ({
    comentario,
    user,
    toggleRespostas,
    toggleEditComentario,
    toggleResponderComentario,
    handleDenunciar,
    handleDelete,
    viewRespostas,
    editComentario,
    responderComentario,
    respostas,
    anotacao,
    loading,
    isResposta = false  // Nova propriedade para distinguir se é uma resposta
}) => (
    <div className="comentario">
        <div className="flex gap-2 items-baseline">
            <p className="text-neutro-300">
                {comentario.user.name}
                {comentario.user.role === 'admin' && <SealCheck size={16} className="text-azul-200" title="Administrador" />}
            </p>
            <small className="text-neutro-400 dark:text-neutro-250">
                {moment(comentario.created_at).format('D/M/Y')}
            </small>
            {comentario.created_at !== comentario.updated_at && (
                <small className="text-neutro-400 dark:text-neutro-250">Editado</small>
            )}
        </div>
        {!editComentario[comentario.id] ? (
            <>
                <p className="w-full whitespace-pre-wrap">{comentario.conteudo}</p>
                <div className="flex gap-2 items-center justify-between">
                    {!isResposta && (
                        <button type="button" className="text-xs text-neutro-300 flex gap-1" onClick={() => toggleRespostas && toggleRespostas(comentario.id)}>
                            {toggleRespostas && <CaretDown size={16} className={`${viewRespostas[comentario.id] ? 'rotate-0' : 'rotate-180'} duration-150 ease-in-out`} />} Respostas
                        </button>
                    )}
                    <div className="flex gap-2">
                        {!isResposta && toggleResponderComentario && (
                            <button type="button" className="button-visualizar-anotacao text-xs" onClick={() => toggleResponderComentario(comentario.id)}>
                                {responderComentario[comentario.id] ? 'Cancelar' : 'Responder'}
                            </button>
                        )}
                        {(comentario.user_id !== user.id || user.role === 'admin') && (
                            <button type="button" className="button-visualizar-anotacao text-xs" onClick={() => handleDenunciar(comentario.id)}>Denunciar</button>
                        )}
                        {(comentario.user.id === user.id || user.role === 'admin') && (
                            <div className="flex">
                                <button type="button" className="btn-edit-minimize" onClick={() => toggleEditComentario(comentario.id)}>
                                    <PencilSimple size={16} />
                                </button>
                                <button type="button" className="btn-delete-minimize" onClick={() => handleDelete(comentario.id)}>
                                    <TrashSimple size={16} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </>
        ) : (
            <NewComentario anotacao={anotacao} edit_comentario={comentario.id} />
        )}
        {responderComentario && responderComentario[comentario.id] && <NewComentario anotacao={anotacao} resposta_comentario_id={comentario.id} />}
        {viewRespostas && viewRespostas[comentario.id] && respostas && respostas.map((resposta, index) => (
            <div className="pl-3" key={index}>
                <Comentario
                    comentario={resposta}
                    user={user}
                    handleDenunciar={handleDenunciar}
                    handleDelete={handleDelete}
                    toggleEditComentario={toggleEditComentario}
                    editComentario={editComentario}
                    anotacao={anotacao}
                    loading={loading}
                    isResposta={true}  // Passa a propriedade isResposta como true para respostas
                />
            </div>
        ))}
    </div>
);

export default Comentario;
