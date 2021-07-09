import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import {Link} from 'react-router-dom';
//COMPONENTS
import MyButton from '../util/MyButton';
//MUI
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';    
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
//ICONS
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
//REDUX
import {connect} from 'react-redux';
import {getTweet} from '../redux/actions/dataActions';
import Close from '@material-ui/icons/Close';

const styles = theme => ({
    ...theme.spreadThis,
    invisibleSeparator: {
        border: 'none',
        margin: 4
    },
    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    dialogContent: {
        padding: 20
    },
    closeButton: {
        position: 'absolute',
        left: '90%'
    }
})
class TweetDialog extends Component {
    state = {
        open: false 
    }
    handleOpen = () => {
        this.setState({open: true});
        this.props.getTweet(this.props.tweetId);
    }
    handleClose = () => {
        this.setState({open: false});
    }
    
    render(){
        const {classes, tweet: {
            tweetId,
            body,
            createdAt,
            likeCount,
            commentCount,
            userImage,
            userHandle
            }, 
            UI: {loading}} = this.props;

            const dialogMarkup = loading ? (
                <CircularProgress size={200}/>
            ) : (
                <Grid container spacing={2}>
                    <Grid item sm={5}>
                        <img src={userImage} alt="Profile" className={classes.profileImage}/>
                    </Grid>
                    <Grid item sm={7}>
                        <Typography 
                            component={Link}
                            color="primary"
                            variant="h5"
                            to={`/users/${userHandle}`}
                        >
                            @{userHandle}
                        </Typography>
                        <hr className={classes.invisibleSeparator}/>
                        <Typography variant="body2" color="textSecondary">
                            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                        </Typography> 
                        <hr className={classes.invisibleSeparator}/>
                        <Typography variant="body1">
                            {body}
                        </Typography>
                    </Grid>
                </Grid>
            )

            return(
                <Fragment>  
                    <MyButton onClick={this.handleOpen} tip="Expand Tweet" tipClassName={classes.expandButton}>
                        <UnfoldMore color="primary"/>
                    </MyButton>
                    <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <MyButton tip="Close" onClick={this.handleClose} btnClassName={classes.closeButton}>
                        <CloseIcon/>
                    </MyButton>
                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                    </Dialog>
                </Fragment>
            )
        }
        
}

TweetDialog.propTypes = {
    getTweet: PropTypes.func.isRequired,
    tweetId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    tweet: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    tweet: state.data.tweet,
    UI: state.UI
})

const mapActionsToProps = {
    getTweet
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(TweetDialog));