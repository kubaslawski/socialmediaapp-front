import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './util/theme';
import jwtDecode from 'jwt-decode';
//Components 
import Navbar from './components/Navbar';
import AuthRoute from './util/AuthRoute';
//Pages
import Home from './pages/home';
import Login from './pages/login';
import SignUp from './pages/signup';


let authenticated;
const theme = createMuiTheme(themeFile);


const token = localStorage.FBIdToken;
if(token){
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp * 1000 < Date.now()){
    authenticated = false;
    window.location.href = '/login';
  } else {
    authenticated = true;
  }
}

console.log(authenticated);

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div>
        <Router>
        <Navbar/>
          <div className="container">
          
          <Switch>
            <Route exact path="/" component={Home}/>
            <AuthRoute
                  exact
                  path="/login"
                  component={Login}
                  authenticated={authenticated}
                />
            <AuthRoute
                  exact
                  path="/signup"
                  component={SignUp}
                  authenticated={authenticated}
                />
          </Switch> 
          </div>
        </Router>
      </div>
      </MuiThemeProvider>
    )
  }
}

export default App
