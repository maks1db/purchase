const initialState = 2;

function reducer(state = initialState, action){
    switch (action.type){
    case 'MAIN_PAPER_DEPTH':
        return action.payload;
    default:
        return state;
    }
}

export default reducer;