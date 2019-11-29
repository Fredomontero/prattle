const initialState = {
    loggedIn: {},
    error: {}
};

function rootReducer(state = initialState, action){
    switch(action.type){
        case "LOGIN_SUCCESS":
            return{
                ...state,
                loggedIn: action.payload,
                error: null 
            };
        case "LOGIN_FAILURE":
            return{
                ...state,
                loggedIn: null,
                error: action.payload
            };
        default:
            return state;
    }
};

export default rootReducer;