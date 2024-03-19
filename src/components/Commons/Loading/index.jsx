import React from "react";

import "./style.css";

export default function Loading({ loading }) {
    return (
        <div className="loading-content">
            <span className="loading-bar-1"/>
            <span className="loading-bar-2"/>
            <span className="loading-bar-3"/>
        </div>
    )
}