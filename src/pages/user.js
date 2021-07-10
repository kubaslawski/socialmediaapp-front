import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
//COMPONENTS
import StaticProfile from '../components/profile/StaticProfile'
import Tweet from '../components/tweet/Tweet';
import TweetSkeleton from '../util/TweetSkeleton';
//MUI
import Grid from '@material-ui/core/Grid';
//REDUX
import {connect} from 'react-redux';
import {getUserData} from '../redux/actions/dataActions';

export class User extends Component {
    state = {
        profile: null,
        tweetIdParam: null
    }
    componentDidMount(){
        const handle = this.props.match.params.handle;
        const tweetId = this.props.match.params.tweetId;

        if(tweetId){
            this.setState({tweetIdParam: tweetId})
        }

        this.props.getUserData(handle);
        axios.get(`/user/${handle}`)
            .then(res => {
                this.setState({
                    profile: res.data.user
                })
            })
            .catch(err => console.log(err))
    }
    render() {

        const {tweets, loading} = this.props.data;
        const {tweetIdParam} = this.state;

        const tweetsMarkup = loading ? (
            <TweetSkeleton/>
        ) : tweets === null ? (
            <p>No Tweets yet</p>
        ) : !tweetIdParam ? (
            tweets.map(tweet => <Tweet key={tweet.tweetId} tweet={tweet}/>)
        ) : (
            tweets.map(tweet => {
                if(tweet.tweetId !== tweetIdParam){
                    return <Tweet key={tweet.tweetId} tweet={tweet}/>
                } else {
                    return <Tweet key={tweet.tweetId} tweet={tweet} openDialog/>
                }
            })
        )

        return (
            <Grid container spacing={1}>
            <Grid item sm={8} xs={12}>
                {tweetsMarkup}
            </Grid>
            <Grid item sm={4} xs={12}>
                {this.state.profile === null ? (
                    <p>Loading profile...</p>
                ) : (
                    <StaticProfile profile={this.state.profile}/>
                )}
            </Grid>
            </Grid>
        )
    }
}

User.propTypes = {
    getUserData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, {getUserData})(User)
