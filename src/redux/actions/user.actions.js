export const logIn = data => ({
    type: "LOGIN_REQUEST",
    payload: data
});

export const loginSuccess = user => ({
    type: "LOGIN_SUCCESS",
    payload: user
});

export const loginFailure = error => ({
    type: "LOGIN_FAILURE",
    payload: error
});

export const createUserRequest = user => ({
    type: "CREATE_USER_REQUEST",
    payload: user
});

export const userCreated = user => ({
    type: "USER_CREATED",
    payload: user
});

export const failToCreateUser = error => ({
    type: "FAIL_TO_CREATE_USER",
    payload: error
});

export const logout = () => ({
    type: "LOGOUT"
});

export const logoutFailure = error => ({
    type: "LOGOUT_FAILURE",
    payload: error
});

export const logoutSuccess = userId => ({
    type: "LOGOUT_SUCCESS",
    payload: userId
});

export const getUser = () => ({
    type: "GET_USER"
});

export const fetchUserSuccess = user => ({
    type: "FETCH_USER_SUCCESS",
    payload: user
});

export const fetchUserFailure = error => ({
    type: "FETCH_USER_FAILURE",
    payload: error
});

export const loadProfile = userId => ({
    type: "LOAD_PROFILE",
    payload: userId
});

export const loadProfileSuccess = user => ({
    type: "LOAD_PROFILE_SUCCESS",
    payload: user
});

export const loadProfileFailure = error => ({
    type: "LOAD_PROFILE_FAILURE",
    payload: error
});

export const retrieveUsers = pattern => ({
    type: "RETRIEVE_USERS",
    payload: pattern
});

export const retrieveUsersSuccess = user => ({
    type: "RETRIEVE_USERS_SUCCESS",
    payload: user
});

export const retrieveUsersFailure = error => ({
    type: "RETRIEVE_USERS_FAILURE",
    payload: error
});

export const addContact = data => ({
    type: "SEND_CONTACT_REQUEST",
    payload: data
});

export const addContactSuccess = user => ({
    type: "ADD_CONTACT_SUCCESS",
    payload: user
});

export const addContactFailure = error => ({
    type: "ADD_CONTACT_FAILURE",
    payload: error
});

export const handleRequest = data => ({
    type: "HANDLE_FRIENDSHIP_REQUEST",
    payload: data
});

export const handleRequestSuccess = user => ({
    type: "HANDLE_FRIENDSHIP_REQUEST_SUCCESS",
    payload: user
});

export const handleRequestFailure = error => ({
    type: "HANDLE_FRIENDSHIP_REQUEST_FAILURE",
    payload: error
});

export const loadSocket = fullname => ({
    type: "LOAD_SOCKET",
    payload: fullname
});

export const createGroupRequest = data => ({
    type: "CREATE_GROUP_REQUEST",
    payload: data
});

export const changeRoute = data => ({
    type: "CHANGE_ROUTE_REQUEST",
    payload: data
});

export const getConversationsRequest = data => ({
    type: "GET_CONVERSATIONS_REQUEST",
    payload: data
});

export const getConversationsSuccess = conversations => ({
    type: "GET_CONVERSATIONS_SUCCESS",
    payload: conversations
});

export const getConversationsFailure = error => ({
    type: "GET_CONVERSATIONS_FAILURE",
    payload: error
});

export const changeSection = section => ({
    type: "CHANGE_DASHBOARD_SECTION",
    payload: section
});
