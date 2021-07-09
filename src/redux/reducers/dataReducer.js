import {SET_TWEETS, SET_TWEET, LIKE_TWEET, UNLIKE_TWEET, LOADING_DATA, DELETE_TWEET, POST_TWEET, SUBMIT_COMMENT} from '../types';

const initialState = {
    tweets: [],
    tweet: {},
    loading: false
};

let index;
export default function(state=initialState, action){
    switch(action.type){
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        case SET_TWEETS:
            return {
                ...state,
                tweets: action.payload,
                loading: false
            }
        case SET_TWEET:
            return {
                ...state,
                tweet: action.payload
            }
        case LIKE_TWEET: 
        case UNLIKE_TWEET:
            index = state.tweets.findIndex((tweet) => tweet.tweetId === action.payload.tweetId);
            state.tweets[index] = action.payload;
            if(state.tweet.tweetId === action.payload.tweetId){
                state.tweet = action.payload;
            }
            return {
                ...state
            }
        case DELETE_TWEET:
            index = state.tweets.findIndex(tweet => tweet.tweetId === action.payload)
            state.tweets.splice(index, 1);
            return {
                ...state
            }
        case POST_TWEET:
            return {
                ...state,
                tweets: [
                    action.payload, 
                    ...state.tweets
                ]
                
            }
        case SUBMIT_COMMENT: 
            return {
                ...state,
                tweet: {
                    ...state.tweet,
                    commentCount: state.tweet.commentCount + 1,
                    comments: [action.payload, ...state.tweet.comments]
                }
            }
        default:
            return state
    }
}
