import { Message } from "./Message";

export type Conversation = {
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
