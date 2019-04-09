import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunk from 'redux-thunk';
import App from './App';
import history from './common/utilities/history';

import {commonReducer} from './common/actions/common.actions.reducer';

import registerServiceWorker from './services/registerServiceWorker';

const rootReducer = combineReducers({
    common: commonReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Router history={history}>
                <App/>
            </Router>
        </BrowserRouter>
    </Provider>,
    
    document.getElementById('root')
);

registerServiceWorker();    