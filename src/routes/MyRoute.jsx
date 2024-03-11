import React from "react";
import { useAuth } from "../providers/AuthProvider";

import StrutureRoute from "./StrutureRoute";

const MyRoute = () => {
    const { authenticate, admin, user } = useAuth();

    if (authenticate) {
        if (admin) {
            return <StrutureRoute route='PrivateAdmin'/>;
        } else if (user) {
            return <StrutureRoute route='PrivateUser' />;
        }
    } else if (!authenticate) {
        return <StrutureRoute route='Public' />
    }
}

export default MyRoute;