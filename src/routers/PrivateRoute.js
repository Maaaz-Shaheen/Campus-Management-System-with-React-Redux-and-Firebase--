import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => (
    <Route {...rest} component={(props) => (
        isAuthenticated ? (
            <div>
                <Header />
                <Component {...props} />
            </div>
        ) : (
                <Redirect to="/" />
            )
    )} />
);

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(PrivateRoute);