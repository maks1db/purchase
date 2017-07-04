const initialState = false;
import constants from '../constants';

function stateMenu(state = initialState, action){
    switch (action.type){
    case constants.TOGGLE_MENU:
        return !action.payload;
    default:
        return state;
    }
}

export default stateMenu;