export const signIn = emailAndPassword => ({
    type: "LOGIN_REQUEST",
    payload: emailAndPassword
});

export const loginSuccess = user => ({
    type: "LOGIN_SUCCESS",
    payload: user
});

export const loginFailure = error => ({
    type: "LOGIN_FAILURE",
    payload: error
});