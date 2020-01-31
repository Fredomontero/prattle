import { takeEvery, put, all, call} from "redux-saga/effects";
import io from 'socket.io-client';
const url = 'http://localhost:4001';

var socket =  null;

export function* loadSocket(){
    socket = yield io(url);
    if(socket){
        socket.on('connection', function(){
            console.log("Connected to the server");
        })
    }else{
        console.log("Unable to connect to the server");
    }
    
}

export function* onLoadSocket(){
    yield takeEvery("LOAD_SOCKET", loadSocket)
}

export function* sendMessage(message){
    console.log("*************************");
    console.log("The message is: ", message.payload);
    console.log("*************************");
    socket.emit('newMessage', message.payload);
    
}

export function* onSendMessage(){
    yield takeEvery("SEND_MESSAGE", sendMessage)
}



/*-------------------------------------------------------*/

export function* messageSagas(){
    yield all([
        call(onLoadSocket),
        call(onSendMessage)
    ]);
};