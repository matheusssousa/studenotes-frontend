import React from "react";
import { FileDoc, FileJpg, FilePdf, FilePng } from "@phosphor-icons/react";

const FileIcon = ({ type }) => {
    switch (type) {
        case 'pdf':
            return <FilePdf size={25} />;
        case 'doc':
        case 'docx':
            return <FileDoc size={25} />;
        case 'jpg':
        case 'jpeg':
            return <FileJpg size={25} />;
        case 'png':
            return <FilePng size={25} />;
        default:
            return null;
    }
};

export default function Arquivos({arquivos}) {
    return (
        arquivos.length > 0 && (
            <div className="w-full text-sm rounded-lg bg-neutro-200 dark:bg-neutro-500 dark:text-neutro-100 p-1 md:p-5 flex gap-2">
                {arquivos.map((arquivo, index) => (
                    <a key={index} href={`http://localhost:8000/storage/${arquivo.arquivo}`} target="_blank" rel="noreferrer" className="rounded-md bg-neutro-100 dark:bg-neutro-600 dark:text-neutro-100 p-2 hover:bg-neutro-150 dark:hover:bg-neutro-400 duration-200 ease-in flex gap-1 items-center">
                        <FileIcon type={arquivo.tipo} />
                        <p>{arquivo.nome}</p>
                    </a>
                ))}
            </div>
        )
    )
}