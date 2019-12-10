import { takeEvery, put, all, call} from "redux-saga/effects";
import { 
    loginSuccess, 
    loginFailure, 
    userCreated, 
    failToCreateUser, 
    fetchUserFailure, 
    fetchUserSuccess,
    logoutFailure,
    logoutSuccess,
    loadProfileFailure,
    loadProfileSuccess,
    retrieveUsersSuccess,
    retrieveUsersFailure,
    addContact

} from "../redux/actions/user.actions";


export function* loginWithEmail(action){
    var email = (action) ? action.payload.email : "";
    var password = (action) ? action.payload.password : "";
    
    let loginRequestBody = {
        query: `
            query {
                login(email: "${email}", password: "${password}"){
                    userId
                }
            }
        `
    };

    let loginRequestOptions = {
        method: 'POST',
        body: JSON.stringify(loginRequestBody),
        credentials: "include",
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

export function* createUser(action){

    let requestBodyAuth = {
        query: `
            mutation{
                createUser(userInput: {
                    email: "${action.payload.email}",
                    password: "${action.payload.password}"
                }){
                    _id
                    email
                }
            }
        `
    }

    try{
        let res = yield fetch('http://localhost:4000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBodyAuth),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        let resData = yield res.json();
        console.log(resData);
        if(resData.errors){
            yield put(failToCreateUser(resData.errors[0].message));
        }else{
            const tempId = resData.data.createUser._id;
            const requestBody = {
                query: `
                    mutation{
                        createUser(userInput: {
                            _id: "${tempId}"
                            firstname: "${action.payload.firstname}",
                            lastname: "${action.payload.lastname}",
                            email: "${action.payload.email}"
                        }){
                            _id
                            firstname
                            email
                        }
                    }
                `
            }
            let resBackend = yield fetch('http://localhost:4001/graphql', {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            let result = yield resBackend.json();
            if(resBackend.errors){
                yield put(failToCreateUser(resBackend.errors[0].message));
            }else{
                console.log(result);
                yield put(
                    userCreated(resBackend.data)
                )
            }
        }
    }catch(error){
        yield put(failToCreateUser(error));   
    }
    

}

export function* onCreateUser(){
    yield takeEvery("CREATE_USER_REQUEST", createUser)
}

export function* fetchUser(){
    let fetchUserRequestBody = {
        query: `
            query {
                fetchUser {
                    userId
                    email
                }
            }
        `
    };

    let fetchUserRequestOptions = {
        method: 'POST',
        body: JSON.stringify(fetchUserRequestBody),
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try{
        let res = yield call(fetch, 'http://localhost:4000/graphql', fetchUserRequestOptions);
        let resData = yield res.json();
        console.log("gotUser? : ", resData);
        if(resData.errors){
            yield put(fetchUserFailure(resData.errors[0].message));
        }else{
            yield put(
                fetchUserSuccess(resData.data.fetchUser)
            )
        }
    }catch(error){
        yield put(loginFailure(error));
    }

}

export function* getUser(){
    yield takeEvery("GET_USER", fetchUser)
}

export function* logout(){
    let logoutRequestBody = {
        query: `
            query {
                logout {
                    userId
                }
            }
        `
    };

    let logoutOptions = {
        method: 'POST',
        body: JSON.stringify(logoutRequestBody ),
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try{
        let res = yield call(fetch, 'http://localhost:4000/graphql', logoutOptions);
        let resData = yield res.json();
        console.log("resData on logout: ", resData);
        if(resData.errors){
            yield put(logoutFailure(resData.errors[0].message));
        }else{
            yield put(
                logoutSuccess(resData.data.logout)
            )
        }
    }catch(error){
        yield put(logoutFailure(error));
    }
}

export function* onLogout(){
    yield takeEvery("LOGOUT", logout)
}

export function* loadProfile(action){
    var userId = (action) ? action.payload : "";
    
    let loadProfileBody = {
        query: `
            query {
                loadProfile(userId: "${userId}"){
                    _id
                    firstname
                    lastname
                    email
                }
            }
        `
    };

    let loadProfileOptions = {
        method: 'POST',
        body: JSON.stringify(loadProfileBody),
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try{
        let res = yield call(fetch, 'http://localhost:4001/graphql', loadProfileOptions);
        let userData = yield res.json();
        console.log("userData: ", userData);
        if(userData.errors){
            yield put(loadProfileFailure(userData.errors[0].message));
        }else{
            yield put(
                loadProfileSuccess(userData.data.loadProfile)
            )
        }
    }catch(error){
        yield put(loadProfileFailure(error));
    }
}

export function* onLoadProfile(){
    yield takeEvery("LOAD_PROFILE", loadProfile)
}

export function* retrieveUsers(action){
    let pattern = (action) ? action.payload.pattern : "";
    
    let retrieveUsersBody = {
        query: `
            query {
                retrieveUsers(pattern: "${pattern}"){
                    _id
                    firstname
                    lastname
                    email
                }
            }
        `
    };

    let retrieveUsersOptions = {
        method: 'POST',
        body: JSON.stringify(retrieveUsersBody),
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try{
        let res = yield call(fetch, 'http://localhost:4001/graphql', retrieveUsersOptions);
        let usersData = yield res.json();
        console.log("usersData: ", usersData);
        if(usersData.errors){
            yield put(retrieveUsersFailure(usersData.errors[0].message));
        }else{
            yield put(
                retrieveUsersSuccess(usersData.data.retrieveUsers)
            )
        }
    }catch(error){
        yield put(retrieveUsersFailure(error));
    }
}

export function* onRetrieveUsers(){
    yield takeEvery("RETRIEVE_USERS", retrieveUsers)
}

export function* addContactRquest(action){
    return null
}

export function* onAddContactRequest(){
    yield takeEvery("SEND_CONTACT_REQUEST", addContactRquest)
}

//----------------------------------------------------------------

export function* userSagas(){
    yield all([call(onSignIn), call(onCreateUser), call(getUser), call(onLogout), call(onLoadProfile), call(onRetrieveUsers)]);
}
