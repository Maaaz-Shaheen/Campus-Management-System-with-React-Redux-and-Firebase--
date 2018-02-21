const defaultState = {
    students : [],
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'GET_STUDENTS' :
            return {
                students : [...action.students]
            }         
        default:
            return state;
    };
};
