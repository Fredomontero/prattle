export const sendMessage = message => ({
    type: "SEND_MESSAGE",
    payload: message
});

export const saveMessage = message => ({
    type: "SAVE_MESSAGE",
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

export const updateMessages = message => ({
    type: "UPDATE_MESSAGES",
    payload: message
});

export const saveMessageSuccess = messages => ({
    type: "SAVE_MESSAGES_SUCCESS",
    payload: messages
});

export const saveMessageFailure = error => ({
    type: "SAVE_MESSAGES_FAILURE",
    payload: error
});