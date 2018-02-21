import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { setAuthStatusAction, startGetAuthUserData, startGetAuthUserType } from './actions/auth';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/Loader.css'

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);
store.subscribe(() => {
    console.log(store.getState())
});

let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('root'));
        hasRendered = true;
    };
};

ReactDOM.render(<LoadingPage />, document.getElementById('root'));

// Firebase auth running render

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(startGetAuthUserType(user.uid)).then(() => {
            const userType = store.getState().auth.userType;
            store.dispatch(setAuthStatusAction(true));
            store.dispatch(startGetAuthUserData(user.uid, userType)).then(() => {
                renderApp();
                if (history.location.pathname === '/') {
                    history.push('/dashboard');
                };
                ReactDOM.render(jsx, document.getElementById('root'));
            });
        });
    }
    else {
        store.dispatch(setAuthStatusAction(false));
        renderApp();
        history.push('/')
    }
});


registerServiceWorker();