import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
//COMPONENTS
import MyButton from '../util/MyButton';
//MUI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
//REDUX
import {connect} from 'react-redux';
import {deleteTweet} from '../redux/actions/dataActions';
import { ThemeProvider } from '@material-ui/core';

const styles = {

}

class DeleteTweet extends Component {
    state = {
        open: false
    };

    handleOpen = () => {
        this.setState({open: true});
    }
    handleClose = () => {
        this.setState({open: false});
    }
    deleteTweet = () => {
        this.props.deleteTweet(this.props.tweetId);
        this.setState({open: false});
    }
    render() {
        const {classes} = this.props;
        return (
            <>
            <MyButton tip="Delete Tweet"
                onClick={this.handleOpen}
                btnClassName={classes.deleteButton}
            >
                <DeleteOutline color="secondary"/>
            </MyButton>
            <Dialog 
                open={this.state.open}
                onClose={this.handleClose}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>
                    Are you sure you want to delete this tweet?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.deleteTweet} color="secondary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
            </>
        )
    }
}

DeleteTweet.propTypes = {
    deleteTweet: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    tweetId: PropTypes.string.isRequired
}

export default connect(null, {deleteTweet})(withStyles(styles)(DeleteTweet));