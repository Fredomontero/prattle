const initialState = {
    loggedIn: null,
    error: null,
    tempData: null
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
        case "FETCH_USER_SUCCESS":
            return{
                ...state,
                loggedIn: action.payload
            }
        case "FETCH_USER_FAILURE":
            return{
                ...state,
                loggedIn: null,
                error: action.payload
            }
        case "LOGOUT_SUCCESS":
            return{
                ...state,
                loggedIn: action.payload
            }
        case "LOGOUT_FAILURE":
            return{
                ...state,
                loggedIn: null,
                error: action.payload
            }
        case "LOAD_PROFILE_SUCCESS":
            return{
                ...state,
                loggedIn: action.payload
            }
        case "LOAD_PROFILE_FAILURE":
            return{
                ...state,
                loggedIn: null,
                error: action.payload
            }
        case "RETRIEVE_USERS_SUCCESS":
            return{
                ...state,
                tempData: action.payload,
                error: null
            }
        case "RETRIEVE_USERS_FAILURE":
            return{
                ...state,
                tempData: null,
                error: action.payload
            }
        default:
            return state;
    }
};

export default rootReducer;