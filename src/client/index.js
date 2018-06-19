
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import store from './redux/store';
import Application from './containers/Application';
import '../../node_modules/antd/dist/antd.less';

const bootstrap = (Component) => {
    ReactDOM.render(
        <Provider store={store}>
            <Router>
                <AppContainer>
                    <Component />
                </AppContainer>
            </Router>
        </Provider>,
        document.getElementById('root'),
    );
};

bootstrap(Application);

// Hot Module Replacement API
if (module.hot) module.hot.accept('./containers/Application', () => bootstrap(Application));
