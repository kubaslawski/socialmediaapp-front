import React, { Component } from 'react';
import PropTypes from 'prop-types';
//MUI
import Grid from '@material-ui/core/Grid';
//COMPONENTS
import Tweet from '../components/tweet/Tweet';
import Profile from '../components/profile/Profile';
import TweetSkeleton from '../util/TweetSkeleton';
//REDUX
import {connect} from 'react-redux';
import {getTweets} from '../redux/actions/dataActions';
class Home extends Component {

    componentDidMount(){
        this.props.getTweets();
    }
    render() {

        
        const {tweets, loading} = this.props.data;

        let recentTweetsMarkup = !loading ? (
            tweets.map((tweet) => <Tweet key={tweet.tweetId} tweet={tweet}/>)
        ) : <TweetSkeleton/>

        return (
            <Grid container spacing={1}>
                <Grid item sm={8} xs={12}>
                    {recentTweetsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile/>
                </Grid>
            </Grid>
        )
    }
}

Home.propTypes = {
    getTweets: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, {getTweets})(Home);
