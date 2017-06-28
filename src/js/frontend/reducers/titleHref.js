const initialState = '';

function reducer(state = initialState, action){
    switch (action.type){
    case 'TITLE_HREF':
        return action.payload;
    default:
        return state;
    }
}

export default reducer;