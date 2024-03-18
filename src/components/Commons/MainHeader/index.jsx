import React from "react";

export default function MainHeader({ page, action }) {
    return (
        <div className="w-full flex items-center justify-between py-1 select-none">
            <span className=""></span>
            <p className="font-medium">{page}</p>
            <p className="">{action && `${page}/${action}`}</p>
        </div>
    )
}