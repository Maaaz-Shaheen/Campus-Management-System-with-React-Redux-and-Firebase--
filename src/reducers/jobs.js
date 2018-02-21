const defaultState = {
    jobs : [],
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'GET_JOBS' :
            return {
                jobs : [...action.jobs]
            }         
        default:
            return state;
    };
};
