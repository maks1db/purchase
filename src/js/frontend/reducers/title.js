const initialState = 'Главная страница';
import constants from '../constants';

function title(state = initialState, action){
    switch (action.type){
    case constants.CHANGE_TITLE:
        return action.payload;
    default:
        return state;
    }
}

export default title;