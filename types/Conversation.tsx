import { Message } from "./Message";

export type Conversation2 = {
    _id: string,
    users: string[],
    userDetails: [
        {
            _id: string,
            name: string,
            avatar: string
        }
    ],
    lastMessage: Message,
    isWrittenByUser: boolean
}
