import React from 'react';
import {render} from 'react-dom';

import {Provider} from 'react-redux';

import createStore from './helpers/store';
import {reducers} from './reducers';
import middlewares from './middlewares';

import App from './components/App';

const store = createStore(reducers, middlewares);
const BundledApp = <Provider store={store}><App/></Provider>;

render(
    BundledApp,
    document.getElementById('root')
);
