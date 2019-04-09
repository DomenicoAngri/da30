import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import Reservation from './features/reservation/Reservation';

import './common/css/common.css';

class App extends Component{
    render(){
        let routes = (
            <Switch>
                <Route path="/reservation" component={Reservation}/>
                <Redirect to="/reservation"/>
            </Switch>
        );

        return(
            <div className="container">
                {routes}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
    };
};

const mapDispatchToProps = dispatch => {
    return{
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));