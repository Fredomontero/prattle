import { put, call, take, fork } from "redux-saga/effects";
import { updateMessagesRequest, sendMessage } from "../redux/actions/message.actions";
import { updateNotificationsRequest, updateProfile } from "../redux/actions/user.actions";
import { eventChannel } from 'redux-saga';
import io from 'socket.io-client';

// const url = 'http://localhost:4001'; //Development
// const url = '/socket.io/';  //Production

//This functions loads and returns the socket
const connect = () => {
    const socket = io('/', {transports: ['websocket']});
    return new Promise( resolve => {
        socket.on('connect', () => {
            resolve(socket);
        });
    });
}

const subscribe = (socket) => {
    return eventChannel( emit => {
        socket.on("MESSAGE_FROM_SERVER", (message) => {
            let notification = {
                type: "NEW_MESSAGE",
                author: message.author,
                text: `New message from ${message.author}`
            };
            emit(updateMessagesRequest(message));
            emit(updateNotificationsRequest(notification));
            // emit(messageRecieved(message));
        });
        socket.on("LOGGED_IN", (notification) => {
            emit(updateNotificationsRequest(notification));
        });
        socket.on("UPDATE_REQUESTS", (user) => {
            emit(updateProfile(user._id));
        });
        socket.on("FRIENDSHIP_REQUEST_NOTIFICATION", (notification) => {
            emit(updateNotificationsRequest({type: notification.type, author: notification.author, text: notification.text}));
            emit(updateProfile(notification._id));
        });
        socket.on("FRIENDSHIP_REQUEST_ACCEPTED", (notification) => {
            emit(updateNotificationsRequest({type: notification.type, author: notification.author, text: notification.text}));
            emit(updateProfile(notification._id));
        });
        socket.on("UPDATE_REQUESTS_AND_JOIN_ROOM", (user) => {
            //update profile data
            emit(updateProfile(user._id));
        });
        socket.on("JOIN_ROOM_REQUEST", (conversation) => {
            let msg = {
                type: "JOIN_ROOM",
                id: conversation.id
            }
            emit(sendMessage(msg));
        });
        socket.on("ROOM_JOINED", () => {
            let notification = {
                type: "ROOM_JOINED",
                author: "Admin",
                text: `Now you can chat with your new friend`
            };
            emit(updateNotificationsRequest(notification));
        })
        return() => {};
    });
}

function* read(socket){
    const channel = yield call(subscribe, socket);
    while(true){
        let action = yield take(channel);
        yield put(action);
    }
}

function* write(socket){
    while(true){
        const { payload } = yield take("SEND_MESSAGE");
        socket.emit("NEW_MESSAGE", payload);
    }
}


function* handleIO(socket){
    yield fork(read, socket);
    yield fork(write, socket);
}

function* flow(){
    while(true){
        var { payload } = yield take("LOAD_SOCKET");
        const socket = yield call(connect);
        socket.emit("LOGGED_IN", {user: payload});
        yield fork(handleIO, socket);
    }
}

export function* chatSagas(){
    yield fork(flow);
}
