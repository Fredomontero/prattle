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

export const logout = value => ({
    type: "LOGOUT",
    payload: value
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

