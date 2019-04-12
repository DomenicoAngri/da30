import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Router} from 'react-router-dom';
import App from './App';
import history from './common/utilities/history';

import registerServiceWorker from './services/registerServiceWorker';

ReactDOM.render(
    <BrowserRouter>
        <Router history={history}>
            <App/>
        </Router>
    </BrowserRouter>,
    
    document.getElementById('root')
);

registerServiceWorker();    