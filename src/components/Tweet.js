import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
//COMPONENTS
import MyButton from '../util/MyButton';
//MUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
//ICONS
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/Favorite';

const styles = {
    card: {
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
      this.props.likeTweet(this.props.tweetId);
    }

    unlikeTweet = () => {
      this.props.unlikeTweet(this.props.tweetId);
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
          authenticated
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
        return (
            <Card className={classes.card}>
                <CardMedia 
                image={userImage}
                title="Profile image"
                className={classes.image}
                />
                <CardContent className={classes.content}>
                    <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">{userHandle}</Typography>
                    <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                    <Typography variant="body1">{body}</Typography>
                </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles)(Tweet);
