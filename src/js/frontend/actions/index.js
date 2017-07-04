// export const request = (type, payload) => {
//     return {
//         type: 'REQUEST_' + type,
//         payload: payload
//     };
// };
import constants from '../constants';
export const titleHref = (href, albumHref) => {
    return {
        type: constants.TITLE_HREF,
        payload: {href, albumHref}
    };
};

export const setSum = (payload) => {
    return {
        type: constants.PURCHASE_SUM,
        payload
    };
};

// export const receive = (type, payload) => {

//     return {
//         type: 'RECEIVE_' + type,
//         payload: payload
//     };
// };

export const setPaperDepth = (value) => {
    return {
        type: constants.MAIN_PAPER_DEPTH,
        payload: value
    };
};

export const setTitle = title => {
    return {
        type: constants.CHANGE_TITLE,
        payload: title
    };
};

export const setRowState = arr => {
    return {
        type: constants.ROW_STATE,
        payload: arr
    };
}; 

export const toggleMenu = state =>{
    return {
        type: constants.TOGGLE_MENU,
        payload: state
    };
};

// export const fetchTrainings = () => dispatch => {
//     dispatch(request('TRAININGS', []));
//     return api.trainings().then(data => {
        
//         dispatch(receive('TRAININGS', data.data));
//     });
// };