export const request = (type, payload) => {
    return {
        type: 'REQUEST_' + type,
        payload: payload
    };
};

export const titleHref = (payload) => {
    return {
        type: 'TITLE_HREF',
        payload
    };
};

export const receive = (type, payload) => {

    return {
        type: 'RECEIVE_' + type,
        payload: payload
    };
};

export const setPaperDepth = (value) => {
    return {
        type: 'MAIN_PAPER_DEPTH',
        payload: value
    };
};

export const setTitle = title => {
    return {
        type: 'CHANGE_TITLE',
        payload: title
    };
};

export const setRowState = arr => {
    return {
        type: 'ROW_STATE',
        payload: arr
    };
}; 

export const setActiveMenu = (name) =>{
    return {
        type: 'ACTIVE_MENU',
        payload: name
    };
};

export const toggleMenu = state =>{
    return {
        type: 'TOGGLE_MENU',
        payload: state
    };
};

export const fetchTrainings = () => dispatch => {
    dispatch(request('TRAININGS', []));
    return api.trainings().then(data => {
        
        dispatch(receive('TRAININGS', data.data));
    });
};