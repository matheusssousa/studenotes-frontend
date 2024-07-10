import React, { useRef } from "react";
import './style.css';
import { CloudArrowUp, X } from "@phosphor-icons/react";

export default function UploadFile({ arquivos, setArquivos }) {
    const fileInputRef = useRef();

    const handleDrop = (event) => {
        event.preventDefault();
        const newFiles = Array.from(event.dataTransfer.files);
        setArquivos([...arquivos, ...newFiles]);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    return (
        <div className="uploadContent"
            onDrop={handleDrop}
            onDragOver={handleDragOver}>
            <label className="inputFile">
                <input
                    ref={fileInputRef}
                    type="file"
                    name="arquivos"
                    className="hidden"
                    multiple
                    onChange={(event) => {
                        const newFiles = Array.from(event.target.files);
                        setArquivos([...arquivos, ...newFiles]);
                        event.target.files = null;
                    }} />
                <CloudArrowUp size={30} />
                <p>Upload</p>
                <small className="text-neutro-300 text-xs">Selecione ou arraste arquivos</small>
            </label>
            {arquivos.length > 0 && (
                <div className="selectedFiles">
                    {arquivos.map((file, index) => (
                        <div key={index} className="selectedFile">
                            {file.name ? (file.name.length > 40 ? `${file.name.substring(0, 40)}...` : file.name) : (file.arquivo.length > 50 ? `${file.arquivo.substring(0, 50)}...` : file.arquivo)}
                            <button
                                onClick={() => {
                                    const newArquivos = [...arquivos];
                                    newArquivos.splice(index, 1);
                                    setArquivos(newArquivos);
                                }}
                                className="button-remove"
                                type="button">
                                <X size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}