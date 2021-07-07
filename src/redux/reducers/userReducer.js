import {
    SET_USER,
    SET_ERRORS,
    CLEAR_ERRORS, 
    LOADING_UI,
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    LOADING_USER,
    LIKE_TWEET,
    UNLIKE_TWEET
} from '../types';

const initialState = {
    authenticated: false,
    credentials: {},
    likes: [],
    notifications: []
};

export default function(state=initialState, action){
    switch(action.type){
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };
        case SET_UNAUTHENTICATED:
            return initialState;
        case SET_USER:
            return {
                authenticated: true,
                loading: false,
                //spread res.credentials to credentials, likes to likes, etc.
                ...action.payload
            };
        case LOADING_USER:
            return {
                ...state,
                loading: true
            }
        case LIKE_TWEET:
            return {
                ...state,
                likes: [
                    ...state.likes,
                    {
                        userHandle: state.credentials.handle,
                        tweetId: action.payload.tweetId
                    }
                ]
            }
        case UNLIKE_TWEET:
            return {
                ...state,
                likes: state.likes.filter((like) => like.tweetId === action.payload.tweetId)
            }
        default: 
        return state;
    }
}