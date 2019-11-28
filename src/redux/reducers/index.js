const initialState = {
    user: {},
    error: {}
};

function rootReducer(state = initialState, action){
    switch(action.type){
        case "LOGIN_SUCCESS":
            return{
                ...state,
                user: action.payload,
                error: null 
            };
        case "LOGIN_FAILURE":
            return{
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};

export default rootReducer;