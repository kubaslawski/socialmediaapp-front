import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
//COMPONENTS
import StaticProfile from '../components/profile/StaticProfile'
import Tweet from '../components/tweet/Tweet';
//MUI
import Grid from '@material-ui/core/Grid';
//REDUX
import {connect} from 'react-redux';
import {getUserData} from '../redux/actions/dataActions';

export class User extends Component {
    state = {
        profile: null
    }
    componentDidMount(){
        const handle = this.props.match.params.handle;
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

        const tweetsMarkup = loading ? (
            <p>Loading Data</p>
        ) : tweets === null ? (
            <p>No Tweets yet</p>
        ) : (
            tweets.map(tweet => <Tweet key={tweet.tweetId} tweet={tweet}/>)
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
