const initialState = false;

function stateMenu(state = initialState, action){
    switch (action.type){
    case 'TOGGLE_MENU':
        return !action.payload;
    default:
        return state;
    }
}

export default stateMenu;