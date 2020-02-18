const initialState = {
    loggedIn: null,
    error: null,
    tempData: null,
    messages: null,
    chatId: null
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
        case "ADD_CONTACT_SUCCESS":
            return{
                ...state,
                loggedIn: action.payload
            }
        case "ADD_CONTACT_FAILURE":
            return{
                ...state,
                error: action.payload
            }
        case "HANDLE_FRIENDSHIP_REQUEST_SUCCESS":
            return{
                ...state,
                loggedIn: action.payload
            }
        case "HANDLE_FRIENDSHIP_REQUEST_FAILURE":
            return{
                ...state,
                error: action.payload
            }
        case "LOAD_MESSAGES_SUCCESS":
            return{
                ...state,
                messages: action.payload
            }
        case "LOAD_MESSAGES_FAILURE":
            return{
                ...state,
                error: action.payload
            }
        case "SAVE_MESSAGES_SUCCESS":
            return{
                ...state,
                error: null
            }
        case "UPDATE_MESSAGES":
            return{
                ...state,
                messages: [...state.messages, action.payload]
            }
        case "SAVE_MESSAGES_FAILURE":
            return{
                ...state,
                error: action.payload
            }
        case "SELECT_CONVERSATION":
            return{
                ...state,
                chatId: action.payload
            }
        case "DONT_UPDATE_MESSAGES":
            return{
                ...state,
                error: null
            }
        default:
            return state;
    }
};

export default rootReducer;