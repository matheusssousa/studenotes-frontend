import React from "react";

import "./style.css";

export default function LoadingMini(params) {
    return (
        <div className="w-full flex items-center justify-center">
            <svg className="spinner" viewBox="0 0 50 50">
                <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="4"></circle>
            </svg>
        </div>
    );
}