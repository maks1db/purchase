const initialState = 'Главная страница';

function title(state = initialState, action){
    switch (action.type){
    case 'CHANGE_TITLE':
        return action.payload;
    default:
        return state;
    }
}

export default title;