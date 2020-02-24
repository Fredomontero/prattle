import { all, call } from "redux-saga/effects";
import { userSagas } from "./user.sagas";
import { chatSagas } from "./chat.sagas";

export default function* rootSaga(){
    yield all([call(userSagas), call(chatSagas)])
}