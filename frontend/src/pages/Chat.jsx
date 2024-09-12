import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { Container, Stack } from "react-bootstrap"
import UserChat from "../components/chats/UserChat";
import { AuthContext } from "../context/AuthContext";
import PotentialChats from "../components/chats/PotentialChats";
import ChatBox from "../components/chats/chatBox";

const Chat = () => {
    const { userChats, isUserChatsLoading, updateCurrentChat } = useContext(ChatContext);
    const { user } = useContext(AuthContext);

    return (
        <>
            <Container>
                <PotentialChats />
                {
                    userChats?.length < 1 ? null : (
                        <Stack direction="horizontal" gap={4} className="align-items-start">
                            <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
                                {isUserChatsLoading && <p>Loading...</p>}
                                {userChats?.map((chat, index) => {
                                    return (
                                        <div key={index} onClick={() => updateCurrentChat(chat)}>
                                            <UserChat chat={chat} user={user} />
                                        </div>
                                    );
                                })}
                            </Stack>
                            <ChatBox />
                        </Stack>
                    )
                }
            </Container>
        </>
    );
}

export default Chat;