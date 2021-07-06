import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/twitter.svg';
import {Link} from 'react-router-dom';

//MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
//REDUX 
import { connect } from 'react-redux';
import { signUpUser } from '../redux/actions/userActions';

const styles = (theme) => ({
    ...theme.spreadThis
})



class SignUp extends Component {

    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            errors: {}
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.UI.errors){
            this.setState({errors: nextProps.UI.errors})
        }
    }
    
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
          });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.password, 
            handle: this.state.handle
        };
        this.props.signUpUser(newUserData, this.props.history)
       
    }
    


    render() {
        const {classes, UI: {loading}} = this.props;
        const {errors} = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={AppIcon} alt="Twitter" className={classes.image}/>
                    <Typography variant="h2" className={classes.pageTitle}>
                        Sign Up
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField 
                        id="email"
                        name="email"
                        type="email" 
                        label="Email" 
                        className={classes.textField}
                        helperText={errors.email}
                        error={errors.email ? true : false}
                        value={this.state.email} 
                        onChange={this.handleChange}
                        fullWidth/>
                        <TextField
                        id="password"
                        name="password"
                        type="password"
                        label="Password"
                        className={classes.textField}
                        helperText={errors.password}
                        error={errors.password ? true : false}
                        value={this.state.password}
                        onChange={this.handleChange}
                        fullWidth
                        />
                        <TextField
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        label="Password Confirmation"
                        className={classes.textField}
                        helperText={errors.confirmPassword}
                        error={errors.password ? true : false}
                        value={this.state.confirmPassword}
                        onChange={this.handleChange}
                        fullWidth
                        />
                        <TextField 
                        id="handle"
                        name="handle"
                        type="handle" 
                        label="Handle" 
                        className={classes.textField}
                        helperText={errors.handle}
                        error={errors.handle ? true : false}
                        value={this.state.handle} 
                        onChange={this.handleChange}
                        fullWidth/>
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        className={classes.button}
                        disabled={loading}>
                            SignUp
                            {loading && (
                                <CircularProgress size={30} className={classes.progress}/>
                            )}
                        </Button>
                        
                    </form>
                    <small>Already have an account? Login <Link to="/login">Here</Link></small>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signUpUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

const mapActionsToProps = ({
    signUpUser
})



export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(SignUp));
