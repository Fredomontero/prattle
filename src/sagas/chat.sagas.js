import { put, call, take, fork } from "redux-saga/effects";
import { updateMessagesRequest } from "../redux/actions/message.actions";
import { eventChannel } from 'redux-saga';
import io from 'socket.io-client';

// const url = 'http://localhost:4001'; //Development
// const url = '/socket/';  //Production

//This functions loads and returns the socket
const connect = () => {
    const socket = io('/');
    return new Promise( resolve => {
        socket.on('connect', () => {
            resolve(socket);
        });
    });
}

const subscribe = (socket) => {
    return eventChannel( emit => {
        socket.on("MESSAGE_FROM_SERVER", (message) => {
            console.log("Message recieved from server: ");
            console.log(message);
            emit(updateMessagesRequest(message));
            // emit(messageRecieved(message));
        });
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
