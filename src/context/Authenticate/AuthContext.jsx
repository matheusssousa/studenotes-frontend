import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import ApiAdmin from "../../services/ApiAdmin";
import ApiUser from "../../services/ApiUser";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authenticate, setAuthenticate] = useState(() => !!localStorage.getItem('@App:token'));
    const [admin, setAdmin] = useState(() => JSON.parse(localStorage.getItem('@App:admin')) || null);
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('@App:user')) || null);

    const getTokenExpirationTime = (token) => {
        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            return decodedToken.exp - currentTime;
        } catch (error) {
            console.error("Token inválido: ", error);
            return 0;
        }
    };

    const scheduleTokenRefresh = (token, refreshFunction) => {
        const timeLeft = getTokenExpirationTime(token);
        const refreshTime = (timeLeft - 300) * 1000;
        if (refreshTime > 0) {
            setTimeout(refreshFunction, refreshTime);
        }
    };

    const handleLogin = async (dataLogin, api, setRole, roleKey, refreshFunction) => {
        try {
            const response = await api.post('/auth/login', dataLogin);
            const { access_token, [roleKey]: role } = response.data;
            api.defaults.headers.Authorization = `Bearer ${access_token}`;
            localStorage.setItem('@App:token', access_token);
            localStorage.setItem(`@App:${roleKey}`, JSON.stringify(role));
            setAuthenticate(true);
            setRole(role);
            scheduleTokenRefresh(access_token, refreshFunction);
        } catch (error) {
            toast.error("Email e/ou senha inválidos!", { theme: "colored" });
            console.error(error);
        }
    };

    const handleLogout = async (api, roleKey, setRole) => {
        try {
            await api.post('/logout');
            localStorage.removeItem('@App:token');
            localStorage.removeItem(`@App:${roleKey}`);
            setAuthenticate(false);
            setRole(null);
        } catch (error) {
            console.error(error);
        }
    };

    const refreshToken = async (api, setRole, refreshFunction) => {
        if (authenticate) {
            try {
                const response = await api.post('/refresh');
                const { access_token } = response.data;
                api.defaults.headers.Authorization = `Bearer ${access_token}`;
                localStorage.setItem('@App:token', access_token);
                scheduleTokenRefresh(access_token, refreshFunction);
            } catch (error) {
                console.log(error);
                api.defaults.headers.Authorization = null;
                localStorage.removeItem('@App:token');
                setAuthenticate(false);
                setRole(null);
            }
        } else {
            localStorage.removeItem(`@App:${setRole === setAdmin ? 'admin' : 'user'}`);
            localStorage.removeItem('@App:token');
            setAuthenticate(false);
            setRole(null);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('@App:token');
        if (token) {
            const timeLeft = getTokenExpirationTime(token);
            if (timeLeft > 0) {
                if (admin) {
                    scheduleTokenRefresh(token, () => refreshToken(ApiAdmin, setAdmin, () => refreshToken(ApiAdmin, setAdmin)));
                } else if (user) {
                    scheduleTokenRefresh(token, () => refreshToken(ApiUser, setUser, () => refreshToken(ApiUser, setUser)));
                }
            } else {
                if (admin) {
                    refreshToken(ApiAdmin, setAdmin, () => refreshToken(ApiAdmin, setAdmin));
                } else if (user) {
                    refreshToken(ApiUser, setUser, () => refreshToken(ApiUser, setUser));
                }
            }
        }
    }, [admin, user]);

    return (
        <AuthContext.Provider value={{
            authenticate,
            admin,
            user,
            LoginUser: (dataLogin) => handleLogin(dataLogin, ApiUser, setUser, 'user', () => refreshToken(ApiUser, setUser, () => refreshToken(ApiUser, setUser))),
            LogoutUser: () => handleLogout(ApiUser, 'user', setUser),
            LoginAdmin: (dataLogin) => handleLogin(dataLogin, ApiAdmin, setAdmin, 'admin', () => refreshToken(ApiAdmin, setAdmin, () => refreshToken(ApiAdmin, setAdmin))),
            LogoutAdmin: () => handleLogout(ApiAdmin, 'admin', setAdmin),
            UserMe: async () => {
                try {
                    const response = await ApiUser.post('/me');
                    localStorage.setItem('@App:user', JSON.stringify(response.data));
                    setUser(response.data);
                } catch (error) {
                    console.log(error);
                }
            }
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
