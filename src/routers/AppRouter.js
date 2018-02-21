import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
import LoginPage from '../components/LoginPage';
import NotFoundPage from '../components/NotFoundPage';
import DashboardPage from '../components/DashboardPage';
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import SignupPage from '../components/SignupPage';
import AdminSignUp from '../components/AdminSignUp';
import StudentSignup from '../components/StudentSignup';
import CompanySignup from '../components/CompanySignUp';
import ViewJobs from '../components/ViewJobs';
import ViewStudents from '../components/ViewStudents';
import CreateJob from '../components/CreateJob';
import StudentProfile from '../components/StudentProfile';

export const history = createHistory()

const AppRouter = () => {
    return (
        <Router history={history}>
            <div>
                <Switch>
                    <PublicRoute path="/" component={LoginPage} exact={true} />
                    <PublicRoute path="/signup" component={SignupPage} exact={true} /> 
                    <PublicRoute path="/adminSignup" component={AdminSignUp} exact={true} />                    
                    <PublicRoute path="/studentSignup" component={StudentSignup} exact={true} />                    
                    <PublicRoute path="/companySignup" component={CompanySignup} exact={true} />                                                           
                    <PrivateRoute path="/dashboard" component={DashboardPage} />
                    <PrivateRoute path="/viewStudents" component={ViewStudents} />
                    <PrivateRoute path="/studentProfile" component={StudentProfile} />                                                        
                    <PrivateRoute path="/viewJobs" component={ViewJobs} />              
                    <PrivateRoute path="/createJob" component={CreateJob} />                                              
                    <Route component={NotFoundPage} />
                </Switch>
            </div>
        </Router>
    );
};

export default AppRouter;