import { createContext, useCallback, useState } from "react";
import { baseURL, postReq } from "../../utils/services";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [registerError, setRegisterError] = useState(null);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [registerInfo, setRegisterInfo] = useState({
        name: "",
        email: "",
        password: ""
    });

    console.log("User", user);      {/* user debugging */}
    console.log(registerInfo);

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    }, []);

    const registerUser = useCallback(async (e) => {
        e.preventDefault();
        setIsRegisterLoading(true);
        setRegisterError(null);

        const response = await postReq(`${baseURL}/users/register`, JSON.stringify(registerInfo));
        setIsRegisterLoading(false)

        if (response.error) {
            return setRegisterError(response);
        }
        {/* user info is pulled from browser local storage */}
        localStorage.setItem("User", JSON.stringify(response));
        setUser(response);
    }, [registerInfo]);

    const logOut = (() => {
        localStorage.removeItem("User");
        setUser(null);
    }, []);


    return (
        <AuthContext.Provider
            value={{
                user,
                registerInfo,
                updateRegisterInfo,
                registerUser,
                registerError,
                isRegisterLoading,
                logOut
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

