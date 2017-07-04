const initialState = 0;
import constants from '../constants';

function reducer(state = initialState, action){
    switch (action.type){
    case constants.PURCHASE_SUM:
        return action.payload;
    default:
        return state;
    }
}

export default reducer;