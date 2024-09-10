import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { Stack } from "react-bootstrap";
import moment from "moment";

const ChatBox = () => {

    const { user } = useContext(AuthContext);
    const { currentChat, messages, isMessagesLoading } = useContext(ChatContext);
    const { recipientUser } = useFetchRecipientUser(currentChat, user);
    console.log("recipient user:", recipientUser);

    if (!recipientUser) {
        return (
            <p style={{ textAlign: "center", width: "100%" }}>
                No conversations yet
            </p>
        )
    }
    if (isMessagesLoading) {
        return (
            <p style={{ textAlign: "center", width: "100%" }}>
                Messages Loading...
            </p>
        )
    }
    return (
        <Stack gap={4} className="chat-box">
            <div className="chat-header">
                <strong>{recipientUser?.name}</strong>
            </div>
            <Stack gap={3} className="messages">
                {messages && messages.map((message, index) => {
                    <Stack key={index}>
                        <span>{message.text}</span>
                        <span>{moment(message.createdAt).calendar()}</span>
                    </Stack>
                })}
            </Stack>
        </Stack>
    );
}

export default ChatBox;