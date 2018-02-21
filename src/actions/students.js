import { firebase } from '../firebase/firebase';

const getStudentsAction = (students) => ({
    type : 'GET_STUDENTS',
    students,
});

export const startGetStudents = () => {
    return (dispatch, getState) => {
        return firebase.database().ref(`student`).on('value', (snapshot) => {
            const students = [];
            snapshot.forEach((childSnapshot) => {
                students.push({
                    ...childSnapshot.val(),
                    key: childSnapshot.key,
                });
            });
            dispatch(getStudentsAction(students))
        });
    }
};
