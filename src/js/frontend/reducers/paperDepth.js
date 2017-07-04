const initialState = 2;
import constants from '../constants';

function reducer(state = initialState, action){
    switch (action.type){
    case constants.MAIN_PAPER_DEPTH:
        return action.payload;
    default:
        return state;
    }
}

export default reducer;