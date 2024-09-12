import { createContext, useCallback, useEffect, useState } from "react";
import { baseURL, getReq, postReq } from "../../utils/services";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {

    const [userChats, setUserChats] = useState(null);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);
    const [potentialChats, setPotentialChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState(null);
    const [loadingMessages, setLoadingMessages] = useState(false);
    const [messageError, setMessageError] = useState(null);
    

    //Gets all of the users the current user can chat with 
    useEffect(() => {
        const getUsers = async () => {
            const response = await getReq(`${baseURL}/users`);

            if (response.error) {
                return console.log("Error fetching users!");
            }

            const pChats = response.filter((u) => {
                let isChatCreated = false;

                if (user?._id === u._id) return false;

                if (userChats) {
                    isChatCreated = userChats?.some((chat) => {
                        return chat.members[0] === u._id || chat.members[1] === u._id;
                    });
                }

                return !isChatCreated;

            });
            setPotentialChats(pChats);
        }
        getUsers();
    }, [userChats]);

    useEffect(() => {
        const getUserChats = async () => {
            if (user?._id) {
                setIsUserChatsLoading(true);
                setUserChatsError(null);
                const response = await getReq(`${baseURL}/chats/${user?._id}`);

                setIsUserChatsLoading(false);

                if (response.error) {
                    return setUserChatsError(response);
                }
                setUserChats(response);
            }
        }

        getUserChats();
    }, [user]);

    useEffect(() => {
        const getMessages = async () => {
            setLoadingMessages(true);
            setMessageError(null);
            const response = await getReq(`${baseURL}/messages/${currentChat?._id}`);
            setIsUserChatsLoading(false);
            if (response.error) {
                return setMessageError(response);
            }
            setMessages(response);
        };
        getMessages();
    }, [currentChat]);

    const updateCurrentChat = useCallback((chat) => {
        setCurrentChat(chat);
    }, []);

    const createChat = useCallback(async (firstId, secondId) => {

        const response = await postReq(`${baseURL}/chats`, JSON.stringify({
            firstId,
            secondId
        })
        );
        if (response.error) {
            return console.log("Error loading chat!");
        }
        setUserChats((prev) => [...prev, response]);
    }, []);

    return (
        <ChatContext.Provider value={{
            userChats,
            isUserChatsLoading,
            userChatsError,
            potentialChats,
            createChat,
            updateCurrentChat,
            messageError,
            messages,
            loadingMessages,
            currentChat,
            

        }}>
            {children}
        </ChatContext.Provider>
    )
}