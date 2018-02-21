import { firebase } from '../firebase/firebase';

// Set Auth Status from index.js

export const setAuthStatusAction = (boolean) => {
    return {
        type: 'SET_AUTH_STATUS',
        boolean,
    }
};

// Get User Data from firebase

const getAuthUserData = (authUserData) => {
    return {
        type: 'GET_AUTH_USER_DATA',
        authUserData,
    }
}

export const startGetAuthUserData = (FUID, userType) => {
    return (dispatch, getState) => {
        return firebase.database().ref(`/${userType}/${FUID}`).once('value')
            .then((snapshot)=>{
                const authUserData = snapshot.val();
                const authUserDataWithKey = {
                    ...authUserData,
                    key : FUID,
                };
                dispatch(getAuthUserData(authUserDataWithKey));
            })
        ;
    }
};

// Logout from Firebase

export const startLogoutAction = () => {
    return () => {
        return firebase.auth().signOut();
    };
};

// User Input Actions 

export const startAuthAction = () => {
    return {
        type: 'START',
    };
}

export const successAuthAction = () => {
    return {
        type: 'SUCCESS',
    };
}

export const failedAuthAction = (error) => {
    return {
        type: 'FAILED',
        error,
    };
}

export const resetAuthStateAction = () => {
    return {
        type: 'RESET',
    }
};


// Login action

export const startLoginAction = (userObj) => {
    return (dispatch, getState) => {
        dispatch(startAuthAction());
        return (
            firebase.auth().signInWithEmailAndPassword(userObj.userEmail, userObj.userPassword)
                .then((snapshot) => {
                    dispatch(successAuthAction());
                })
                .catch((error) => {
                    dispatch(failedAuthAction(error));
                })
        )

    };
};

// User Type Actions

const setUserTypeAction = (userType) => {
    return {
        type : 'SET_AUTH_USER_TYPE',
        userType,
    }
};

export const startGetAuthUserType = (FUID) => {
    return (dispatch, getState) => {
        return firebase.database().ref(`/userType/${FUID}`).once('value')
            .then((snapshot)=>{
                const authUserType = snapshot.val();
                dispatch(setUserTypeAction(authUserType));
            })
        ;
    }
};


// Signup Action 

export const startSignupAction = (userObj, userType) => {
    return (dispatch) => {
        dispatch(startAuthAction());
        dispatch(setUserTypeAction(userType)); 
        return (
            firebase.auth().createUserWithEmailAndPassword(userObj.userEmail, userObj.userPassword)
                .then((snapshot) => {
                    dispatch(successAuthAction());
                    delete userObj.userPassword;
                    firebase.database().ref(`/${userType}/${snapshot.uid}`).set(userObj);
                    firebase.database().ref(`userType/${snapshot.uid}`).set(userType);
                })
                .catch((error) => {
                    dispatch(failedAuthAction(error))
                })
        )
    }
};
