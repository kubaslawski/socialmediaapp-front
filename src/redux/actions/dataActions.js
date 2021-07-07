import {SET_TWEETS, LOADING_DATA, LIKE_TWEET, UNLIKE_TWEET} from '../types';
import axios from 'axios';

export const getTweets = () => dispatch => {
    dispatch({type: LOADING_DATA});
    axios.get(`/tweets`)
        .then((res) => {
            dispatch({
                type: SET_TWEETS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: SET_TWEETS,
                payload: []
            });
        });
};

export const likeTweet = tweetId => dispatch => {
    axios.get(`/tweet/${tweetId}/like`)
        .then(res => {
            dispatch({
                type: LIKE_TWEET,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}

export const unlikeTweet = tweetId => dispatch => {
    axios.get(`/tweet/${tweetId}/unlike`)
        .then(res => {
            dispatch({
                type: UNLIKE_TWEET,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}