const initialState = 'main';

function activeMenu(state = initialState, action){
    switch (action.type){
    case 'ACTIVE_MENU':
        return action.payload;
    default:
        return state;
    }
}

export default activeMenu;