const initialState = {};
import constants from '../constants';

function reducer(state = initialState, action){
    switch (action.type){
    case constants.TITLE_HREF:
        return action.payload.href || action.payload.albumHref ? action.payload : {};
    default:
        return state;
    }
}

export default reducer;