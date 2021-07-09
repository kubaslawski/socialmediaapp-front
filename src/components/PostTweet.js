import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
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
//ICONS 
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
//REDUX
import {connect} from 'react-redux';
import { postTweet } from '../redux/actions/dataActions';

const styles = theme => ({
    ...theme.spreadThis,
    submitButton: {
        position: 'relative'
    },
    progressSpinner: {
        position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        left: '90%',
        top: '10%'
    }
});

class PostTweet extends Component {
    state = {
        open: false,
        body: '',
        errors: {}
    };
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({
                errors: nextProps.UI.errors
            });
        };
        if(!nextProps.UI.errors && !nextProps.UI.loading){
            this.setState({body: ""});
            this.handleClose();
        }
    }
    handleOpen = () => {
        this.setState({open: true})
    }
    handleClose = () => {
        this.setState({open: false, errors: {}})
    }
    handleChange = event => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
        console.log(this.state.body)
    }
    handleSubmit = event => {
        event.preventDefault();
        this.props.postTweet({body: this.state.body});
    }
    render(){
        const {errors} = this.state;
        const {classes, UI: { loading }} = this.props;
        
        return (
            <Fragment>
            <MyButton onClick={this.handleOpen} tip="Post a Tweet!">
                <AddIcon color="primary"/>
            </MyButton>
            <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                <MyButton tip="Close" onClick={this.handleClose} btnClassName={classes.closeButton}>
                    <CloseIcon/>
                </MyButton>
                <DialogTitle>
                    Post a tweet
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={this.handleSubmit}>
                        <TextField 
                        name="body"
                        type="text"
                        label="TWEET!"
                        multiline 
                        rows="3"
                        placeholder="Tweet content"
                        error={errors.body ? true : false}  
                        helperText={errors.body}
                        className={classes.textField}
                        onChange={this.handleChange}
                        fullWidth/>
                        <Button type="submit" variant="contained" color="secondary"
                        className={classes.submitButton} disabled={loading}>
                            Submit
                            {loading && (
                                <CircularProgress size={30} className={classes.progressSpinner}/>
                            )}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
            </Fragment>
        )
    }

}

PostTweet.propTypes = {
    postTweet: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    UI: state.UI
})

export default connect(
    mapStateToProps,
    { postTweet }
  )(withStyles(styles)(PostTweet));