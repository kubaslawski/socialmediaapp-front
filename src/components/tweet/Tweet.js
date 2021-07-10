import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
//COMPONENTS
import MyButton from '../../util/MyButton';
import DeleteTweet from './DeleteTweet';
import TweetDialog from './TweetDialog';
import LikeButton from './LikeButton';
//MUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
//ICONS
import ChatIcon from '@material-ui/icons/Chat';
//REDUX
import { connect } from 'react-redux';


const styles = {
    card: {
      position: 'relative',
      display: 'flex',
      marginBottom: 20
    },
    image: {
      minWidth: 200
    },
    content: {
      padding: 25,
      objectFit: 'cover'
    }
  };

class Tweet extends Component {
    render() {

        dayjs.extend(relativeTime);
        const {
            classes, 
            tweet: {
                body, 
                createdAt, 
                userImage, 
                userHandle, 
                tweetId, 
                likeCount, 
                commentCount
        },
        user: {
          authenticated, credentials: {handle}
        }} = this.props;

        const deleteButton = authenticated && userHandle === handle ? (
          <DeleteTweet tweetId={tweetId}/>
        )  : null

        return (
            <Card className={classes.card}>
                <CardMedia 
                image={userImage}
                title="Profile image"
                className={classes.image}
                />
                <CardContent className={classes.content}>
                    <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">{userHandle}</Typography>
                    {deleteButton}
                    <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                    <Typography variant="body1">{body}</Typography>
                    <LikeButton tweetId={tweetId}/>
                    <span>{likeCount}</span>
                    <MyButton tip="comments">
                      <ChatIcon color="primary"/>
                    </MyButton>
                    <span>{commentCount}</span>
                    <TweetDialog tweetId={tweetId} userHandle={userHandle} openDialog={this.props.openDialog}/>
                </CardContent>
            </Card>
        )
    }
}

Tweet.propTypes = {
  user: PropTypes.object.isRequired,
  tweet: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
}


const mapStateToProps = state => ({
  user: state.user
});



export default connect(mapStateToProps)(withStyles(styles)(Tweet));
