import { createContext, useEffect, useState } from "react";
import { baseURL, getReq, postReq } from "../../utils/services";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {

    const [userChats, setUserChats] = useState(null);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);

    useEffect(() =>{
        const getUserChats = async () => {
            if(user?._id){
                setIsUserChatsLoading(true);
                setUserChatsError(null);
                const response = await getReq(`${baseURL}/chats/${user?._id}`);
                
                setIsUserChatsLoading(false);

                if(response.error){
                    return setUserChatsError(response);
                }
                setUserChats(response);
            }
        }

        getUserChats();
    }, [user]);

    return (
        <ChatContext.Provider value={{
            userChats,
            isUserLoading: isUserChatsLoading,
            userChatsError
        }}>
            {children}
        </ChatContext.Provider>
    )
}