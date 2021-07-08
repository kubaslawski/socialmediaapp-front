import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
//COMPONENTS
import MyButton from '../util/MyButton';
import DeleteTweet from '../components/DeleteTweet';
//MUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
//ICONS
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
//REDUX
import { connect } from 'react-redux';
import {likeTweet} from '../redux/actions/dataActions';
import {unlikeTweet} from '../redux/actions/dataActions';

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
    likedTweet = () => {
      if(this.props.user.likes && this.props.user.likes.find(like => like.tweetId === this.props.tweet.tweetId))
      return true; else return false;
    };

    likeTweet = () => {
      this.props.likeTweet(this.props.tweet.tweetId);
    }

    unlikeTweet = () => {
      this.props.unlikeTweet(this.props.tweet.tweetId);
    }

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

        const likeButton = !authenticated ? (
          <MyButton tip="Like">
            <Link to="/login">
              <FavoriteIcon color="secondary"/>
            </Link>
          </MyButton>
        ) : (
          this.likedTweet () ? (
            <MyButton tip="Undo like" onClick={this.unlikeTweet}>
              <FavoriteIcon color="secondary"></FavoriteIcon>
            </MyButton>
          ) : (
            <MyButton tip="Like" onClick={this.likeTweet}>
              <FavoriteBorder color="secondary"></FavoriteBorder>
            </MyButton>
          )
        )

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
                    {likeButton}
                    <span>{likeCount}</span>
                    <MyButton tip="comments">
                      <ChatIcon color="primary"/>
                    </MyButton>
                    <span>{commentCount}</span>
                </CardContent>
            </Card>
        )
    }
}

Tweet.propTypes = {
  likeTweet: PropTypes.func.isRequired,
  unlikeTweet: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  tweet: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = ({
  likeTweet,
  unlikeTweet
})

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Tweet));
