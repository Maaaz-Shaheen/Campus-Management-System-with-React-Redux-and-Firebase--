import { firebase } from '../firebase/firebase';
// import {startAuthAction, successAuthAction, failedAuthAction} from './auth'

export const startCreateJobAction = (jobObj) => {
    return (dispatch, getState) => {
        // dispatch(startAuthAction());
        return firebase.database().ref(`jobs`).push(jobObj).then(()=>{
            // dispatch(successAuthAction());
        })
        .catch((error) => {
            // dispatch(failedAuthAction(error));
        })
        ;
    };
};

const getJobsAction = (jobs) => ({
    type : 'GET_JOBS',
    jobs,
});

export const startGetJobs = () => {
    return (dispatch, getState) => {
        return firebase.database().ref(`jobs`).on('value', (snapshot) => {
            const jobs = [];
            snapshot.forEach((childSnapshot) => {
                jobs.push({
                    ...childSnapshot.val(),
                    key: childSnapshot.key,
                });
            });
            dispatch(getJobsAction(jobs))
        });
    }
};
