import { takeLatest, put, all, call} from "redux-saga/effects";
import { loginSuccess, loginFailure } from "../redux/actions/user.actions";

export function* loginWithEmail(action){
    var email = (action) ? action.payload.email : "";
    var password = (action) ? action.payload.password : "";
    yield console.log("Email: " + email +" Password: " + password);
    // var email = "alfredo@test.com";
    // var password = "holamundo";
    let requestBody = {
        query: `
            query {
                login(email: "${email}", password: "${password}"){
                    userId
                    token
                    tokenExpiration
                }
            }
        `
    };
    try{
        const res = yield fetch('http://localhost:4000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(res.status !== 200 && res.status !== 201){
            throw new Error("Failed logging in");
        }
        const resData = yield res.json();
        console.log(resData);
        yield put(
            loginSuccess(resData)
        )
    }catch(error){
        yield put(loginFailure(error));
    }
}

export function* onSignIn(){
    yield takeLatest("LOGIN_REQUEST", loginWithEmail)
}

export function* userSagas(){
    yield all([call(loginWithEmail)]);
}