import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import VerifyEmailUserPage from "../../pages/User/Auth/VerifyEmail";

export default function EmailVerifyRouteUser(params) {
    return (
        <Routes>
            <Route path="*" element={<Navigate to='/verifyemail' />} />
            <Route path="/verifyemail" element={<VerifyEmailUserPage />} />
        </Routes>
    )
}