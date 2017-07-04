const initialState = 'main';
import constants from '../constants';

function activeMenu(state = initialState, action){
    switch (action.type){
    case constants.ACTIVE_MENU:
        return action.payload;
    default:
        return state;
    }
}

export default activeMenu;