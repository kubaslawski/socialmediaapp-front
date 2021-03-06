import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import PostTweet from '../tweet/PostTweet';
import Notifications from './Notifications';
//REDUX 
import {connect} from 'react-redux';
//MUI
import AppBar from '@material-ui/core/Appbar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
//ICONS 
import HomeIcon from '@material-ui/icons/Home';
// import Notifications from '@material-ui/icons/Notifications';

class Navbar extends Component {
    render() {
        const {authenticated} = this.props;

        return (
            <AppBar>
                <Toolbar className="nav-container">
                    {authenticated ? (
                        <Fragment>
                            <PostTweet/>
                            <Link to="/">
                            <MyButton tip="Home">
                                <HomeIcon color="secondary"/>
                            </MyButton>
                            </Link>
                            <Notifications/>
                        </Fragment>
                    ) : (
                        <Fragment>
                        <Button color="inherit" component={Link} to="/login" >Login</Button>
                        <Button color="inherit" component={Link} to="/" >Home</Button>
                        <Button color="inherit" component={Link} to="/signup" >SignUp</Button>
                        </Fragment>
                    )} 
                </Toolbar>
            </AppBar>
        )
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(Navbar);
