export const sendMessage = message => ({
    type: "SEND_MESSAGE",
    payload: message
});

export const messageRecieved = message => ({
    type: "MESSAGE_RECIEVED",
    payload: message
});

export const loadMessages = conversationId => ({
    type: "LOAD_MESSAGES",
    payload: conversationId
});

export const loadMessagesSuccess = messages => ({
    type: "LOAD_MESSAGES_SUCCESS",
    payload: messages
});

export const loadMessagesFailure = error => ({
    type: "LOAD_MESSAGES_FAILURE",
    payload: error
});