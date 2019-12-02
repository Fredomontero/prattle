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

export const createUser = user => ({
    type: "CREATE_USER",
    payload: user
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

