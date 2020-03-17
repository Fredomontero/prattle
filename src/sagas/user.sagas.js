import { takeEvery, put, all, call, select} from "redux-saga/effects";
import { 
    logIn,
    loginSuccess, 
    loginFailure, 
    failToCreateUser, 
    fetchUserFailure, 
    fetchUserSuccess,
    logoutFailure,
    logoutSuccess,
    loadProfileFailure,
    loadProfileSuccess,
    retrieveUsersSuccess,
    retrieveUsersFailure,
    addContactSuccess,
    addContactFailure,
    handleRequestSuccess,
    handleRequestFailure,
    loadSocket,
    getConversationsSuccess,
    getConversationsFailure,
    updateNotifications
} from "../redux/actions/user.actions";

import {
    loadMessagesSuccess,
    loadMessagesFailure,
    updateMessages,
    saveMessageSuccess,
    saveMessageFailure,
    dontUpdateMessages,
    createGroupSuccess,
    createGroupFailure,
    sendMessage
} from "../redux/actions/message.actions";

import { getChatId, getLoggedIn, getNotifications } from '../selectors/selectors';

// const auth_url = 'http://localhost:4000/graphql';  //Development
const auth_url = '/auth_url/';  //Production
// const chat_url = 'http://localhost:4001/graphql'; //Development
const chat_url = '/chat_url/'; //Production
// const messages_url = 'http://localhost:4002/graphql'; //Development
const messages_url = '/messages_url/'; //Production

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
        let res = yield call(fetch, auth_url, loginRequestOptions);
        let resData = yield res.json();
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

    //Sending data to the Auth server
    let {email, password} = action.payload;
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
        let res = yield fetch(auth_url, {
            method: 'POST',
            body: JSON.stringify(requestBodyAuth),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        let resData = yield res.json();
        if(resData.errors){
            yield put(failToCreateUser(resData.errors[0].message));
        }else{
            const tempId = resData.data.createUser._id;
            const requestBody = {
                query: `
                    mutation{
                        createUser(userInput: {
                            _id: "${tempId}"
                            fullname: "${action.payload.fullname}",
                            email: "${action.payload.email}"
                        }){
                            _id
                            fullname
                            email
                        }
                    }
                `
            }
            let resBackend = yield fetch(chat_url, {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            yield resBackend.json();
            if(resBackend.errors){
                yield put(failToCreateUser(resBackend.errors[0].message));
            }else{
                yield put(logIn({email, password}));
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
        let res = yield call(fetch, auth_url, fetchUserRequestOptions);
        let resData = yield res.json();
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
        let res = yield call(fetch, auth_url, logoutOptions);
        let resData = yield res.json();
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
                    fullname
                    email
                    contacts{
                        _id
                        fullname
                        email
                    }
                    requests{
                        requestId
                        sourceId
                        sourceName
                        targetId
                        targetName
                    }
                    pendingRequests{
                        requestId
                        sourceId
                        sourceName
                        targetId
                        targetName
                    }
                    conversations{
                        _id
                        name
                        participants{
                            _id
                            name
                            addedAt
                        }
                        createdAt
                        lastMessageAt
                    }
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
        let res = yield call(fetch, chat_url, loadProfileOptions);
        let userData = yield res.json();
        if(userData.errors){
            yield put(loadProfileFailure(userData.errors[0].message));
        }else{
            yield put(
                loadSocket(userData.data.loadProfile)
            )
            yield put(
                loadProfileSuccess(userData.data.loadProfile)
            )
        }
    }catch(error){
        yield put(loadProfileFailure(error));
    }
}

export function* onLoadProfile(){""
    yield takeEvery("LOAD_PROFILE", loadProfile)
}

export function* retrieveUsers(action){
    let pattern = (action) ? action.payload.pattern : "";
    
    let retrieveUsersBody = {
        query: `
            query {
                retrieveUsers(pattern: "${pattern}"){
                    _id
                    fullname
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
        let res = yield call(fetch, chat_url, retrieveUsersOptions);
        let usersData = yield res.json();
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

export function* addContactRequest(action){
    let addContactBody = {
        query: `
            mutation{
                addContact(RequestInput: {
                    sourceId: "${action.payload.sourceId}",
                    sourceName: "${action.payload.sourceName}",
                    targetId: "${action.payload.targetId}",
                    targetName: "${action.payload.targetName}"
                }){
                    _id
                    fullname
                    email
                    contacts
                    requests{
                        requestId
                        sourceId
                        sourceName
                        targetId
                        targetName
                    }
                    pendingRequests{
                        requestId
                        sourceId
                        sourceName
                        targetId
                        targetName
                    }
                    conversations
                }
            }
        `
    }

    let addContactOptions = {
        method: 'POST',
        body: JSON.stringify(addContactBody),
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try{
        let res = yield call(fetch, chat_url, addContactOptions);
        let resData = yield res.json();
        if(resData.errors){
            yield put(addContactFailure(resData.errors[0].message));
        }else{
            yield put(
                addContactSuccess(resData.data.addContact)
            )
        }
    }catch(error){
        yield put(addContactFailure(error));   
    }
}

export function* onAddContactRequest(){
    yield takeEvery("SEND_CONTACT_REQUEST", addContactRequest)
}

export function* resolveFriendshipRequest(action){
    let handleFriendshipRequestBody = {
        query: `
            mutation{
                handleFriendshipRequest(HandleRequest: {
                    value: ${action.payload.value},
                    requestId: "${action.payload.requestId}",
                    sourceId: "${action.payload.sourceId}",
                    sourceName: "${action.payload.sourceName}",
                    targetId: "${action.payload.targetId}"
                    targetName: "${action.payload.targetName}"
                }){
                    _id
                    fullname
                    email
                    contacts{
                        _id
                        fullname
                        email
                    }
                    requests{
                        requestId
                        sourceId
                        sourceName
                        targetId
                        targetName
                    }
                    pendingRequests{
                        requestId
                        sourceId
                        sourceName
                        targetId
                        targetName
                    }
                    conversations{
                        _id
                        name
                        participants{
                            _id
                            name
                            addedAt
                        }
                        createdAt
                        lastMessageAt
                    }
                }
            }
        `
    }

    let handleFriendshipRequestOptions = {
        method: 'POST',
        body: JSON.stringify(handleFriendshipRequestBody),
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try{
        let res = yield call(fetch, chat_url, handleFriendshipRequestOptions);
        let resData = yield res.json();
        let lastConversation = resData.data.handleFriendshipRequest.conversations[resData.data.handleFriendshipRequest.conversations.length - 1];
        if(resData.errors){
            yield put(handleRequestFailure(resData.errors[0].message));
        }else{
            yield put(
                handleRequestSuccess(resData.data.handleFriendshipRequest)
            )
            if(action.payload.value === true){
                yield put(
                    sendMessage({
                        type: "JOIN_ROOM_REQUEST",
                        conversation: lastConversation
                    })
                )
            }
        }
    }catch(error){
        yield put(handleRequestFailure(error));   
    }
}

export function* onHandleRequest(){
    yield takeEvery("HANDLE_FRIENDSHIP_REQUEST", resolveFriendshipRequest)
}

export function* loadMessagesRequest(action){
    let loadMessagesBody = {
        query: `
            query {
                loadMessages(conversationId: "${action.payload.conversationId}"){
                    _id
                    conversationId
                    author
                    createdAt
                    text
                }
            }
        `
    };

    let loadMessagesOptions = {
        method: 'POST',
        body: JSON.stringify(loadMessagesBody),
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try{
        let res = yield call(fetch, messages_url, loadMessagesOptions);
        let messages = yield res.json();
        if(messages.errors){
            yield put(loadMessagesFailure(messages.errors[0].message));
        }else{
            yield put(
                loadMessagesSuccess(messages.data.loadMessages)
            )
        }
    }catch(error){
        yield put(loadMessagesFailure(error));
    }
}

export function* onLoadMessages(){
    yield takeEvery("LOAD_MESSAGES", loadMessagesRequest)
}

export function* saveMessage(action){
    //Sending data to the Auth server
    let saveMessageBody = {
        query: `
            mutation {
                saveMessage(
                    _id: "${action.payload._id}",
                    conversationId: "${action.payload.conversationId}",
                    author: "${action.payload.author}",
                    createdAt: "${action.payload.date}",
                    text: "${action.payload.text}",
                ){
                    _id
                    conversationId
                    author
                    createdAt
                    text
                }
            }
        `
    }

    let saveMessageOptions = {
        method: 'POST',
        body: JSON.stringify(saveMessageBody),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try{
        let res = yield call(fetch, messages_url, saveMessageOptions);
        let message = yield res.json();
        if(message.errors){
            yield put(saveMessageFailure(message.errors[0].message));
        }else{
            yield put(saveMessageSuccess(message.data.saveMessage))
        }
    }catch(error){
        yield put(failToCreateUser(error));   
    }
    

}

export function* onSaveMessage(){
    yield takeEvery("SAVE_MESSAGE", saveMessage)
}

export function* updateMessagesListener(action){
    let chatId = yield select(getChatId);
    if( chatId && chatId.conversationId === action.payload.conversationId ){
        yield put(
            updateMessages(action.payload)
        )
    }else{
        yield put(
            dontUpdateMessages()
        )
    }
}

export function* onUpdateMessagesRequest(){
    yield takeEvery("UPDATE_MESSAGES_REQUEST", updateMessagesListener)
}

export function* createGroupListener(action){
    //Regex for removing quotes around properties
    //participants = participants.replace(/\"([^(\")"]+)\":/g,"$1:");

    let createGroupRequestBody = {
        query: `
            mutation{
                createGroup(UsernameInput: ${JSON.stringify(action.payload.participants).replace(/"([^(")"]+)":/g,"$1:")}, GroupName: "${action.payload.groupName}"
                ){
                    _id
                    name
                    participants{
                        _id
                        name
                        addedAt
                    }
                    createdAt
                    lastMessageAt
                }
            }
        `
    }
    
    let createGroupRequestOptions = {
        method: 'POST',
        body: JSON.stringify(createGroupRequestBody),
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try{
        let res = yield call(fetch, chat_url, createGroupRequestOptions);
        let resData = yield res.json();
        if(resData.errors){
            yield put(createGroupFailure(resData.errors[0].message));
        }else{
            yield put(
                createGroupSuccess(resData.data.createGroup )
            )
            yield put(
                yield put(
                    sendMessage({
                        type: "JOIN_ROOM_REQUEST",
                        conversation: resData.data.createGroup
                    })
                )
            )
        }
    }catch(error){
        yield put(createGroupFailure(error));
    }

}

export function* onCreateGroupRequest(){
    yield takeEvery("CREATE_GROUP_REQUEST", createGroupListener)
}

export function* getConversations(action){

    let getConversationsRequestBody = {
        query: `
            query {
                getConversations(userId: "${action.payload._id}"){
                    _id
                    name
                    participants{
                        _id
                        name
                        addedAt
                    }
                    createdAt
                    lastMessageAt
                }
            }
        `
    };

    
    let getConversationsRequestOptions = {
        method: 'POST',
        body: JSON.stringify(getConversationsRequestBody),
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try{
        let res = yield call(fetch, chat_url, getConversationsRequestOptions);
        let resData = yield res.json();
        if(resData.errors){
            yield put(getConversationsFailure(resData.errors[0].message));
        }else{
            yield put(
                getConversationsSuccess(resData.data.getConversations )
            )
        }
    }catch(error){
        yield put(getConversationsFailure(error));
    }

}

export function* onGetConversationsRequest(){
    yield takeEvery("GET_CONVERSATIONS_REQUEST", getConversations)
}

export function* updateNotificationsWorker(action){
    let loggedIn = yield select(getLoggedIn);
    let notifications = yield select(getNotifications);
    var notificationTexts = notifications.map(notification => notification.text);
    if( (loggedIn && loggedIn.fullname !== action.payload.author) && (!notificationTexts.includes(action.payload.text)) ){
        yield put(
            updateNotifications(action.payload)
        )
    }
}

export function* onUpdateNotificationsRequest(){
    yield takeEvery("UPDATE_NOTIFICATIONS_REQUEST", updateNotificationsWorker)
}

export function* updateProfile(action){
    var userId = (action) ? action.payload : "";
    
    let loadProfileBody = {
        query: `
            query {
                loadProfile(userId: "${userId}"){
                    _id
                    fullname
                    email
                    contacts{
                        _id
                        fullname
                        email
                    }
                    requests{
                        requestId
                        sourceId
                        sourceName
                        targetId
                        targetName
                    }
                    pendingRequests{
                        requestId
                        sourceId
                        sourceName
                        targetId
                        targetName
                    }
                    conversations{
                        _id
                        name
                        participants{
                            _id
                            name
                            addedAt
                        }
                        createdAt
                        lastMessageAt
                    }
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
        let res = yield call(fetch, chat_url, loadProfileOptions);
        let userData = yield res.json();
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

export function* onUpdateProfileRequest(){
    yield takeEvery("UPDATE_PROFILE", updateProfile)
 }

export function* joinRoom(){
    let loggedIn = yield select(getLoggedIn);
    let { conversations } = loggedIn;
    let conversationId = conversations[conversations.length-1]._id;
    yield put(
        sendMessage({
            type: "JOIN_ROOM",
            id: conversationId
        })
    )

}
 export function* onJoinRoomRequest(){
    yield takeEvery("JOIN_ROOM_TRIGGER", joinRoom)
 }

//---------------------------------------------------------------

export function* userSagas(){
    yield all([call(onSignIn), 
               call(onCreateUser), 
               call(getUser), 
               call(onLogout), 
               call(onLoadProfile), 
               call(onRetrieveUsers), 
               call(onAddContactRequest),
               call(onHandleRequest),
               call(onLoadMessages),
               call(onSaveMessage),
               call(onUpdateMessagesRequest),
               call(onCreateGroupRequest),
               call(onGetConversationsRequest),
               call(onUpdateNotificationsRequest),
               call(onUpdateProfileRequest),
               call(onJoinRoomRequest)
            ]);
}
