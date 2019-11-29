import { takeEvery, put, all, call} from "redux-saga/effects";
import { loginSuccess, loginFailure } from "../redux/actions/user.actions";


export function* loginWithEmail(action){
    var email = (action) ? action.payload.email : "";
    var password = (action) ? action.payload.password : "";
    
    let loginRequestBody = {
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

    let loginRequestOptions = {
        method: 'POST',
        body: JSON.stringify(loginRequestBody),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try{
        let res = yield call(fetch, 'http://localhost:4000/graphql', loginRequestOptions);
        let resData = yield res.json();
        console.log("ResData: ", resData);
        if(resData.errors){
            yield put(loginFailure(resData.errors[0].message));
        }else{
            yield put(
                loginSuccess(resData.data.login)
            )
        }
    }catch(error){
        yield put(loginFailure(error));
    }
}

export function* onSignIn(){
    yield takeEvery("LOGIN_REQUEST", loginWithEmail)
}

export function* userSagas(){
    yield all([call(onSignIn)]);
}